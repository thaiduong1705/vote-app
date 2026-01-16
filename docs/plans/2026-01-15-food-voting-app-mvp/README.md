# Food Voting App MVP - Implementation Tasks

File plan gốc đã được tách thành nhiều file nhỏ để dễ quản lý và theo dõi tiến độ.

## Cấu trúc thư mục

```
docs/plans/2026-01-15-food-voting-app-mvp/
├── README.md                    # File này
├── 00-overview.md              # Tổng quan, mục tiêu, tech stack
├── 01-database-schema.md       # Thiết lập database schema & migrations
├── 02-core-configuration.md    # Cấu hình NestJS core modules
├── 03-bullmq-queue-setup.md    # Thiết lập BullMQ job queue
├── 04-email-worker.md          # Worker xử lý email & room closer
├── 05-rooms-module.md          # API tạo room
├── 06-invitations-module.md    # API gửi invitations
├── 07-join-room.md            # API join room qua invitation
├── 08-restaurants-module.md    # API quản lý restaurants
├── 09-votes-module.md         # API submit & retrieve votes
├── 10-websocket-gateway.md    # WebSocket cho realtime updates
├── 11-scheduled-jobs.md       # Scheduled jobs (room closer, reminders)
├── 12-frontend-setup.md       # Setup React + Vite frontend
├── 13-create-room-page.md     # UI tạo room
├── 14-join-room-page.md       # UI join room
├── 15-room-voting-page.md     # UI voting với realtime
├── 16-invite-ui.md            # UI gửi invitations
├── 17-testing-docs.md         # Testing & Documentation
├── 18-production-build.md     # Docker & production setup
└── 99-completion-checklist.md # Checklist theo dõi tiến độ
```

## Thứ tự thực hiện

### Phase 1: Backend Foundation (Tasks 1-4)
1. Database Schema & Migrations
2. Core Configuration & Modules
3. BullMQ Queue Setup
4. Email Worker Implementation

### Phase 2: API Endpoints (Tasks 5-9)
5. Rooms Module - Create Room
6. Invitations Module - Send Invites
7. Join Room via Invite
8. Restaurants Module - List & Create
9. Votes Module - Submit & Change Vote

### Phase 3: Realtime & Jobs (Tasks 10-11)
10. WebSocket Gateway for Realtime Updates
11. Scheduled Jobs - Room Closer & Reminders

### Phase 4: Frontend (Tasks 12-16)
12. Frontend Setup - React + Vite + TypeScript
13. Create Room Page
14. Join Room Page
15. Room Voting Page with Realtime
16. Add Invite UI for Owners

### Phase 5: Polish (Tasks 17-18)
17. End-to-End Testing & Documentation
18. Production Build & Deployment Prep

## Cách sử dụng

1. **Bắt đầu từ overview**: Đọc `00-overview.md` để hiểu tổng quan dự án
2. **Làm theo thứ tự**: Thực hiện từng task theo số thứ tự (01 → 18)
3. **Check progress**: Cập nhật `99-completion-checklist.md` sau mỗi task hoàn thành
4. **Commit thường xuyên**: Mỗi task nên có ít nhất 1 commit như đã hướng dẫn

## Tips

- Mỗi file task là độc lập, có thể mở và làm việc riêng
- Test ngay sau khi hoàn thành mỗi task
- Đọc kỹ phần "Expected" để biết kết quả mong đợi
- Nếu gặp lỗi, kiểm tra lại các bước trước đó

## Tracking Progress

Sử dụng file `99-completion-checklist.md` để theo dõi tiến độ tổng thể của dự án.
