import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { envConfig } from "./config/env.config";
import { validate } from "./config/env.validation";
import { PrismaService } from "./config/database.config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
			validate, // Zod validation
			cache: true,
		}),
	],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
