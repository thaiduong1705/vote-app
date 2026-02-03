import { Module } from "@nestjs/common";
import { VotesController } from "./votes.controller";
import { VotesService } from "./votes.service";
import { PrismaService } from "src/config/database.config";
import { RealtimeModule } from "src/realtime/realtime.module";

@Module({
	imports: [RealtimeModule],
	controllers: [VotesController],
	providers: [VotesService, PrismaService],
	exports: [VotesService],
})
export class VotesModule {}
