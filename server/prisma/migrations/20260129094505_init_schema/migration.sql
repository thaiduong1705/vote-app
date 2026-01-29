-- CreateEnum
CREATE TYPE "ROOM_STATUS" AS ENUM ('ACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "PARTICIPANT_ROLE" AS ENUM ('HOST', 'GUEST');

-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "status" "ROOM_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "owner_id" TEXT NOT NULL,
    "winner_restaurant_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participants" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "PARTICIPANT_ROLE" NOT NULL DEFAULT 'GUEST',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitations" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "menu_image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    "participant_email" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    "voted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Rooms_status_end_at_idx" ON "Rooms"("status", "end_at");

-- CreateIndex
CREATE INDEX "Participants_room_id_idx" ON "Participants"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "Participants_room_id_email_key" ON "Participants"("room_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Invitations_room_id_email_key" ON "Invitations"("room_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Invitations_room_id_email_expires_at_key" ON "Invitations"("room_id", "email", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurants_name_key" ON "Restaurants"("name");

-- CreateIndex
CREATE INDEX "Votes_room_id_idx" ON "Votes"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "Votes_room_id_participant_id_key" ON "Votes"("room_id", "participant_id");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_winner_restaurant_id_fkey" FOREIGN KEY ("winner_restaurant_id") REFERENCES "Restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
