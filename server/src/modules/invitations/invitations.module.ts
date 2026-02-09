import { Module } from "@nestjs/common";
import { InvitationsController } from "./invitations.controller";
import { InvitationsService } from "./invitations.service";
import { PrismaService } from "src/config/database.config";
import { WorkerModule } from "src/workers/worker.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RealtimeModule } from "src/realtime/realtime.module";

@Module({
	imports: [WorkerModule, RealtimeModule],
	controllers: [InvitationsController],
	providers: [InvitationsService, PrismaService],
	exports: [InvitationsService],
})
export class InvitationsModule {}
