import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";
import { envConfig } from "./config/env.config";
import { validate } from "./config/env.validation";
import { PrismaService } from "./config/database.config";
import { WorkerModule } from "./workers/worker.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { InvitationsModule } from "./modules/invitations/invitations.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
			validate, // Zod validation
			cache: true,
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
	],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
