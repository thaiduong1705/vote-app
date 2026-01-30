import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { PaginationDto } from "./dto/pagination";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { Public } from "src/common/decorators/public.decorator";

@Public()
@Controller("restaurants")
export class RestaurantsController {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Get()
	async listAllRestaurants(@Query() paginationDto: PaginationDto) {
		return this.restaurantsService.listAllRestaurants(paginationDto);
	}

	@Post()
	async createOrGetRestaurant(@Body() restaurantDto: CreateRestaurantDto) {
		return this.restaurantsService.createOrGetRestaurant(restaurantDto);
	}
}
