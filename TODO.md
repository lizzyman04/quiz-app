# Offline Quiz PWA - Roadmap & TODO

**Phase 1: Core Infrastructure ✅**
- [x] Setup PWA configuration
- [x] Install core dependencies  
- [x] Create TypeScript types from OpenAPI
- [x] Setup API service modules

**Phase 2: Offline Storage ✅**
- [x] Setup IndexedDB with Dexie.js
- [x] Create database schema for sessions, questions, scores
- [x] Implement sync queue for offline mutations
- [x] Add background sync service (SyncManager)

**Phase 3: State Management ✅**
- [x] Create Zustand auth store
- [x] Create Zustand quiz store
- [x] Create Zustand sync store
- [x] Create Zustand UI store
- [x] Integrate with React Query

**Phase 4: Teacher Dashboard UI ⏳**
- [ ] Classes management page (CRUD)
- [ ] Students management page (CRUD)
- [ ] Subjects management page (CRUD)
- [ ] Teachers management page (CRUD)

**Phase 5: Quiz Session Management ⏳**
- [ ] Sessions list page
- [ ] Create session form (with class, subject, timer)
- [ ] Question management interface
- [ ] Bulk question upload (text format)
- [ ] Session status controls (draft → active → completed)

**Phase 6: Student Quiz Experience ✅**
- [x] Join quiz by session code page
- [x] Student identification form
- [x] Quiz player interface with timer
- [x] Question navigation (prev/next)
- [x] Answer persistence in IndexedDB
- [x] Score calculation and display

**Phase 7: Offline Synchronization ✅**
- [x] Offline detection hook
- [x] Sync queue processor
- [x] Background sync on reconnect
- [x] Conflict resolution strategy
- [x] Sync status indicators in UI

**Phase 8: Polish & Advanced Features ⏳**
- [ ] Teacher Dashboard (CRUD for all entities)
- [ ] Bulk question upload interface
- [ ] Real-time leaderboard for active sessions
- [ ] Historical results view
- [ ] Authentication (teacher login)
- [ ] PWA installation prompt enhancements
- [ ] Loading states and error boundaries
- [ ] End-to-end testing with Playwright
