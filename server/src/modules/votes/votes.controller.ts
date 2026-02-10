import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { VotesService } from "./votes.service";
import { SubmitVoteDto } from "./dto/submit-vote.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { Cookies } from "src/common/decorators/cookie.decorator";

@Controller("votes")
export class VotesController {
	constructor(private readonly votesService: VotesService) {}

	@Post()
	async submitVote(@Body() dto: SubmitVoteDto, @CurrentUser("email") email: string) {
		return this.votesService.submitVote(dto, email);
	}

	@Get("room/:roomId")
	async getRoomVotes(@Param("roomId") roomId: string, @Cookies("token") token?: string) {
		return this.votesService.getRoomVotes(roomId, token);
	}
}
