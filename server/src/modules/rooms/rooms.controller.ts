import { Body, Controller, Get, Param, Post, Res, UseInterceptors } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room-dto";
import { Public } from "src/common/decorators/public.decorator";
import { SetCookieInterceptor } from "src/common/interceptor/set-cookie.interceptor";
import { Cookies } from "src/common/decorators/cookie.decorator";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { Response } from "express";

@Controller("rooms")
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@Public()
	@Post()
	@UseInterceptors(SetCookieInterceptor)
	async createRoom(@Body() dto: CreateRoomDto) {
		return this.roomsService.createRoom(dto);
	}

	@Get(":roomId/verify-owner")
	async verifyOwner(@Param("roomId") roomId: string, @Cookies("token") token: string) {
		return this.roomsService.verifyOwner(roomId, token);
	}

	@Get("verify-access")
	async verifyRoomAccess(@CurrentUser() currentUser: any, @Res({ passthrough: true }) res: Response) {
		const result = await this.roomsService.verifyRoomAccess(currentUser.roomId, currentUser.email);
		// revoke cookie if user has no access
		if (!result.hasAccess) {
			res.clearCookie("token", {
				httpOnly: true,
				secure: false,
				sameSite: "lax",
			});
		}

		return result;
	}
}
