# Task 14: Join Room Page

**Files:**

- Update: `client/src/pages/CreateRoomPage.tsx` (Add invite email UI after room creation)
- Create: `client/src/pages/JoinRoomPage.tsx`
- Update: `client/src/api/client.ts` (Add pagination to getRestaurants)

**Changes Summary:**

1. After creating a room, show a modal to invite users via email
2. Added default page=1 and limit=10 to restaurants API
3. Allow skipping invites and going directly to room

**Step 1: Update CreateRoomPage with Invite Modal**

The CreateRoomPage has been updated to:

- Show an invite form modal after successful room creation
- Allow entering multiple email addresses (comma, semicolon, or newline separated)
- Provide "Send Invites" and "Skip & Go to Room" options
- Auto-redirect to room after sending invites successfully

**Step 2: Update API Client**

The `getRestaurants` API now accepts optional pagination parameters:

```typescript
async getRestaurants(page: number = 1, limit: number = 10): Promise<Restaurant[]>
```

**Step 3: Create JoinRoomPage**

Create `client/src/pages/JoinRoomPage.tsx`:

```tsx
import { useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

export default function JoinRoomPage() {
	const navigate = useNavigate();
	const { token } = useParams<{ token: string }>();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!token) return;

		setLoading(true);
		setError("");

		try {
			const result = await api.joinRoom({ token, name });
			localStorage.setItem("participantId", result.participantId);
			navigate(`/room/${result.roomId}`);
		} catch (err: any) {
			setError(err.message || "Failed to join room. Invalid or expired invitation.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: 500, margin: "100px auto", padding: 20 }}>
			<h1>Join Voting Room</h1>
			<p>You've been invited to vote for food!</p>

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 15 }}>
					<label>
						Your Name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
							placeholder="Enter your name"
						/>
					</label>
				</div>

				{error && <p style={{ color: "red" }}>{error}</p>}

				<button
					type="submit"
					disabled={loading}
					style={{ padding: "10px 20px", fontSize: 16 }}>
					{loading ? "Joining..." : "Join Room"}
				</button>
			</form>
		</div>
	);
}
```

**Step 2: Test join flow**

Run frontend and backend.

Expected: Can join via invite token link.

**Step 3: Commit**

```bash
git add client/src/pages/JoinRoomPage.tsx
git commit -m "feat: join room page UI"
```

