// Utility to manage candidate photos with IndexedDB + localStorage + Canvas compression
// Ensures all 17 authentic student selection flyers persist reliably without quota issues

const LOCAL_STORAGE_KEY = 'bankplus_custom_student_photos';
const DB_NAME = 'BankPlus_Photo_Store';
const DB_STORE = 'student_photos';
const DB_VERSION = 1;

// In-memory cache for synchronous reads during React renders
let photoCache: Record<string, string> = {};
let isInitialized = false;

// Open IndexedDB
const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Initialize photo cache from localStorage first, then IndexedDB
export const initPhotoStorage = async (): Promise<Record<string, string>> => {
  if (isInitialized) return photoCache;

  // 1. Read from localStorage for immediate fast load
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      photoCache = { ...JSON.parse(saved) };
    }
  } catch (err) {
    console.warn('LocalStorage read error:', err);
  }

  // 2. Hydrate from IndexedDB in background
  try {
    const db = await openDatabase();
    const tx = db.transaction(DB_STORE, 'readonly');
    const store = tx.objectStore(DB_STORE);
    const getAllReq = store.getAll();

    await new Promise<void>((resolve) => {
      getAllReq.onsuccess = () => {
        const items = getAllReq.result as Array<{ id: string; dataUrl: string }>;
        if (items && items.length > 0) {
          items.forEach((item) => {
            photoCache[item.id] = item.dataUrl;
          });
        }
        resolve();
      };
      getAllReq.onerror = () => resolve();
    });
  } catch (e) {
    // Non-blocking fallback
  }

  isInitialized = true;
  return photoCache;
};

// Immediate synchronous getter
export const getCustomPhotos = (): Record<string, string> => {
  if (!isInitialized) {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        photoCache = JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    isInitialized = true;
  }
  return { ...photoCache };
};

export const getCustomPhoto = (storyId: string): string | null => {
  const photos = getCustomPhotos();
  return photos[storyId] || null;
};

// Canvas-based image optimizer to prevent LocalStorage QuotaExceededError
export const compressImage = (file: File, maxDim = 800, quality = 0.86): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Convert to lightweight JPEG
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Save a custom photo into both IndexedDB and compressed localStorage
export const saveCustomPhoto = async (storyId: string, dataUrl: string): Promise<void> => {
  photoCache[storyId] = dataUrl;

  // 1. Save to IndexedDB (virtually unlimited quota)
  try {
    const db = await openDatabase();
    const tx = db.transaction(DB_STORE, 'readwrite');
    const store = tx.objectStore(DB_STORE);
    store.put({ id: storyId, dataUrl, updatedAt: Date.now() });
  } catch (err) {
    console.warn('IndexedDB save fallback:', err);
  }

  // 2. Safe save to localStorage
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photoCache));
  } catch (err) {
    // If quota exceeded in localStorage, IndexedDB still holds the data
    console.warn('LocalStorage quota limit reached, persisted in IndexedDB');
  }

  // 3. Dispatch reactive update event to UI
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bankplus_photo_updated', { detail: { storyId, dataUrl } }));
  }
};

// Clear all custom photos
export const clearAllCustomPhotos = async (): Promise<void> => {
  photoCache = {};

  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // ignore
  }

  try {
    const db = await openDatabase();
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).clear();
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bankplus_photo_updated', { detail: {} }));
  }
};

// ==========================================
// DRILL & CLASSROOM PHOTO STORAGE EXTENSION
// ==========================================
const DRILL_CLASSROOM_STORAGE_KEY = 'bankplus_custom_drill_classroom_photos';
let drillClassroomCache: Record<string, string> = {};
let isDrillClassroomInitialized = false;

// Initialize drill & classroom cache
export const initDrillClassroomStorage = async (): Promise<Record<string, string>> => {
  if (isDrillClassroomInitialized) return drillClassroomCache;

  // 1. Read from localStorage for immediate load
  try {
    const saved = localStorage.getItem(DRILL_CLASSROOM_STORAGE_KEY);
    if (saved) {
      drillClassroomCache = { ...JSON.parse(saved) };
    }
  } catch (err) {
    console.warn('Drill/Classroom LocalStorage read error:', err);
  }

  // 2. Hydrate from IndexedDB in background
  try {
    const db = await openDatabase();
    const tx = db.transaction(DB_STORE, 'readonly');
    const store = tx.objectStore(DB_STORE);
    const getAllReq = store.getAll();

    await new Promise<void>((resolve) => {
      getAllReq.onsuccess = () => {
        const items = getAllReq.result as Array<{ id: string; dataUrl: string }>;
        if (items && items.length > 0) {
          items.forEach((item) => {
            if (item.id.startsWith('drill-') || item.id.startsWith('classroom-')) {
              drillClassroomCache[item.id] = item.dataUrl;
            }
          });
        }
        resolve();
      };
      getAllReq.onerror = () => resolve();
    });
  } catch {
    // Non-blocking
  }

  isDrillClassroomInitialized = true;
  return drillClassroomCache;
};

