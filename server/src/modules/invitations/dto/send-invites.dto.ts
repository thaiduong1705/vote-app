import { IsEmail, IsString, IsUUID } from "class-validator";

export class SendInvitesDto {
	@IsUUID()
	roomId: string;

	@IsEmail({}, { each: true })
	emails: string[];
}
