# ILI Foreign Languages Institute — Customer & Student Portal

**Institute:** ILI Foreign Languages Institute Private Limited  
**Campus Location:** Apollo Tower, MG Road, New Palasia, Indore, MP, India - 452001  
**Default Port:** `3000` (http://localhost:3000)

---

## 🌟 Overview

The Customer Frontend serves students, prospective learners, and the general public in Indore. It provides a complete editorial presentation of the institute's language programs and a distraction-free student learning portal.

### Included Pages & Features
1. **Public Institute Website**:
   - **`/`**: Homepage featuring Apollo Tower Indore center, immersion methodology, faculty, testimonials, and FAQ.
   - **`/courses`**: Redesigned 3-column / 2-column / 1-column responsive course catalogue with live search, language chips, CEFR levels, and sort controls.
   - **`/courses/[slug]`**: Detailed course curriculum preview, tuition tariff breakdown, and enrollment modal.
   - **`/about`**: Academic philosophy and center history.
   - **`/contact`**: Apollo Tower transit directions, telephone, WhatsApp, and enquiry form.
   - **`/demo`**: Free demo session reservation form.
2. **Student Portal (Role: `student`)**:
   - **`/login`**: Dedicated student authentication page (**Zero admin links or exposed credentials**).
   - **`/student`**: Personal dashboard with enrolled batches and learning metrics.
   - **`/student/courses`**: Enrolled programs with progress bars.
   - **`/student/learn/[courseId]/[lectureId]`**: Dedicated 16:9 video learning stage featuring the **Official Bunny Stream Embedded Player** (`https://player.mediadelivery.net/embed/{libraryId}/{videoId}`), collapsible curriculum sidebar, lecture notes, interactive comprehension quiz, and worksheet downloads.
   - **`/student/orders`**: Purchase history and printable fee receipts.
   - **`/student/profile`**: Student profile and credentials management.

---

## 🚀 Independent Run Commands

To run the Customer Frontend independently:

```bash
cd customer-frontend
npm install
npm run dev
```

The app will start on **[http://localhost:3000](http://localhost:3000)**.

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

## 🔒 Security & Privacy Guarantees

- **No Admin Surface**: All administrative routes (`/admin/*`), navigation links, buttons, and admin credentials are removed from this application.
- **No Credentials in Frontend**: Passwords, tokens, and demo accounts are not displayed in the UI, tooltips, console, or public environment variables.
- **Official Bunny Stream CDN Player**: Protected videos stream directly through the official Bunny Stream player iframe. Token generation is handled securely on the server. If video credentials or IDs are not configured, an honest placeholder state is displayed without fabricating fake playback.

---

## 🔌 Environment Variables

Refer to `.env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID=
NEXT_PUBLIC_INSTITUTE_PHONE=+919826012345
NEXT_PUBLIC_INSTITUTE_EMAIL=admissions@ililanguages.in
NEXT_PUBLIC_INSTITUTE_LOCATION="Apollo Tower, New Palasia, Indore"
```
