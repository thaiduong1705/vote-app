# Task 17: End-to-End Testing & Documentation

**Files:**

- Create: `README.md`
- Create: `docs/API.md`

**Step 1: Create README**

Create `README.md`:

````markdown
# Food Voting App MVP

A realtime web app for groups to vote on restaurants within a time window.

## Features

- Token-based authentication (no accounts)
- Realtime voting with WebSocket
- Email invitations & reminders
- Background job processing (BullMQ + Valkey)
- Winner determination (most votes)

## Tech Stack

**Backend:** NestJS, Prisma, PostgreSQL, BullMQ, Valkey, Nodemailer, WebSocket

**Frontend:** React, Vite, TypeScript, Socket.io Client

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL
- Valkey (Redis)

### Backend Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
````

2. Configure environment:

   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. Run migrations:

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Start backend:

   ```bash
   npm run start:dev
   ```

5. Start workers (in separate terminal):
   ```bash
   npm run start:worker
   ```

### Frontend Setup

1. Install dependencies:

   ```bash
   cd client
   npm install
   ```

2. Configure environment:

   ```bash
   cp .env.example .env
   ```

3. Start frontend:
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to http://localhost:5173
2. Create a new voting room
3. Send invites to participants
4. Participants join via invite link
5. Everyone votes for restaurants
6. See realtime results
7. Room closes automatically at end time

## Testing

Run backend tests:

```bash
cd server
npm test
```

## API Documentation

See [docs/API.md](docs/API.md)

## Architecture

- **Main App**: API + WebSocket (port 3000)
- **Workers**: Separate process for email + room closing
- **Queue**: BullMQ with Valkey
- **Database**: PostgreSQL with Prisma ORM

````

**Step 2: Create API documentation**

Create `docs/API.md`:

```markdown
# API Documentation

Base URL: `http://localhost:3000`

## Rooms

### Create Room
`POST /rooms`

Request:
```json
{
  "roomName": "Team Lunch",
  "ownerEmail": "owner@example.com",
  "ownerName": "Alice",
  "startAt": "2026-01-15T12:00:00Z",
  "endAt": "2026-01-15T13:00:00Z"
}
````

Response:

```json
{
	"roomId": "uuid",
	"ownerToken": "token",
	"roomName": "Team Lunch",
	"startAt": "2026-01-15T12:00:00Z",
	"endAt": "2026-01-15T13:00:00Z"
}
```

## Invitations

### Send Invites

`POST /invitations/send`

Request:

```json
{
	"roomId": "uuid",
	"ownerToken": "token",
	"emails": ["user1@example.com", "user2@example.com"]
}
```

### Join Room

`POST /invitations/join`

Request:

```json
{
	"token": "invite-token",
	"name": "Bob"
}
```

## Restaurants

### List Restaurants

`GET /restaurants`

### Create Restaurant

`POST /restaurants`

Request:

```json
{
	"name": "Pizza Hut",
	"menuImageUrl": "https://..."
}
```

## Votes

### Submit Vote

`POST /votes`

Request:

```json
{
	"roomId": "uuid",
	"participantId": "uuid",
	"restaurantId": "uuid"
}
```

### Get Room Votes

`GET /votes/room/:roomId`

## WebSocket Events

Connect to `ws://localhost:3000`

### Client → Server

**Join Room:**

```json
["join-room", { "roomId": "uuid" }]
```

**Leave Room:**

```json
["leave-room", { "roomId": "uuid" }]
```

### Server → Client

**Vote Updated:**

```json
[
	"vote-updated",
	{
		"voteId": "uuid",
		"participantName": "Alice",
		"restaurantName": "KFC",
		"votedAt": "2026-01-15T12:30:00Z"
	}
]
```

**Room Closed:**

```json
[
	"room-closed",
	{
		"roomId": "uuid",
		"winnerName": "KFC"
	}
]
```

````

**Step 3: Manual E2E test**

Run through complete flow:
1. Start PostgreSQL, Valkey
2. Start backend server
3. Start worker process
4. Start frontend
5. Create room
6. Send invites
7. Join via invite (different browser/incognito)
8. Vote from both clients
9. Verify realtime updates
10. Wait for room to close (or manually update end_at to past time)
11. Verify winner calculated

**Step 4: Commit**

```bash
git add README.md docs/API.md
git commit -m "docs: add README and API documentation"
````

