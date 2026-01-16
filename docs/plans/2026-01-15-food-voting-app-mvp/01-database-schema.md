# Task 1: Database Schema & Migrations ✅ COMPLETED

**Files:**

- ✅ `server/prisma/schema.prisma` - Schema finalized
- ✅ Migrations applied
- ✅ Prisma Client generated
- ✅ Seed data loaded

**Current State Analysis:**
Schema is complete and all requirements are met:

- ✅ Rooms (has owner_token, winner_restaurant_id, created_at)
- ✅ Participants (has id, compound unique: room_id + email)
- ✅ Invitations (has token, expires_at)
- ✅ Restaurants (global, has menu_image_url)
- ✅ Votes (has participant_id reference, compound unique: room_id + participant_id)
- ✅ Proper indexes for performance queries

**Step 1: Update Prisma schema** ✅ COMPLETED

```prisma
// server/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum ROOM_STATUS {
  ACTIVE
  CLOSED
}

enum PARTICIPANT_ROLE {
  HOST
  GUEST
}

model Rooms {
  id                    String        @id @default(uuid())
  room_name             String
  start_at              DateTime
  end_at                DateTime
  status                ROOM_STATUS   @default(ACTIVE)
  owner_id              String        // participant id (email)
  owner_token           String        @unique
  winner_restaurant_id  String?
  created_at            DateTime      @default(now())

  participants          Participants[]
  invitations           Invitations[]
  votes                 Votes[]
  winner                Restaurants?   @relation("WinnerRestaurant", fields: [winner_restaurant_id], references: [id])

  @@index([status, end_at])
}

model Participants {
  id                String             @id @default(uuid())
  room_id           String
  email             String
  participant_name  String
  role              PARTICIPANT_ROLE   @default(GUEST)
  joined_at         DateTime           @default(now())

  room              Rooms              @relation(fields: [room_id], references: [id], onDelete: Cascade)
  votes             Votes[]

  @@unique([room_id, email])
  @@index([room_id])
}

model Invitations {
  id          String    @id @default(uuid())
  room_id     String
  email       String
  token       String    @unique
  expires_at  DateTime
  used_at     DateTime?
  created_at  DateTime  @default(now())

  room        Rooms     @relation(fields: [room_id], references: [id], onDelete: Cascade)

  @@unique([room_id, email])
  @@index([token])
}

model Restaurants {
  id              String   @id @default(uuid())
  name            String   @unique
  menu_image_url  String?
  created_at      DateTime @default(now())

  votes           Votes[]
  winner_rooms    Rooms[]  @relation("WinnerRestaurant")
}

model Votes {
  id                 String       @id @default(uuid())
  room_id            String
  participant_id     String
  participant_email  String
  restaurant_id      String
  voted_at           DateTime     @default(now())

  room               Rooms        @relation(fields: [room_id], references: [id], onDelete: Cascade)
  participant        Participants @relation(fields: [participant_id], references: [id], onDelete: Cascade)
  restaurant         Restaurants  @relation(fields: [restaurant_id], references: [id])

  @@unique([room_id, participant_id])
  @@index([room_id])
}
```

**Step 2: Set up environment variables** ✅ COMPLETED (if needed)

Reference for `server/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vote_app"
REDIS_HOST="localhost"
REDIS_PORT=6379
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="Vote App <noreply@voteapp.com>"
FRONTEND_URL="http://localhost:5173"
```

**Step 3: Create migration**

Run:

```bash
cd server
npx prisma migrate dev --name init_schema
```

Expected: Migration created and applied successfully.

**Step 4: Generate Prisma Client**

Run:

```bash
npx prisma generate
```

Expected: Prisma Client generated in `server/generated/prisma/`.

**Step 5: Seed preset restaurants** ✅ COMPLETED

The seed file already exists at `server/prisma/seed.ts` with Vietnamese restaurant data:

```typescript
import { prisma } from "lib/prisma";

async function main() {
	const restaurants = [
		{ name: "Bún bò", menu_image_url: null },
		{ name: "Bún chả", menu_image_url: null },
		{ name: "Cơm tấm Long Xuyên", menu_image_url: null },
		{ name: "Cơm sườn xa", menu_image_url: null },
		{ name: "Hủ tiếu gần", menu_image_url: null },
		{ name: "Cơm gà xối mỡ", menu_image_url: null },
		{ name: "Bún riêu", menu_image_url: null },
		{ name: "Cơm gà xé", menu_image_url: null },
	];

	for (const restaurant of restaurants) {
		await prisma.restaurants.upsert({
			where: { name: restaurant.name },
			update: {},
			create: restaurant,
		});
	}

	console.log("Seeding completed.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
```

**Configuration:**

Added seed config to `server/prisma.config.ts`:

```typescript
migrations: {
	path: "prisma/migrations",
	seed: "tsx ./prisma/seed.ts",
}
```

**Execution:**

- ✅ Generated Prisma Client: `npx prisma generate`
- ✅ Ran seed: `npx prisma db seed`
- ✅ Result: 8 Vietnamese restaurants seeded successfully

