export const QUEUE_NAMES = {
	EMAIL: "email",
	ROOM_CLOSER: "room-closer",
} as const;

export const JOB_NAMES = {
	SEND_INVITE: "send-invite",
	SEND_REMINDER: "send-reminder",
	CHECK_EXPIRED_ROOMS: "check-expired-rooms",
} as const;
