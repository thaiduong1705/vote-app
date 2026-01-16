# Task 13: Create Room Page

**Files:**

- Create: `client/src/pages/CreateRoomPage.tsx`

**Step 1: Create CreateRoomPage component**

Create `client/src/pages/CreateRoomPage.tsx`:

```tsx
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function CreateRoomPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		roomName: "",
		ownerEmail: "",
		ownerName: "",
		startAt: "",
		endAt: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const result = await api.createRoom(formData);
			localStorage.setItem("ownerToken", result.ownerToken);
			navigate(`/room/${result.roomId}?owner=true`);
		} catch (err) {
			setError("Failed to create room. Please try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
			<h1>Create Food Voting Room</h1>

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 15 }}>
					<label>
						Room Name:
						<input
							type="text"
							value={formData.roomName}
							onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 15 }}>
					<label>
						Your Email:
						<input
							type="email"
							value={formData.ownerEmail}
							onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 15 }}>
					<label>
						Your Name:
						<input
							type="text"
							value={formData.ownerName}
							onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 15 }}>
					<label>
						Voting Starts At:
						<input
							type="datetime-local"
							value={formData.startAt}
							onChange={(e) => setFormData({ ...formData, startAt: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 15 }}>
					<label>
						Voting Ends At:
						<input
							type="datetime-local"
							value={formData.endAt}
							onChange={(e) => setFormData({ ...formData, endAt: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				{error && <p style={{ color: "red" }}>{error}</p>}

				<button
					type="submit"
					disabled={loading}
					style={{ padding: "10px 20px", fontSize: 16 }}>
					{loading ? "Creating..." : "Create Room"}
				</button>
			</form>
		</div>
	);
}
```

**Step 2: Test page**

Run: `npm run dev`

Navigate to http://localhost:5173

Expected: Form renders, can fill and submit (assuming backend is running).

**Step 3: Commit**

```bash
git add client/src/pages/CreateRoomPage.tsx
git commit -m "feat: create room page UI"
```
