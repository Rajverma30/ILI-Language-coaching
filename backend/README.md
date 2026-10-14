# ILI Foreign Languages Institute — Centralized Backend API

**Institute:** ILI Foreign Languages Institute Private Limited  
**Campus:** Apollo Tower, MG Road, New Palasia, Indore, MP, India - 452001  
**Default Port:** `5000` (http://localhost:5000)

---

## 🌟 Overview

The Centralized Backend API manages all business logic, authentication, course records, student progress, enquiry leads, checkout orders, institute settings, and protected video token signing for the ILI Languages Platform.

### Key Capabilities
1. **JWT & Bcrypt Authentication**: Secure student and administrative login with salted password hashing (bcryptjs) and role-enforced route authorization.
2. **Strict Origin CORS**: Restricts resource access to the Customer Frontend (`http://localhost:3000`) and Admin Frontend (`http://localhost:3001`).
3. **Course & Curriculum CRUD**: Complete section and lecture management, accessible only to authenticated admins.
4. **Student Progress**: Dedicated endpoints tracking lecture completions and percentage progress per enrolled course.
5. **Leads & Enquiries**: Captures walk-in and web leads from Indore learners, supports follow-up logging and status workflows.
6. **Bunny Stream Integration**: Generates official signed playback embed URLs server-side with SHA256 tokens, shielding signing secrets from frontends.
7. **Razorpay & WhatsApp Boundaries**: Server-side signature verification and notification dispatch points.

---

## 🚀 Independent Run Commands

To run the backend independently:

```bash
cd backend
npm install
npm run dev
```

### Build for Production:
```bash
npm run build
npm run start
```

### TypeScript Validation:
```bash
npm run typecheck
```

---

## 🔑 Development Seed Accounts

The backend initializes an in-memory seed data store with secure bcrypt-hashed passwords.

| Account Type | Identifier / Email | Password | Role | Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | `vermaraj01110@gmail.com` | `12345` | `student` | Course learning, lecture completion, notes, quiz |
| **Admin** | `admin` or `admin@ililanguages.in` | `12345` | `admin` | Full course manager, student registry, leads desk |

*Note: In production, configure `MONGODB_URI` in `.env` to connect directly to MongoDB Atlas.*

---

## 📡 API Endpoints Reference

### Authentication
- `POST /api/auth/login`: Authenticate student or admin credentials, returns JWT token.
- `GET /api/auth/me`: Inspect current authenticated user identity (Requires Bearer token).

### Courses
- `GET /api/courses`: List all language courses (Public).
- `GET /api/courses/slug/:slug`: Fetch course details by slug (Public).
- `GET /api/courses/:id`: Fetch course details by ID (Public).
- `POST /api/courses`: Create new course (Admin only).
- `PUT /api/courses/:id`: Update course metadata (Admin only).
- `DELETE /api/courses/:id`: Delete course (Admin only).
- `POST /api/courses/:id/sections`: Add module section (Admin only).
- `DELETE /api/courses/:id/sections/:secId`: Remove module section (Admin only).
- `POST /api/courses/:id/sections/:secId/lectures`: Add lecture (Admin only).
- `DELETE /api/courses/:id/sections/:secId/lectures/:lecId`: Remove lecture (Admin only).

### Student Learning & Progress
- `GET /api/students`: List enrolled students (Admin only).
- `GET /api/students/:id`: Retrieve student profile (Student self or Admin).
- `GET /api/students/:id/progress/:courseId`: Get completed lecture IDs and progress percentage.
- `POST /api/students/:id/progress/:courseId/complete`: Toggle lecture completion status.

### Leads & Enquiries
- `POST /api/leads`: Submit free demo class booking or contact inquiry (Public).
- `GET /api/leads`: View all admissions leads (Admin only).
- `PATCH /api/leads/:id/status`: Update lead status (Admin only).
- `POST /api/leads/:id/notes`: Add timestamped follow-up note (Admin only).

### Orders
- `GET /api/orders`: Review sample receipts & enrollment payments (Admin only).
- `POST /api/orders`: Create enrollment order (Student or Admin).

### Institute Settings
- `GET /api/settings`: Fetch institute name, Apollo Tower address, phone, and banner status (Public).
- `PUT /api/settings`: Update institute configuration (Admin only).

### Bunny Stream & Integrations
- `GET /api/integrations/bunny/embed/:videoId`: Securely retrieve embed configuration with server-signed token.
- `POST /api/integrations/razorpay/verify`: Validate HMAC SHA256 checkout signature.
- `POST /api/integrations/whatsapp/notify`: Trigger WhatsApp confirmation notification.
