import { IsDate, IsEmail, IsString, Min, min } from "class-validator";

export class CreateRoomDto {
	@IsString()
	@Min(3)
	roomName: string;

	@IsString()
	ownerName: string;

	@IsEmail()
	ownerEmail: string;

	@IsDate()
	startAt: Date;

	@IsDate()
	endAt: Date;
}
