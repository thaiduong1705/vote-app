export interface InviteEmailData {
	roomName: string;
	ownerName: string;
	inviteLink: string;
	endAt: string;
}

export interface ReminderEmailData {
	roomName: string;
	participantName: string;
	roomLink: string;
	endAt: string;
}

export const emailTemplates = {
	invite: (data: InviteEmailData) => ({
		subject: `Chọn quán trong room này nè: ${data.roomName}`,
		html: `
      <h2>Chọn quán</h2>
      <p><strong>${data.ownerName}</strong> mời chọn món trong room"<strong>${data.roomName}</strong>".</p>
      <p>Hết hạn lúc: <strong>${data.endAt}</strong></p>
      <p><a href="${data.inviteLink}" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Join & Vote</a></p>
      <p>Copy link: ${data.inviteLink}</p>
    `,
		text: `
${data.ownerName} mời vote "${data.roomName}".

Hết hạn: ${data.endAt}

Bấm để tham gia: ${data.inviteLink}
    `,
	}),

	reminder: (data: ReminderEmailData) => ({
		subject: `Nhắc nhở vote: ${data.roomName}!`,
		html: `
      <p>Vote dùm đi: "<strong>${data.roomName}</strong>"!</p>
      <p>Vote hết hạn: <strong>${data.endAt}</strong></p>
      <p><a href="${data.roomLink}" style="background: #FF9800; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Vote Now</a></p>
      <p>Copy link: ${data.roomLink}</p>
    `,
		text: `
Vote dùm đi:  "${data.roomName}"!

Vote hết hạn: ${data.endAt}

${data.roomLink}
    `,
	}),
};