// Immediate synchronous getter
export const getDrillClassroomPhotos = (): Record<string, string> => {
  if (!isDrillClassroomInitialized) {
    try {
      const saved = localStorage.getItem(DRILL_CLASSROOM_STORAGE_KEY);
      if (saved) {
        drillClassroomCache = JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    isDrillClassroomInitialized = true;
  }
  return { ...drillClassroomCache };
};

export const getDrillPhoto = (reelId: string): string | null => {
  const photos = getDrillClassroomPhotos();
  const key = reelId.startsWith('drill-') ? reelId : `drill-${reelId}`;
  return photos[key] || null;
};

export const getClassroomPhoto = (galleryId: string): string | null => {
  const photos = getDrillClassroomPhotos();
  const key = galleryId.startsWith('classroom-') ? galleryId : `classroom-${galleryId}`;
  return photos[key] || null;
};

// Save a custom drill or classroom photo
export const saveDrillClassroomPhoto = async (itemId: string, dataUrl: string): Promise<void> => {
  const standardKey = (itemId.startsWith('drill-') || itemId.startsWith('classroom-'))
    ? itemId
    : itemId.startsWith('reel-')
      ? `drill-${itemId}`
      : `classroom-${itemId}`;

  drillClassroomCache[standardKey] = dataUrl;

  // 1. Save to IndexedDB
  try {
    const db = await openDatabase();
    const tx = db.transaction(DB_STORE, 'readwrite');
    const store = tx.objectStore(DB_STORE);
    store.put({ id: standardKey, dataUrl, updatedAt: Date.now() });
  } catch (err) {
    console.warn('IndexedDB drill/classroom save fallback:', err);
  }

  // 2. Safe save to localStorage
  try {
    localStorage.setItem(DRILL_CLASSROOM_STORAGE_KEY, JSON.stringify(drillClassroomCache));
  } catch (err) {
    console.warn('LocalStorage quota limit reached for drill/classroom photos');
  }

  // 3. Dispatch reactive update event to UI
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('bankplus_drill_classroom_photo_updated', {
        detail: { id: standardKey, dataUrl }
      })
    );
  }
};

// Reset all drill & classroom custom photos
export const clearDrillClassroomPhotos = async (): Promise<void> => {
  drillClassroomCache = {};

  try {
    localStorage.removeItem(DRILL_CLASSROOM_STORAGE_KEY);
  } catch {
    // ignore
  }

  try {
    const db = await openDatabase();
    const tx = db.transaction(DB_STORE, 'readwrite');
    const store = tx.objectStore(DB_STORE);
    // Delete only drill and classroom keys
    const getAllKeysReq = store.getAllKeys();
    getAllKeysReq.onsuccess = () => {
      const keys = getAllKeysReq.result as string[];
      keys.forEach((k) => {
        if (typeof k === 'string' && (k.startsWith('drill-') || k.startsWith('classroom-'))) {
          store.delete(k);
        }
      });
    };
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('bankplus_drill_classroom_photo_updated', { detail: {} })
    );
  }
};

