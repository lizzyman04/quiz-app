import { getPendingScores, markScoresAsSynced } from '../db/scores';
import { getPendingMutations, removeMutation } from '../db/sync-queue';
import { syncScores } from '../services/scores';
import apiClient from '../services/client';

export class SyncManager {
  static async syncAll() {
    await this.syncScores();
    await this.syncMutations();
  }

  static async syncScores() {
    const scores = await getPendingScores();
    if (scores.length === 0) return;
    try {
      await syncScores(scores);
      await markScoresAsSynced(scores.map(s => s.id!));
      window.dispatchEvent(new CustomEvent('sync:scores'));
    } catch (e) { console.error('Score sync failed', e); }
  }

  static async syncMutations() {
    const mutations = await getPendingMutations();
    for (const m of mutations) {
      try {
        await apiClient.request({ url: m.endpoint, method: m.method, data: m.data });
        await removeMutation(m.id!);
      } catch (e) { console.error('Mutation sync failed', e); }
    }
    window.dispatchEvent(new CustomEvent('sync:mutations'));
  }

  static startBackgroundSync(intervalMs = 30000) {
    const interval = setInterval(() => {
      if (navigator.onLine) this.syncAll();
    }, intervalMs);
    return () => clearInterval(interval);
  }
}
