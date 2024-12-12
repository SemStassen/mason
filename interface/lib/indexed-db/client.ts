import { type IDBPDatabase, openDB } from "idb";
import { DB_CONFIG } from "./config";

class IndexedDBClient {
  private db: Promise<IDBPDatabase>;
  private static instance: IndexedDBClient;

  private constructor() {
    this.db = this.initDB();
  }

  static getInstance() {
    if (!IndexedDBClient.instance) {
      IndexedDBClient.instance = new IndexedDBClient();
    }
    return IndexedDBClient.instance;
  }

  private async initDB() {
    return openDB(DB_CONFIG.name, DB_CONFIG.version, {
      upgrade(db) {
        // Create stores with indexes
        for (const store of Object.values(DB_CONFIG.stores)) {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, {
              keyPath: store.keyPath,
            });
            for (const index of store.indexes) {
              objectStore.createIndex(index.name, index.keyPath);
            }
          }
        }
      },
    });
  }
}

export const idb = IndexedDBClient.getInstance();