// Intelligent Filename Matcher for 9 user-uploaded WhatsApp photos
export const matchDrillOrClassroomFile = (
  filename: string
): { type: 'drill' | 'classroom'; id: string; targetKey: string } | null => {
  const clean = filename.toLowerCase().replace(/[-_()]/g, ' ').trim();

  // 1. Check for specific WhatsApp filenames from user
  // Drill Reel 1: IMG-20260907-WA0024.jpg
  if (clean.includes('20260907') && clean.includes('wa0024')) {
    return { type: 'drill', id: 'reel-1', targetKey: 'drill-reel-1' };
  }
  // Classroom 1: IMG-20260515-WA0024.jpg
  if (clean.includes('20260515') || (clean.includes('wa0024') && !clean.includes('20260907'))) {
    return { type: 'classroom', id: 'gallery-1', targetKey: 'classroom-gallery-1' };
  }
  // Drill Reel 2: IMG-20260907-WA0025.jpg
  if (clean.includes('wa0025')) {
    return { type: 'drill', id: 'reel-2', targetKey: 'drill-reel-2' };
  }
  // Drill Reel 3: IMG-20260907-WA0022.jpg
  if (clean.includes('wa0022')) {
    return { type: 'drill', id: 'reel-3', targetKey: 'drill-reel-3' };
  }
  // Drill Reel 4: IMG-20260723-WA0013.jpg
  if (clean.includes('wa0013')) {
    return { type: 'drill', id: 'reel-4', targetKey: 'drill-reel-4' };
  }
  // Classroom 2: IMG-20260907-WA0007.jpg (CBT Computer Lab)
  if (clean.includes('wa0007')) {
    return { type: 'classroom', id: 'gallery-2', targetKey: 'classroom-gallery-2' };
  }
  // Classroom 3: IMG-20260907-WA0020.jpg (1-on-1 Mock Interview)
  if (clean.includes('wa0020')) {
    return { type: 'classroom', id: 'gallery-3', targetKey: 'classroom-gallery-3' };
  }
  // Classroom 4: IMG-20260907-WA0008.jpg (Core Banking Training)
  if (clean.includes('wa0008')) {
    return { type: 'classroom', id: 'gallery-4', targetKey: 'classroom-gallery-4' };
  }
  // Classroom 5: IMG-20260907-WA0012.jpg (Felicitation Ceremony)
  if (clean.includes('wa0012')) {
    return { type: 'classroom', id: 'gallery-5', targetKey: 'classroom-gallery-5' };
  }

  // 2. Keyword fallbacks
  if (clean.includes('drill') || clean.includes('speed') || clean.includes('axis')) {
    return { type: 'drill', id: 'reel-1', targetKey: 'drill-reel-1' };
  }
  if (clean.includes('sbi') || clean.includes('parent')) {
    return { type: 'drill', id: 'reel-2', targetKey: 'drill-reel-2' };
  }
  if (clean.includes('math') || clean.includes('vedic')) {
    return { type: 'drill', id: 'reel-3', targetKey: 'drill-reel-3' };
  }
  if (clean.includes('kotak') || clean.includes('campus')) {
    return { type: 'drill', id: 'reel-4', targetKey: 'drill-reel-4' };
  }
  if (clean.includes('study') || clean.includes('cohort') || clean.includes('classroom')) {
    return { type: 'classroom', id: 'gallery-1', targetKey: 'classroom-gallery-1' };
  }
  if (clean.includes('cbt') || clean.includes('computer') || clean.includes('lab')) {
    return { type: 'classroom', id: 'gallery-2', targetKey: 'classroom-gallery-2' };
  }
  if (clean.includes('mock') || clean.includes('panel')) {
    return { type: 'classroom', id: 'gallery-3', targetKey: 'classroom-gallery-3' };
  }
  if (clean.includes('software') || clean.includes('finacle') || clean.includes('branch')) {
    return { type: 'classroom', id: 'gallery-4', targetKey: 'classroom-gallery-4' };
  }
  if (clean.includes('felicitation') || clean.includes('letter') || clean.includes('alumni')) {
    return { type: 'classroom', id: 'gallery-5', targetKey: 'classroom-gallery-5' };
  }

  return null;
};

// Intelligent Filename to Candidate Matcher
// Directly maps the 17 user-provided filenames to the exact candidate ID
export const matchFileToStoryId = (filename: string): string | null => {
  const clean = filename.toLowerCase().replace(/[-_()]/g, ' ').trim();

  // 1. Exact user attached files & candidate names:
  if (clean.includes('january 2020') || clean.includes('shivani')) return 'story-shivani-shrivastava';
  if (clean.includes('placements bankplus 12') || clean.includes('saurabh') || clean.includes('12.png')) return 'story-saurabh-mishra';
  if (clean.includes('january 2019') || clean.includes('shiv singh') || clean.includes('rathore')) return 'story-shiv-singh-rathore';
  if (clean.includes('65 2') || clean.includes('65') || clean.includes('gautam') || clean.includes('bhasker')) return 'story-gautam-bhasker';
  if (clean.includes('67') || clean.includes('akansha')) return 'story-akansha-singh';
  if (clean.includes('22') || clean.includes('atul')) return 'story-atul-singh';
  if (clean.includes('31') || clean.includes('priya') || clean.includes('prajapati')) return 'story-priya-prajapati';
  if (clean.includes('20') || clean.includes('gauri') || clean.includes('dixit')) return 'story-gauri-dixit';
  if (clean.includes('76 1') || clean.includes('76') || clean.includes('jaisawal') || clean.includes('gaurav')) return 'story-gaurav-jaisawal';
  if (clean.includes('74') || clean.includes('simran') || clean.includes('shukla')) return 'story-simran-shukla';
  if (clean.includes('62') || clean.includes('divya')) return 'story-divya-singh';
  if (clean.includes('63') || clean.includes('akash')) return 'story-akash-mishra';
  if (clean.includes('37') || clean.includes('tanu') || clean.includes('agarwal')) return 'story-tanu-agarwal';
  if (clean.includes('25') || clean.includes('hardik') || clean.includes('saxena')) return 'story-hardik-saxena';
  if (clean.includes('54 1') || clean.includes('54') || clean.includes('darshit') || clean.includes('dwivedi')) return 'story-darshit-dwivedi';
  if (clean.startsWith('3.') || clean === '3.png' || clean.includes('aishwarya') || clean.includes('tiwari')) return 'story-aishwarya-tiwari';
  if (clean.includes('2 1') || clean.includes('rashmi') || clean.includes('rani')) return 'story-rashmi-rani';

  return null;
};
