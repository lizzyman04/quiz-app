# TODO: Offline Quiz PWA - Backend Integration

## Phase 1: Core Infrastructure ✅
- [x] Setup PWA configuration
- [x] Install core dependencies
- [x] Create TypeScript types from OpenAPI
- [x] Setup API service modules

## Phase 2: Offline Storage (Current Priority)
- [ ] Setup IndexedDB with Dexie.js
- [ ] Create database schema for sessions, questions, scores
- [ ] Implement sync queue for offline mutations
- [ ] Add background sync service

## Phase 3: State Management
- [ ] Create Zustand auth store
- [ ] Create Zustand quiz store
- [ ] Create Zustand sync store
- [ ] Integrate with React Query

## Phase 4: Teacher Dashboard UI
- [ ] Classes management page (CRUD)
- [ ] Students management page (CRUD)
- [ ] Subjects management page (CRUD)
- [ ] Teachers management page (CRUD)

## Phase 5: Quiz Session Management
- [ ] Sessions list page
- [ ] Create session form (with class, subject, timer)
- [ ] Question management interface
- [ ] Bulk question upload (text format)
- [ ] Session status controls (draft → active → completed)

## Phase 6: Student Quiz Experience
- [ ] Join quiz by session code page
- [ ] Student identification form
- [ ] Quiz player interface with timer
- [ ] Question navigation (prev/next)
- [ ] Answer persistence in IndexedDB
- [ ] Score calculation and display

## Phase 7: Offline Synchronization
- [ ] Offline detection hook
- [ ] Sync queue processor
- [ ] Background sync on reconnect
- [ ] Conflict resolution strategy
- [ ] Sync status indicators in UI

## Phase 8: Leaderboard & Polish
- [ ] Real-time leaderboard for active sessions
- [ ] Historical results view
- [ ] PWA installation prompt
- [ ] Custom offline page enhancements
- [ ] Loading states and error boundaries
- [ ] End-to-end testing with Playwright
