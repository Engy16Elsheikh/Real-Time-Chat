#  SYSTEM.md – Real-Time Chat Application

##  Overview

This is a full-stack real-time chat application built with:

- **Frontend**: Next.js 14+ App Router with Tailwind CSS
- **Backend**: Socket.IO (Node.js), Express-style API routes in Next.js
- **Database**: MongoDB (using Mongoose)
- **Auth**: Session-based (cookies), with login/logout logic
- **Features**:
  - Real-time messaging in rooms
  - Typing indicators
  - Online user tracking
  - Chat history persistence
  - Styled chat UI
  - Secure login & logout

---

##  Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | Next.js 14+, Tailwind CSS |
| Realtime     | Socket.IO                 |
| Backend API  | Next.js Route Handlers    |
| Database     | MongoDB (via Mongoose)    |
| Auth         | Sessions (via cookies)    |

---

##  Folder Structure

```
/app
  /login
  /register
  /home
  /[roomName]
  /layout.tsx

/components
  ClientLayoutWrapper.tsx
  LogoutButton.tsx

/lib
  db.ts
  session.ts

/models
  Message.ts
  User.ts

/pages
  api/
    login.ts
    logout.ts

/public
  (assets)

globals.css
SYSTEM.md
```

---

##  Authentication Flow

###  Login

- `POST /api/login`: verifies credentials
- Sets `session_user` cookie using `setSession` helper
- Redirects to `/home` on success

###  Logout

- `GET /api/logout`: clears cookie via `clearSession`
- Implemented via `<LogoutButton />` in navbar
- Hidden on `/login` page using `usePathname`

---

##  Chat Features

- Socket.IO server runs on port `3001`
- Each room is a route: `/room-name?username=...`
- Server handles:
  - `join-room`: tracks online users, sends last 100 messages
  - `chat-message`: saves to DB, emits to room
  - `typing`: emits to others in room
  - `disconnect`: updates online user list

---

##  UI Design

- **Tailwind-based** chat UI
- **Styled Inputs**: Rounded, soft shadows
- **Message Bubbles**:
  - Sender's message: indigo background
  - Others: white background
- Responsive layout
- Gradient background (`layout.tsx`)
- Logout button shown on every page except `/login`

---

## 🧠 Logic Highlights

- `ClientLayoutWrapper.tsx` checks path via `usePathname`
  - Conditionally renders `<LogoutButton />`
- `LogoutButton.tsx` calls `/api/logout` and redirects
- Protected pages check for `session_user` cookie
- Mongoose `Message` schema with timestamps
- MongoDB connection cached via `lib/db.ts`

---

##  Dependencies

```bash
npm install next react react-dom mongoose socket.io socket.io-client bcryptjs
```

---

##  Run Instructions

1. Start WebSocket server:
```bash
ts-node server/index.ts
```

2. Start Next.js frontend:
```bash
npm run dev
```

3. Visit: `http://localhost:3000/login`

---

## Security Notes

- Passwords are hashed with `bcryptjs`
- Cookies are `httpOnly`, `secure`, `sameSite: 'lax'`
- Sessions expire after 24h

---
