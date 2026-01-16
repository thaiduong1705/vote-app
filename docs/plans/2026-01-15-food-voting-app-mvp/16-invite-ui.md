# Task 16: Add Invite UI for Owners

**Files:**

- Modify: `client/src/pages/RoomPage.tsx`

**Step 1: Add invite section to RoomPage**

Modify `client/src/pages/RoomPage.tsx`:

```tsx
// Add state
const [inviteEmails, setInviteEmails] = useState("");
const [sendingInvites, setSendingInvites] = useState(false);

// Add function
const handleSendInvites = async () => {
	const emails = inviteEmails
		.split(",")
		.map((e) => e.trim())
		.filter(Boolean);
	if (emails.length === 0) {
		alert("Enter at least one email");
		return;
	}

	setSendingInvites(true);
	try {
		const ownerToken = localStorage.getItem("ownerToken") || "";
		await api.sendInvites({ roomId: roomId!, ownerToken, emails });
		alert(`Invites sent to ${emails.length} people!`);
		setInviteEmails("");
	} catch (err) {
		console.error(err);
		alert("Failed to send invites");
	} finally {
		setSendingInvites(false);
	}
};

// Add to JSX before voting section
{
	isOwner && (
		<div style={{ marginBottom: 30, padding: 20, background: "#f0f0f0", borderRadius: 8 }}>
			<h2>Invite Participants</h2>
			<p>Enter emails separated by commas:</p>
			<textarea
				value={inviteEmails}
				onChange={(e) => setInviteEmails(e.target.value)}
				placeholder="alice@example.com, bob@example.com"
				rows={3}
				style={{ width: "100%", padding: 10, fontSize: 14 }}
			/>
			<button
				onClick={handleSendInvites}
				disabled={sendingInvites}
				style={{ marginTop: 10, padding: "10px 20px", fontSize: 16 }}>
				{sendingInvites ? "Sending..." : "Send Invites"}
			</button>
		</div>
	);
}
```

**Step 2: Test invite flow**

Create room → see invite section → enter emails → send invites → check email

Expected: Invites sent, emails received.

**Step 3: Commit**

```bash
git add client/src/pages/RoomPage.tsx
git commit -m "feat: add invite UI for room owners"
```
