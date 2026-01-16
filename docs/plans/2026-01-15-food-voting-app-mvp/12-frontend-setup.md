# Task 12: Frontend Setup - React + Vite + TypeScript

**Files:**

- Create: `client/package.json`
- Create: `client/vite.config.ts`
- Create: `client/tsconfig.json`
- Create: `client/index.html`
- Create: `client/src/main.tsx`
- Create: `client/src/App.tsx`

**Step 1: Initialize frontend**

```bash
cd client
npm create vite@latest . -- --template react-ts
```

Accept overwriting files if prompted.

**Step 2: Install dependencies**

```bash
npm install
npm install socket.io-client react-router-dom
npm install -D @types/react @types/react-dom
```

**Step 3: Create API client**

Create `client/src/api/client.ts`:

```typescript
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
	async createRoom(data: { roomName: string; ownerEmail: string; ownerName: string; startAt: string; endAt: string }) {
		const res = await fetch(`${API_BASE}/rooms`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async sendInvites(data: { roomId: string; ownerToken: string; emails: string[] }) {
		const res = await fetch(`${API_BASE}/invitations/send`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async joinRoom(data: { token: string; name: string }) {
		const res = await fetch(`${API_BASE}/invitations/join`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async getRestaurants() {
		const res = await fetch(`${API_BASE}/restaurants`);
		return res.json();
	},

	async createRestaurant(data: { name: string; menuImageUrl?: string }) {
		const res = await fetch(`${API_BASE}/restaurants`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async submitVote(data: { roomId: string; participantId: string; restaurantId: string }) {
		const res = await fetch(`${API_BASE}/votes`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async getRoomVotes(roomId: string) {
		const res = await fetch(`${API_BASE}/votes/room/${roomId}`);
		return res.json();
	},
};
```

**Step 4: Create WebSocket hook**

Create `client/src/hooks/useSocket.ts`:

```typescript
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useSocket = (roomId: string | null) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		if (!roomId) return;

		const socketInstance = io(SOCKET_URL);

		socketInstance.on("connect", () => {
			setIsConnected(true);
			socketInstance.emit("join-room", { roomId });
		});

		socketInstance.on("disconnect", () => {
			setIsConnected(false);
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.emit("leave-room", { roomId });
			socketInstance.disconnect();
		};
	}, [roomId]);

	return { socket, isConnected };
};
```

**Step 5: Create basic App router**

Modify `client/src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoomPage from "./pages/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import RoomPage from "./pages/RoomPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<CreateRoomPage />}
				/>
				<Route
					path="/join/:token"
					element={<JoinRoomPage />}
				/>
				<Route
					path="/room/:roomId"
					element={<RoomPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
```

**Step 6: Create environment file**

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000
```

**Step 7: Test frontend dev server**

Run: `npm run dev`

Expected: Frontend runs on http://localhost:5173

**Step 8: Commit**

```bash
git add client
git commit -m "feat: setup React frontend with Vite and TypeScript"
```
