# Food Voting App – Implementation Plan (MVP)

## 1. Goal

A lightweight web application that allows a group of people to vote for food choices in a limited time window, without user accounts, but with clear ownership and controlled access.

---

## 2. Design Principles

* No global user accounts
* Identity is **room-scoped**, token-based
* Simple UX, minimal friction
* Realtime updates
* Clear separation between access control and domain data

---

## 3. Core Concepts

### 3.1 Identity Model

* No `users` table
* Identity is created **on demand**
* Two token types:

  * `owner_token`: identifies the room creator
  * `invite_token`: identifies an invited participant

---

## 4. Entities & Attributes

### 4.1 Room

Represents a voting session.

**Attributes**

* id (UUID)
* title
* start_at
* end_at
* status (active | closed)
* owner_id (participant id)
* owner_token
* created_at

**Behavior**

* Can be created only once per request
* Automatically closes after `end_at`
* Accepts votes only when active

---

### 4.2 Participant

Represents a person participating in a room.

**Attributes**

* id (UUID)
* room_id
* email
* display_name
* role (owner | member)
* joined_at

**Behavior**

* Created when:

  * A room is created (owner)
  * An invite is accepted (member)
* Can vote at most once per room
* Owner has management permissions

---

### 4.3 Invite

Represents permission to join a room.

**Attributes**

* id (UUID)
* room_id
* email
* token
* expires_at
* used_at
* created_at

**Behavior**

* Created by room owner
* Sent via email
* Can be used only once
* Invalid after expiration or usage

---

### 4.4 Restaurant

Represents a food vendor.

**Attributes**

* id (UUID)
* name
* is_preset
* created_at

**Behavior**

* Can be pre-seeded
* Auto-created when referenced
* Reused across rooms

---

### 4.5 Food

Represents a menu item.

**Attributes**

* id (UUID)
* restaurant_id
* name
* created_at

**Behavior**

* Belongs to one restaurant
* Can be voted for

---

### 4.6 Vote

Represents a participant’s choice.

**Attributes**

* id (UUID)
* room_id
* participant_id
* food_id
* voted_at

**Behavior**

* One vote per participant per room
* Can be changed before room closes
* Triggers realtime update

---

## 5. System Behavior

### 5.1 Create Room

1. User submits room info + email
2. System creates:

   * Room
   * Owner participant
   * Owner token
3. Owner token returned to client

---

### 5.2 Invite Participants

1. Owner submits email list
2. System creates invite records
3. Email jobs queued
4. Invite links sent

---

### 5.3 Join Room

1. User clicks invite link
2. Token validated
3. Participant created
4. Invite marked as used

---

### 5.4 Voting

1. Participant submits vote
2. System validates:

   * Room active
   * Participant valid
3. Vote upserted
4. Realtime event broadcast

---

### 5.5 Realtime Updates

* Clients open WebSocket per room
* Events:

  * vote_updated
  * room_closed

---

### 5.6 Automatic Closing

* Background job checks `end_at`
* Room marked closed
* Further votes rejected

---

### 5.7 Notifications

* Invite emails (async)
* Reminder emails before end time
* Sent only to participants who have not voted

---

## 6. Non-Goals (MVP)

* Authentication system
* User profiles
* Permissions beyond owner/member
* Analytics
* Payments

---

## 7. Tech Stack (Reference)

* Backend: NestJS
* API: REST + WebSocket
* Database: PostgreSQL
* Queue: BullMQ
* Broker: Valkey
* Email: SMTP 
* Storage: Local PC

---

## 8. MVP Completion Criteria

* No login required
* Owner-controlled rooms
* Token-based access
* Realtime voting
* Email-based flow
