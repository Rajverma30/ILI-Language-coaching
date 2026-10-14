# ILI Foreign Languages Institute — Multi-Application Architecture

**Institute:** ILI Foreign Languages Institute Private Limited  
**Campus Location:** Apollo Tower, Mahatma Gandhi Road, New Palasia, Indore, Madhya Pradesh, India - 452001  
**Architecture:** Modern Three-Tier Separated Monorepo (Customer Frontend, Admin Frontend, and Backend API)

---

## 🌟 Executive Summary

The ILI Foreign Languages Institute platform has been upgraded from a single monolithic frontend prototype into three cleanly separated, independently runnable applications:

```
ili-languages/
├── customer-frontend/   # Student portal & public institute website (Port 3000)
├── admin-frontend/      # Restricted operational management console (Port 3001)
├── backend/             # Centralized Node.js/TypeScript REST API (Port 5000)
├── package.json         # Workspace root orchestrator
├── README.md            # Master architectural documentation
└── .gitignore           # Unified version control exclusions
```

Each application contains its own dedicated `package.json`, environment configurations, build pipelines, and documentation.

---

## 🚀 Independent Run Commands

You can open three separate terminal windows and run each application independently:

### Terminal 1: Customer Frontend
```bash
cd customer-frontend
npm install
npm run dev
```
- **Port:** `3000` (http://localhost:3000)
- **Serves:** Prospective learners, public website visitors, and enrolled students.

### Terminal 2: Admin Frontend
```bash
cd admin-frontend
npm install
npm run dev
```
- **Port:** `3001` (http://localhost:3001)
- **Serves:** Academic directors, counselors, and administrative staff.

### Terminal 3: Centralized Backend API
```bash
cd backend
npm install
npm run dev
```
- **Port:** `5000` (http://localhost:5000)
- **Serves:** Authentication, course database, student progress, leads desk, and security boundaries.

---

## 🛠️ Root Monorepo Shortcuts

From the workspace root, you can also run convenient workspace scripts:

```bash
# Start individual apps from root
npm run dev:customer     # Runs Customer Frontend on port 3000
npm run dev:admin        # Runs Admin Frontend on port 3001
npm run dev:backend      # Runs Backend API on port 5000

# Build all three applications
npm run build:all

# Strict TypeScript validation across all three applications
npm run typecheck:all
```

---

## 🌐 Application Architecture & Boundaries

| Aspect | Customer Frontend | Admin Frontend | Backend API |
| :--- | :--- | :--- | :--- |
| **Directory** | `customer-frontend/` | `admin-frontend/` | `backend/` |
| **Port** | `3000` | `3001` | `5000` |
| **Framework** | Next.js 16 (App Router) | Next.js 16 (App Router) | Node.js + Express + TypeScript |
| **Audience** | Public Learners & Students | Academic Staff & Admins | Internal Services |
| **Authentication** | Student Login (`/login`) | Admin Login (`/login`) | Bcrypt Hashed + JWT Tokens |
| **Admin Route Exposure** | **Zero (Completely Removed)** | Full Operational Console | Role Guard (`requireAdmin`) |
| **Credentials Exposure** | **Zero (Removed from UI/Code)** | **Zero (Server Authenticated)** | Pre-seeded with bcrypt hashes |
| **Video Player** | Official Bunny Stream Embed | Curriculum Video Config | Server SHA256 Token Signing |

---

## 🔒 Security & Credential Management

### 1. Customer Portal Security
- **No Admin Navigation**: Administrative routes (`/admin/*`), links, and buttons have been completely eliminated from the customer portal.
- **Zero Exposed Credentials**: Removed all previous demo credentials modals, auto-fill buttons, tooltips, and hardcoded test accounts from customer-facing bundles.
- **Student Authentication Only**: Student login (`/login`) connects directly to `POST /api/auth/login`. Upon authentication, students receive a signed JWT token stored securely for authorized learning requests.

### 2. Admin Portal Security
- **Isolated Hostname Ready**: The admin app has its own separate entry point and configuration, ready to deploy to subdomains such as `https://admin.example.com`.
- **Server-Enforced Authorization**: Frontend route guards are backed by server middleware (`requireAdmin`). Even if a student crafts direct HTTP requests to administrative endpoints, the server returns `403 Forbidden`.
- **Password Hashing**: User passwords are encrypted using salted `bcryptjs` hashing. Plaintext passwords are never stored in databases or transmitted in responses.

### 3. Development Test Accounts
For local evaluation, the backend initializes an in-memory seed data store with pre-hashed accounts:

| Role | Username / Email | Password | Allowed Area |
| :--- | :--- | :--- | :--- |
| **Student** | `vermaraj01110@gmail.com` | `12345` | Customer Portal (`http://localhost:3000/login`) |
| **Admin** | `admin` (or `admin@ililanguages.in`) | `12345` | Admin Console (`http://localhost:3001/login`) |

---

## 🎨 Consistent Design System

All three applications adhere strictly to the ILI Foreign Languages Institute editorial design system:

- **Warm Ivory (`#FAF8F5`)**: Background surfaces, cards, and canvas.
- **Deep Navy (`#0F1D38`)**: Primary brand identity, headers, and major buttons.
- **Burgundy (`#801D30`)**: Accent highlights, CTAs, and active navigation indicators.
- **Gold Highlights (`#C5A059` / `#E0C17E`)**: Secondary accents, CEFR level badges, and completion progress bars.
- **Typography**: Plus Jakarta Sans / Inter body text with Playfair Display editorial serif headings.

---

## 🎬 Bunny Stream Integration (Official Player)

The platform integrates the official Bunny Stream embed player:
`https://player.mediadelivery.net/embed/{video_library_id}/{video_id}`

### How It Operates:
1. **Official Iframe Player**: The video player relies on Bunny's official embedded player. Play/pause, seeking, scrubbers, volume, speed, captions, and fullscreen are managed natively by Bunny without fake or duplicate UI overlays.
2. **Server-Side Token Security**: Protected playback tokens are generated server-side using SHA256 (`tokenKey + videoId + expires`). Signing keys are never exposed to the frontend.
3. **Honest Placeholder State**: When `NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID` or a lecture's video ID is not configured, the interface displays:
   > **"Demo lesson — video not connected"**  
   It provides clear configuration instructions rather than inventing fake playback controls.

---

## 📊 Courses Catalogue Redesign

The Courses Catalogue (`/courses`) on `customer-frontend` has been upgraded:
- **Responsive Layout**: 3 columns on desktop (`lg:grid-cols-3`), 2 columns on tablet (`md:grid-cols-2`), and 1 column on mobile (`grid-cols-1`).
- **Interactive Controls**: Compact search input, proficiency level filters (A1, B1, Advanced, JLPT N5), sort selectors (popularity, tuition tariff, duration), and language chips.
- **Card Consistency**: Standardized 16:10 image aspect ratios, CEFR badges, instructor titles, and an **"Explore Course"** action.

---

## 🔌 Environment Configuration

Each application includes a `.env.example` template:

- **Customer Frontend (`customer-frontend/.env.example`)**:
  - `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
  - `NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID=`
- **Admin Frontend (`admin-frontend/.env.example`)**:
  - `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
  - `NEXT_PUBLIC_CUSTOMER_URL=http://localhost:3000`
- **Backend API (`backend/.env.example`)**:
  - `PORT=5000`
  - `CORS_ORIGIN=http://localhost:3000,http://localhost:3001`
  - `JWT_SECRET=...`
  - `MONGODB_URI=`
  - `BUNNY_STREAM_LIBRARY_ID=`, `BUNNY_STREAM_TOKEN_AUTH_KEY=`
  - `RAZORPAY_KEY_ID=`, `RAZORPAY_KEY_SECRET=`
