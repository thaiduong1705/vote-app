import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { VotesService } from "./votes.service";
import { SubmitVoteDto } from "./dto/submit-vote.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller("votes")
export class VotesController {
	constructor(private readonly votesService: VotesService) {}

	@Post()
	async submitVote(@Body() dto: SubmitVoteDto, @CurrentUser("participantId") participantId: string) {
		return this.votesService.submitVote(dto, participantId);
	}

	@Get("room/:roomId")
	async getRoomVotes(@Param("roomId") roomId: string) {
		return this.votesService.getRoomVotes(roomId);
	}
}
