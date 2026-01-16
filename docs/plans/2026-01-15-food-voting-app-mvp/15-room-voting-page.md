# Task 15: Room Voting Page with Realtime

**Files:**

- Create: `client/src/pages/RoomPage.tsx`

**Step 1: Create RoomPage**

Create `client/src/pages/RoomPage.tsx`:

```tsx
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import { useSocket } from "../hooks/useSocket";

export default function RoomPage() {
	const { roomId } = useParams<{ roomId: string }>();
	const [searchParams] = useSearchParams();
	const isOwner = searchParams.get("owner") === "true";

	const [restaurants, setRestaurants] = useState<any[]>([]);
	const [votes, setVotes] = useState<any[]>([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState("");
	const [loading, setLoading] = useState(false);

	const { socket, isConnected } = useSocket(roomId || null);

	useEffect(() => {
		loadData();
	}, [roomId]);

	useEffect(() => {
		if (!socket) return;

		socket.on("vote-updated", (data) => {
			console.log("Vote updated:", data);
			loadVotes();
		});

		socket.on("room-closed", (data) => {
			console.log("Room closed:", data);
			alert(`Room closed! Winner: ${data.winnerName || "No votes"}`);
		});

		return () => {
			socket.off("vote-updated");
			socket.off("room-closed");
		};
	}, [socket]);

	const loadData = async () => {
		const [restaurantsData, votesData] = await Promise.all([api.getRestaurants(), api.getRoomVotes(roomId!)]);

		setRestaurants(restaurantsData);
		setVotes(votesData);
	};

	const loadVotes = async () => {
		const votesData = await api.getRoomVotes(roomId!);
		setVotes(votesData);
	};

	const handleVote = async () => {
		if (!selectedRestaurant) {
			alert("Please select a restaurant");
			return;
		}

		setLoading(true);
		try {
			const participantId = localStorage.getItem("participantId") || "";
			await api.submitVote({
				roomId: roomId!,
				participantId,
				restaurantId: selectedRestaurant,
			});
			await loadVotes();
			alert("Vote submitted!");
		} catch (err) {
			console.error(err);
			alert("Failed to submit vote");
		} finally {
			setLoading(false);
		}
	};

	const voteCounts = votes.reduce((acc, vote) => {
		const restaurantName = vote.restaurant.name;
		acc[restaurantName] = (acc[restaurantName] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	return (
		<div style={{ maxWidth: 800, margin: "50px auto", padding: 20 }}>
			<h1>Food Voting Room</h1>
			<p>Connection: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>

			<div style={{ marginBottom: 30 }}>
				<h2>Cast Your Vote</h2>
				<select
					value={selectedRestaurant}
					onChange={(e) => setSelectedRestaurant(e.target.value)}
					style={{ width: "100%", padding: 10, fontSize: 16 }}>
					<option value="">-- Select a restaurant --</option>
					{restaurants.map((r) => (
						<option
							key={r.id}
							value={r.id}>
							{r.name}
						</option>
					))}
				</select>

				<button
					onClick={handleVote}
					disabled={loading}
					style={{ marginTop: 10, padding: "10px 20px", fontSize: 16 }}>
					{loading ? "Submitting..." : "Submit Vote"}
				</button>
			</div>

			<div>
				<h2>Live Results ({votes.length} votes)</h2>
				<ul>
					{Object.entries(voteCounts)
						.sort(([, a], [, b]) => b - a)
						.map(([name, count]) => (
							<li
								key={name}
								style={{ fontSize: 18, marginBottom: 10 }}>
								<strong>{name}</strong>: {count} vote{count !== 1 ? "s" : ""}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
```

**Step 2: Test full flow**

1. Create room
2. Get invite link (manually copy from DB or add invite UI)
3. Join via invite
4. Vote
5. See realtime updates

Expected: Votes update in realtime across clients.

**Step 3: Commit**

```bash
git add client/src/pages/RoomPage.tsx
git commit -m "feat: room voting page with realtime updates"
```
