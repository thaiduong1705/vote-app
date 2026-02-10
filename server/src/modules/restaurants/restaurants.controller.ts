import { Body, Controller, Get, Post, Query, BadRequestException, Inject } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { PaginationDto } from "./dto/pagination";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { Public } from "src/common/decorators/public.decorator";
import { Cookies } from "src/common/decorators/cookie.decorator";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/config/database.config";
import { RealtimeGateway } from "src/realtime/realtime.gateway";

@Public()
@Controller("restaurants")
export class RestaurantsController {
	constructor(
		private readonly restaurantsService: RestaurantsService,
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly realtimeGateway: RealtimeGateway,
	) {}

	@Get()
	async listAllRestaurants(@Query() paginationDto: PaginationDto) {
		return this.restaurantsService.listAllRestaurants(paginationDto);
	}

	@Post()
	async createOrGetRestaurant(@Body() restaurantDto: CreateRestaurantDto) {
		return this.restaurantsService.createOrGetRestaurant(restaurantDto);
	}

	@Post("owner/add-new")
	async addNewRestaurantAsOwner(
		@Body() dto: { roomId: string; restaurantName: string },
		@Cookies("token") token: string,
	) {
		if (!token) {
			throw new BadRequestException("Unauthorized: No token provided");
		}

		try {
			// Verify token and extract email
			const decoded = this.jwtService.verify(token);
			const { email, roomId: tokenRoomId } = decoded;

			if (tokenRoomId !== dto.roomId) {
				throw new BadRequestException("Token room ID does not match request");
			}

			// Check if user is owner in database
			const room = await this.prisma.rooms.findFirst({
				where: {
					id: dto.roomId,
				},
				include: {
					participants: {
						where: {
							email,
						},
					},
				},
			});

			if (!room || room.participants[0]?.role !== "HOST") {
				throw new BadRequestException("Only room owner can add restaurants");
			}

			// Validate restaurant name
			if (!dto.restaurantName || dto.restaurantName.trim().length === 0) {
				throw new BadRequestException("Restaurant name is required");
			}

			// Create or get restaurant
			const restaurant = await this.restaurantsService.createOrGetRestaurant({
				name: dto.restaurantName.trim(),
			});

			// Emit socket event to notify all clients in room to refresh restaurants
			this.realtimeGateway.broadcastRestaurantsUpdated(dto.roomId);

			return {
				success: true,
				restaurant,
				message: "Restaurant added successfully. All participants will see it.",
			};
		} catch (err) {
			throw new BadRequestException("Failed to add restaurant: " + err.message);
		}
	}
}
