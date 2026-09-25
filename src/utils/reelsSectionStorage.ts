// Utility to manage custom Heading Text and Images for the Facebook Reels / Student Videos Section
// Persists in localStorage and IndexedDB with cross-component event notification

import { FACEBOOK_STUDENT_REELS } from '../data/mockData';
import { compressImage, saveDrillClassroomPhoto, getDrillClassroomPhotos } from './photoStorage';

export interface ReelsSectionText {
  eyebrow: string;
  heading: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface CustomReelItem {
  id: string;
  title: string;
  studentName: string;
  role: string;
  location: string;
  thumbnail: string;
  duration: string;
  views: string;
  facebookLink: string;
  quote: string;
}

export const DEFAULT_REELS_SECTION_TEXT: ReelsSectionText = {
  eyebrow: 'Direct From Official Facebook Reels',
  heading: 'Selection Reactions & Interview Drives on @bankpluslearning',
  subtitle: 'Watch authentic student reaction moments, mock interview simulations, and campus placement day ceremonies.',
  buttonText: 'Watch All Reels on Facebook',
  buttonLink: 'https://www.facebook.com/bankpluslearning/'
};

// v2: text saved under v1 carried the previous social channel's wording and link,
// and saved text overrides the defaults above, so v1 is intentionally no longer read.
export const TEXT_STORAGE_KEY = 'bankplus_reels_section_text_v2';
const REELS_CUSTOM_ITEMS_KEY = 'bankplus_reels_custom_items_v1';
export const REELS_SECTION_UPDATED_EVENT = 'bankplus_reels_section_updated';

// 1. Get Section Text
export const getReelsSectionText = (): ReelsSectionText => {
  if (typeof window === 'undefined') return { ...DEFAULT_REELS_SECTION_TEXT };
  try {
    const raw = localStorage.getItem(TEXT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_REELS_SECTION_TEXT,
        ...parsed
      };
    }
  } catch (err) {
    console.warn('Failed to load custom reels section text:', err);
  }
  return { ...DEFAULT_REELS_SECTION_TEXT };
};

// 2. Save Section Text
export const saveReelsSectionText = (text: Partial<ReelsSectionText>): ReelsSectionText => {
  const current = getReelsSectionText();
  const updated: ReelsSectionText = {
    ...current,
    ...text
  };

  try {
    localStorage.setItem(TEXT_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save custom reels section text:', err);
  }

  notifyReelsUpdate();
  return updated;
};

// 3. Reset Section Text to Default
export const resetReelsSectionText = (): ReelsSectionText => {
  try {
    localStorage.removeItem(TEXT_STORAGE_KEY);
  } catch {
    // ignore
  }
  notifyReelsUpdate();
  return { ...DEFAULT_REELS_SECTION_TEXT };
};

// 4. Get all Custom Reel Items
export const getCustomReelItems = (): Record<string, Partial<CustomReelItem>> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(REELS_CUSTOM_ITEMS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to read custom reels items:', err);
  }
  return {};
};

// 5. Get merged list of reels (combines mock data defaults with custom overrides and drill photos)
export const getMergedReelsList = (): CustomReelItem[] => {
  const customItems = getCustomReelItems();
  const drillPhotos = getDrillClassroomPhotos();

  return FACEBOOK_STUDENT_REELS.map((defaultReel) => {
    const custom = customItems[defaultReel.id] || {};
    // Priority: custom reel thumbnail > drill classroom photo > default thumbnail
    const customThumbnail = custom.thumbnail || drillPhotos[`drill-${defaultReel.id}`] || defaultReel.thumbnail;

    return {
      ...defaultReel,
      ...custom,
      thumbnail: customThumbnail
    };
  });
};

// 6. Save a single custom reel item (details + thumbnail)
export const saveCustomReelItem = async (
  reelId: string,
  updates: Partial<CustomReelItem>
): Promise<CustomReelItem[]> => {
  const allCustom = getCustomReelItems();
  allCustom[reelId] = {
    ...(allCustom[reelId] || {}),
    ...updates
  };

  try {
    localStorage.setItem(REELS_CUSTOM_ITEMS_KEY, JSON.stringify(allCustom));
  } catch (err) {
    console.warn('Failed to persist custom reel item:', err);
  }

  // If thumbnail was updated, also mirror to drill photo storage for global consistency
  if (updates.thumbnail) {
    try {
      await saveDrillClassroomPhoto(`drill-${reelId}`, updates.thumbnail);
    } catch {
      // non-blocking
    }
  }

  notifyReelsUpdate();
  return getMergedReelsList();
};

// 7. Process and save an image upload for a reel
export const uploadReelImage = async (reelId: string, file: File): Promise<string> => {
  const compressed = await compressImage(file, 900, 0.88);
  await saveCustomReelItem(reelId, { thumbnail: compressed });
  return compressed;
};

// 8. Reset a specific reel to default
export const resetReelItem = async (reelId: string): Promise<CustomReelItem[]> => {
  const allCustom = getCustomReelItems();
  delete allCustom[reelId];

  try {
    localStorage.setItem(REELS_CUSTOM_ITEMS_KEY, JSON.stringify(allCustom));
  } catch {
    // ignore
  }

  // Also remove from drill photos
  try {
    const photos = getDrillClassroomPhotos();
    delete photos[`drill-${reelId}`];
    localStorage.setItem('bankplus_drill_classroom_photos', JSON.stringify(photos));
  } catch {
    // ignore
  }

  notifyReelsUpdate();
  return getMergedReelsList();
};

// 9. Reset entire section (text and all images)
export const resetEntireReelsSection = async (): Promise<void> => {
  try {
    localStorage.removeItem(TEXT_STORAGE_KEY);
    localStorage.removeItem(REELS_CUSTOM_ITEMS_KEY);
  } catch {
    // ignore
  }
  notifyReelsUpdate();
};

// Internal notifier
function notifyReelsUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(REELS_SECTION_UPDATED_EVENT));
  }
}
