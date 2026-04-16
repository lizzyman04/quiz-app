# Quiz App - Offline Classroom PWA

Progressive Web App for offline classroom quizzes with automatic synchronization when back online. Teachers can create quiz sessions, add questions, and students can play quizzes completely offline.

## Tech Stack
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Ready-orange?logo=pwa)
![React Query](https://img.shields.io/badge/React_Query-5-FF4154?logo=react-query)
![Zustand](https://img.shields.io/badge/Zustand-5-443E38)
![Dexie.js](https://img.shields.io/badge/Dexie.js-4-blue)
![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?logo=axios)

## Features
- **Offline-first architecture**: Works without internet once loaded.
- **PWA support**: Installable on mobile and desktop devices.
- **Teacher dashboard**: Manage classes, students, subjects, and teachers.
- **Quiz session management**: Create sessions with timers and bulk question upload.
- **Student quiz player**: Offline answer storage and validation.
- **Automatic synchronization**: Scores are synced to the server when the device reconnects.
- **Leaderboards**: Real-time results and historical score tracking.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (v10+)

### Setup
```bash
git clone <repo-url>
cd quiz-app
pnpm install
cp .env.example .env
# Edit .env with your API URL
pnpm dev
```

## Backend API Info
The backend API runs at `http://0.0.0.0:3000`.
Swagger UI documentation is available at `/swagger-ui`.

## Project Structure
```text
/
├── app/               # Next.js App Router (pages and layouts)
├── components/        # Reusable UI components
├── lib/               # Core logic and services
│   ├── services/      # API service modules (Axios client)
│   ├── types/         # TypeScript definitions (domain-driven)
│   └── store/         # State management (Zustand)
├── public/            # Static assets and PWA manifest/worker
└── hooks/             # Custom React hooks
```

---
All code, comments, and documentation are in English. UI text is in Portuguese.
