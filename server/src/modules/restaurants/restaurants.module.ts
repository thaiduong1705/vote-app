import { Module } from "@nestjs/common";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";
import { PrismaService } from "src/config/database.config";
import { RealtimeModule } from "src/realtime/realtime.module";

@Module({
	imports: [RealtimeModule],
	controllers: [RestaurantsController],
	providers: [RestaurantsService, PrismaService],
	exports: [RestaurantsService],
})
export class RestaurantsModule {}
