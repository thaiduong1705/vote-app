import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { envConfig } from "./config/env.config";
import { validate } from "./config/env.validation";
import { PrismaService } from "./config/database.config";
import { WorkerModule } from "./workers/worker.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { InvitationsModule } from "./modules/invitations/invitations.module";
import { RestaurantsModule } from "./modules/restaurants/restaurants.module";
import { VotesModule } from "./modules/votes/votes.module";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { RealtimeModule } from "./realtime/realtime.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
			validate, // Zod validation
			cache: true,
		}),
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>("JWT_SECRET"),
			}),
			inject: [ConfigService],
		}),
		BullModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				connection: {
					host: configService.get<string>("REDIS_HOST"),
					port: configService.get<number>("REDIS_PORT"),
					password: configService.get<string>("REDIS_PASSWORD"),
				},
			}),
			inject: [ConfigService],
		}),
		WorkerModule,
		RoomsModule,
		InvitationsModule,
		RestaurantsModule,
		VotesModule,
		RealtimeModule,
	],
	providers: [
		PrismaService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [PrismaService],
})
export class AppModule {}
