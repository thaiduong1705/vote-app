import { Module } from "@nestjs/common";
import { InvitationsController } from "./invitations.controller";
import { InvitationsService } from "./invitations.service";
import { PrismaService } from "src/config/database.config";
import { WorkerModule } from "src/workers/worker.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		WorkerModule,
		JwtModule.registerAsync({
			global: true,
			useFactory: (configService: ConfigService) => ({
				// Cách 1: Dùng symmetric key (HS256) - Đơn giản
				secret: configService.get<string>("JWT_SECRET"),

				// Cách 2: Dùng asymmetric keys (RS256) - An toàn hơn
				// Uncomment phần này nếu muốn dùng RSA
				// privateKey: configService.get<string>("JWT_PRIVATE_KEY"),
				// publicKey: configService.get<string>("JWT_PUBLIC_KEY"),
				// signOptions: {
				//   expiresIn: "7d",
				//   algorithm: "RS256",
				// },
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [InvitationsController],
	providers: [InvitationsService, PrismaService],
	exports: [InvitationsService],
})
export class InvitationsModule {}
