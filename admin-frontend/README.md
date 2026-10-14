# ILI Foreign Languages Institute — Administrative Console

**Institute:** ILI Foreign Languages Institute Private Limited  
**Campus Location:** Apollo Tower, MG Road, New Palasia, Indore, MP, India - 452001  
**Default Port:** `3001` (http://localhost:3001)

---

## 🌟 Overview

The Administrative Console is a completely isolated, standalone web application providing full institutional operations for ILI Foreign Languages Institute staff and counselors in Indore.

### Included Capabilities & Pages
1. **Administrative Authentication (`/login`)**:
   - Distinct, security-themed login portal.
   - Communicates with the Centralized Backend API (`POST /api/auth/login`) with bcrypt password hashing and JWT token issuance.
   - Zero hardcoded credentials in frontend JavaScript.
2. **Operational Dashboard (`/dashboard`)**:
   - Institutional metrics: Total enrolled learners, active language programs, new admissions leads, and demo fee collections.
   - Quick access to new walk-in leads from the Apollo Tower center.
3. **Course Management (`/courses`)**:
   - Full course CRUD with keyword search and language filters.
   - Create new CEFR-standardized courses (`/courses/new`).
   - Edit course metadata and tuition tariffs (`/courses/[courseId]/edit`).
4. **Interactive Curriculum Organizer (`/courses/[courseId]/curriculum`)**:
   - Add, reorder, and remove course modules/sections.
   - Add, edit, and delete audio-visual lectures inside modules.
   - Attach lesson durations, summaries, grammar notes, and interactive quizzes.
   - Configure Bunny Stream video IDs for HLS delivery.
   - Direct preview link opening the lesson in the student portal on Customer Frontend.
5. **Student Registry (`/students`)**:
   - Inspect enrolled learners in Indore, enrolled batches, and module completion percentages.
6. **Admissions Leads Desk (`/leads`)**:
   - Real-time review of prospective students submitting website forms, demo requests, or Apollo Tower walk-ins.
   - Lead workflow progression (`New` &rarr; `Contacted` &rarr; `Demo Scheduled` &rarr; `Converted` &rarr; `Closed`).
   - Timestamped follow-up note drawer.
   - "Add Walk-In / Phone Lead" modal for counselors.
7. **Orders & Fee Receipts (`/orders`)**:
   - Review tuition fee payments and receipts (`ILI-YYYY-XXXXX`).
8. **Institute Settings (`/settings`)**:
   - Update official legal registration, Apollo Tower address, phone numbers, email, and announcement banner.

---

## 🚀 Independent Run Commands

To run the Admin Frontend independently:

```bash
cd admin-frontend
npm install
npm run dev
```

The application will start on **[http://localhost:3001](http://localhost:3001)**.

### Build for Production:
```bash
npm run build
npm run start
```

### Type Checking & Lint:
```bash
npm run typecheck
npm run lint
```

---

## 🔒 Security Architecture

- **True Architectural Isolation**: This application runs on its own port and can be deployed to a dedicated administrative subdomain (e.g., `https://admin.example.com`).
- **Server-Enforced Authorization**: Frontend route guards are supplemented by backend middleware. Even if an unauthenticated user or student attempts to craft API requests, the backend rejects unauthorized actions with `401 Unauthorized` or `403 Forbidden`.
- **No Insecure Client Storage**: Sensitive secrets (JWT secrets, MongoDB credentials, Bunny Stream token keys, Razorpay secrets) remain exclusively on the Backend API server.

---

## 🔌 Environment Variables

Refer to `.env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CUSTOMER_URL=http://localhost:3000
```
