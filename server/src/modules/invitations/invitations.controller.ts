import { Body, Controller, HttpCode, Post, Put, UseInterceptors } from "@nestjs/common";
import { InvitationsService } from "./invitations.service";
import { SendInvitesDto } from "./dto/send-invites.dto";
import { Cookies } from "src/common/decorators/cookie.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { SetCookieInterceptor } from "src/common/interceptor/set-cookie.interceptor";

@Controller("invitations")
export class InvitationsController {
	constructor(private readonly invitationsService: InvitationsService) {}

	@Post("send")
	async sendInvites(@Body() dto: SendInvitesDto, @Cookies("token") ownerToken: string) {
		return this.invitationsService.sendInvites(dto, ownerToken);
	}

	@Public()
	@Post("join-room")
	@HttpCode(200)
	@UseInterceptors(SetCookieInterceptor)
	async joinRoom(@Body("token") token: string) {
		return this.invitationsService.joinRoom(token);
	}
}
