import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room-dto";
import { Public } from "src/common/decorators/public.decorator";
import { SetCookieInterceptor } from "src/common/interceptor/set-cookie.interceptor";

@Controller("rooms")
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@Public()
	@Post()
	@UseInterceptors(SetCookieInterceptor)
	async createRoom(@Body() dto: CreateRoomDto) {
		return this.roomsService.createRoom(dto);
	}
}
