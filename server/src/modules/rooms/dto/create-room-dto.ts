import { IsDate, IsEmail, IsString, MinLength } from "class-validator";
import { Type } from "class-transformer";

export class CreateRoomDto {
	@IsString()
	@MinLength(3)
	roomName: string;

	@IsEmail()
	ownerEmail: string;

	@Type(() => Date)
	@IsDate()
	startAt: Date;

	@Type(() => Date)
	@IsDate()
	endAt: Date;
}
