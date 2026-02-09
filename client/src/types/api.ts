// API Request Types
export interface CreateRoomRequest {
	roomName: string;
	ownerEmail: string;
	startAt: string;
	endAt: string;
}

export interface SendInvitesRequest {
	roomId: string;
	emails: string[];
}

export interface JoinRoomRequest {
	token: string;
}

export interface CreateRestaurantRequest {
	name: string;
	menuImageUrl?: string;
}

export interface SubmitVoteRequest {
	roomId: string;
	participantId: string;
	restaurantId: string;
}

// API Response Types
export interface Room {
	id: string;
	roomName: string;
	ownerEmail: string;
	ownerName: string;
	startAt: string;
	endAt: string;
	status: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateRoomResponse {
	room: Room;
	ownerToken: string;
}

export interface Participant {
	id: string;
	roomId: string;
	name: string;
	createdAt: string;
}

export interface JoinRoomResponse {
	participant: Participant;
	room: Room;
}

export interface Restaurant {
	id: string;
	name: string;
	menuImageUrl: string | null;
	createdAt: string;
}

export interface Vote {
	id: string;
	roomId: string;
	participantId: string;
	restaurantId: string;
	createdAt: string;
}

export interface RoomVotesResponse {
	votes: Vote[];
	restaurants: Restaurant[];
	participants: Participant[];
	currentUserRole?: string | null;
}

export interface VerifyAccessResponse {
	hasAccess: boolean;
	roomId?: string;
	email?: string;
	isOwner?: boolean;
}
