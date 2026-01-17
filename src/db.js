const DB_NAME = 'HerVanguardDB';
const STORE_NAME = 'videos';
const DB_VERSION = 1;

export const db = {
    open: () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (event) => reject(event.target.error);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };

            request.onsuccess = (event) => resolve(event.target.result);
        });
    },

    saveVideo: async (blob) => {
        const database = await db.open();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const videoData = {
                id: Date.now(),
                blob: blob,
                date: new Date().toLocaleString(),
                size: blob.size
            };

            const request = store.add(videoData);

            request.onsuccess = () => resolve(videoData.id);
            request.onerror = () => reject(request.error);
        });
    },

    getAllVideos: async () => {
        const database = await db.open();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                // Sort by newest first
                const videos = request.result.sort((a, b) => b.id - a.id);
                resolve(videos);
            };
            request.onerror = () => reject(request.error);
        });
    },

    deleteVideo: async (id) => {
        const database = await db.open();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
};
