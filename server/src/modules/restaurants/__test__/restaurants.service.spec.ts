import { Test } from "@nestjs/testing";
import { RestaurantsService } from "../restaurants.service";
import { PrismaService } from "src/config/database.config";

describe("RestaurantsService", () => {
	let service: RestaurantsService;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				RestaurantsService,
				{
					provide: PrismaService,
					useValue: {
						restaurants: {
							findMany: jest.fn(),
							upsert: jest.fn(),
						},
					},
				},
			],
		}).compile();
		service = module.get(RestaurantsService);
		prisma = module.get(PrismaService);
	});

	it("should list all restaurants", async () => {
		const mockRestaurants = [
			{ id: "1", name: "Restaurant A", menu_image_url: null },
			{ id: "2", name: "Restaurant B", menu_image_url: null },
		];

		const pagination = { page: 1, limit: 2 };

		jest.spyOn(prisma.restaurants, "findMany").mockResolvedValue(mockRestaurants as any);

		const restaurants = await service.listAllRestaurants(pagination);
		expect(restaurants).toEqual(mockRestaurants);
		expect(prisma.restaurants.findMany).toHaveBeenCalledTimes(1);
	});

	it("should create or get existing restaurant", async () => {
		const dto = { name: "Pizza Place" };
		const mockRestaurant = { id: "1", name: "Pizza Place", menu_image_url: null };

		jest.spyOn(prisma.restaurants, "upsert").mockResolvedValue(mockRestaurant as any);

		const restaurant = await service.createOrGetRestaurant(dto);

		expect(restaurant).toEqual(mockRestaurant);
	});
});
