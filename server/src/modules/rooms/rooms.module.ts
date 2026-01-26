import { Module } from "@nestjs/common";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";
import { PrismaService } from "src/config/database.config";
import { WorkerModule } from "src/workers/worker.module";

@Module({
	imports: [WorkerModule],
	controllers: [RoomsController],
	providers: [RoomsService, PrismaService],
	exports: [RoomsService],
})
export class RoomsModule {}
