import type {
	CreateRoomRequest,
	CreateRoomResponse,
	SendInvitesRequest,
	JoinRoomRequest,
	JoinRoomResponse,
	CreateRestaurantRequest,
	Restaurant,
	SubmitVoteRequest,
	Vote,
	RoomVotesResponse,
} from "../types/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
	async createRoom(data: CreateRoomRequest): Promise<CreateRoomResponse> {
		const res = await fetch(`${API_BASE}/rooms`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error(`Failed to create room: ${res.statusText}`);
		}
		return res.json();
	},

	async sendInvites(data: SendInvitesRequest): Promise<void> {
		const res = await fetch(`${API_BASE}/invitations/send`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error(`Failed to send invites: ${res.statusText}`);
		}
		return res.json();
	},

	async joinRoom(data: JoinRoomRequest): Promise<JoinRoomResponse> {
		const res = await fetch(`${API_BASE}/invitations/join`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			throw new Error(`Failed to join room: ${res.statusText}`);
		}
		return res.json();
	},

	async getRestaurants(name?: string): Promise<Restaurant[]> {
		const res = await fetch(`${API_BASE}/restaurants${name ? `?name=${encodeURIComponent(name)}` : ""}`);
		if (!res.ok) {
			throw new Error(`Failed to fetch restaurants: ${res.statusText}`);
		}
		return res.json();
	},

	async createRestaurant(data: CreateRestaurantRequest): Promise<Restaurant> {
		const res = await fetch(`${API_BASE}/restaurants`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error(`Failed to create restaurant: ${res.statusText}`);
		}
		return res.json();
	},

	async submitVote(data: SubmitVoteRequest): Promise<Vote> {
		const res = await fetch(`${API_BASE}/votes`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error(`Failed to submit vote: ${res.statusText}`);
		}
		return res.json();
	},

	async getRoomVotes(roomId: string): Promise<RoomVotesResponse> {
		const res = await fetch(`${API_BASE}/votes/room/${roomId}`, {
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error(`Failed to fetch room votes: ${res.statusText}`);
		}
		return res.json();
	},

	async verifyOwner(roomId: string): Promise<{ isOwner: boolean; role?: string }> {
		const res = await fetch(`${API_BASE}/rooms/${roomId}/verify-owner`, {
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error(`Failed to verify owner: ${res.statusText}`);
		}
		return res.json();
	},

	async addNewRestaurant(
		roomId: string,
		restaurantName: string,
	): Promise<{ success: boolean; restaurant: Restaurant; message: string }> {
		const res = await fetch(`${API_BASE}/restaurants/owner/add-new`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ roomId, restaurantName }),
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error(`Failed to add restaurant: ${res.statusText}`);
		}
		return res.json();
	},
};
