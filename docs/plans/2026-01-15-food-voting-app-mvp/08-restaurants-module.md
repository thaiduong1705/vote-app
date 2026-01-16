# Task 8: Restaurants Module - List & Create

**Files:**

- Create: `server/src/restaurants/restaurants.module.ts`
- Create: `server/src/restaurants/restaurants.service.ts`
- Create: `server/src/restaurants/restaurants.controller.ts`
- Create: `server/src/restaurants/dto/create-restaurant.dto.ts`

**Step 1: Write tests**

Create `server/src/restaurants/__tests__/restaurants.service.spec.ts`:

```typescript
import { Test } from "@nestjs/testing";
import { RestaurantsService } from "../restaurants.service";
import { PrismaService } from "../../config/database.config";

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
			{ id: "1", name: "KFC", menu_image_url: null },
			{ id: "2", name: "McDonalds", menu_image_url: null },
		];

		jest.spyOn(prisma.restaurants, "findMany").mockResolvedValue(mockRestaurants as any);

		const result = await service.listRestaurants();

		expect(result).toEqual(mockRestaurants);
	});

	it("should create or get existing restaurant", async () => {
		const dto = { name: "Pizza Hut" };
		const mockRestaurant = { id: "3", name: "Pizza Hut", menu_image_url: null };

		jest.spyOn(prisma.restaurants, "upsert").mockResolvedValue(mockRestaurant as any);

		const result = await service.createRestaurant(dto);

		expect(result).toEqual(mockRestaurant);
	});
});
```

**Step 2: Run test**

Run: `npm test -- restaurants.service.spec.ts`

Expected: FAIL.

**Step 3: Create DTO**

Create `server/src/restaurants/dto/create-restaurant.dto.ts`:

```typescript
export class CreateRestaurantDto {
	name: string;
	menuImageUrl?: string;
}
```

**Step 4: Implement service**

Create `server/src/restaurants/restaurants.service.ts`:

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../config/database.config";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Injectable()
export class RestaurantsService {
	constructor(private prisma: PrismaService) {}

	async listRestaurants() {
		return this.prisma.restaurants.findMany({
			orderBy: { name: "asc" },
		});
	}

	async createRestaurant(dto: CreateRestaurantDto) {
		return this.prisma.restaurants.upsert({
			where: { name: dto.name },
			update: {},
			create: {
				name: dto.name,
				menu_image_url: dto.menuImageUrl || null,
			},
		});
	}
}
```

**Step 5: Create controller**

Create `server/src/restaurants/restaurants.controller.ts`:

```typescript
import { Controller, Get, Post, Body } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Controller("restaurants")
export class RestaurantsController {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Get()
	async list() {
		return this.restaurantsService.listRestaurants();
	}

	@Post()
	async create(@Body() dto: CreateRestaurantDto) {
		return this.restaurantsService.createRestaurant(dto);
	}
}
```

**Step 6: Create module**

Create `server/src/restaurants/restaurants.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";
import { PrismaService } from "../config/database.config";

@Module({
	controllers: [RestaurantsController],
	providers: [RestaurantsService, PrismaService],
})
export class RestaurantsModule {}
```

**Step 7: Import in app module**

Add to `server/src/app.module.ts` imports array:

```typescript
import { RestaurantsModule } from './restaurants/restaurants.module';

imports: [
  // ...
  RestaurantsModule,
],
```

**Step 8: Run test**

Run: `npm test -- restaurants.service.spec.ts`

Expected: PASS.

**Step 9: Commit**

```bash
git add server/src/restaurants server/src/app.module.ts
git commit -m "feat: implement restaurants list and create endpoints"
```
