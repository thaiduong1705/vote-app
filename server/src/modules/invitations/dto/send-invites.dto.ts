import { IsEmail, IsString, IsUUID } from "class-validator";

export class SendInvitesDto {
	@IsUUID()
	roomId: string;

	@IsString()
	ownerToken: string;

	@IsEmail({}, { each: true })
	emails: string[];
}
