import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/database.config";
import { PaginationDto } from "./dto/pagination";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Injectable()
export class RestaurantsService {
	constructor(private readonly prisma: PrismaService) {}

	async listAllRestaurants(paginationDto: PaginationDto) {
		const { name } = paginationDto;

		return this.prisma.restaurants.findMany({
			where: name ? { name: { contains: name, mode: "insensitive" } } : {},
			select: {
				id: true,
				name: true,
			},
		});
	}

	async createOrGetRestaurant(restaurantDto: CreateRestaurantDto) {
		const { name } = restaurantDto;

		const restaurant = await this.prisma.restaurants.upsert({
			where: { name },
			update: {},
			create: {
				name,
			},
		});

		return restaurant;
	}
}
