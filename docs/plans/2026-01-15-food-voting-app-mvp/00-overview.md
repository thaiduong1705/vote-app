# Food Voting App MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a token-based, realtime food voting web app where groups can vote for restaurants within a time window, with async email notifications and background job processing.

**Architecture:** Hybrid monolith with API+WebSocket in main NestJS process, separate worker process for background jobs (emails, room expiry). BullMQ+Valkey for job queue, PostgreSQL for data, React+Vite frontend with WebSocket client.

**Tech Stack:** NestJS, Prisma, PostgreSQL, BullMQ, Valkey, Nodemailer, WebSocket (@nestjs/websockets), React, Vite, TypeScript

---

## Prerequisites

**Environment Setup:**

- PostgreSQL running locally
- Valkey (Redis) running locally on default port 6379
- SMTP credentials ready (Gmail app password or SendGrid)
- Node.js 18+

**Initial Dependencies Already Installed:**

- @nestjs/core, @nestjs/common, @nestjs/platform-express
- @prisma/client, prisma
- TypeScript, reflect-metadata

---

## Implementation Tasks

1. [Database Schema & Migrations](./01-database-schema.md)
2. [Core Configuration & Modules](./02-core-configuration.md)
3. [BullMQ Queue Setup](./03-bullmq-queue-setup.md)
4. [Email Worker Implementation](./04-email-worker.md)
5. [Rooms Module - Create Room](./05-rooms-module.md)
6. [Invitations Module - Send Invites](./06-invitations-module.md)
7. [Join Room via Invite](./07-join-room.md)
8. [Restaurants Module - List & Create](./08-restaurants-module.md)
9. [Votes Module - Submit & Change Vote](./09-votes-module.md)
10. [WebSocket Gateway for Realtime Updates](./10-websocket-gateway.md)
11. [Scheduled Jobs - Room Closer & Reminders](./11-scheduled-jobs.md)
12. [Frontend Setup - React + Vite + TypeScript](./12-frontend-setup.md)
13. [Create Room Page](./13-create-room-page.md)
14. [Join Room Page](./14-join-room-page.md)
15. [Room Voting Page with Realtime](./15-room-voting-page.md)
16. [Add Invite UI for Owners](./16-invite-ui.md)
17. [End-to-End Testing & Documentation](./17-testing-docs.md)
18. [Production Build & Deployment Prep](./18-production-build.md)

See [Completion Checklist](./99-completion-checklist.md) for progress tracking.
