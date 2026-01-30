import { Body, Controller, Post } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room-dto";
import { Public } from "src/common/decorators/public.decorator";

@Controller("rooms")
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@Public()
	@Post()
	async createRoom(@Body() dto: CreateRoomDto) {
		return this.roomsService.createRoom(dto);
	}
}
