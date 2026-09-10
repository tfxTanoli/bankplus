// Utility to manage custom Heading Text and Images for the BankPlus Campus Life Section
// Persists in localStorage and IndexedDB with cross-component event notification

import { STUDENT_COMMUNITY_GALLERY } from '../data/mockData';
import { compressImage, saveDrillClassroomPhoto, getDrillClassroomPhotos } from './photoStorage';

export interface CampusLifeSectionText {
  eyebrow: string;
  heading: string;
  subtitle: string;
}

export interface CustomCampusLifeItem {
  id: string;
  image: string;
  fallbackImage?: string;
  caption: string;
  tag: string;
}

export const DEFAULT_CAMPUS_LIFE_SECTION_TEXT: CampusLifeSectionText = {
  eyebrow: 'Student-Friendly Atmosphere',
  heading: 'Inside BankPlus Campus Life & Learning Centres',
  subtitle: 'Glimpses of daily classroom activities, computer CBT testing labs, 1-on-1 mock interview panels, and selection ceremonies.'
};

const TEXT_STORAGE_KEY = 'bankplus_campus_life_section_text_v1';
const CAMPUS_LIFE_ITEMS_KEY = 'bankplus_campus_life_custom_items_v1';
export const CAMPUS_LIFE_UPDATED_EVENT = 'bankplus_campus_life_updated';

// 1. Get Section Text
export const getCampusLifeSectionText = (): CampusLifeSectionText => {
  if (typeof window === 'undefined') return { ...DEFAULT_CAMPUS_LIFE_SECTION_TEXT };
  try {
    const raw = localStorage.getItem(TEXT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_CAMPUS_LIFE_SECTION_TEXT,
        ...parsed
      };
    }
  } catch (err) {
    console.warn('Failed to load custom campus life section text:', err);
  }
  return { ...DEFAULT_CAMPUS_LIFE_SECTION_TEXT };
};

// 2. Save Section Text
export const saveCampusLifeSectionText = (text: Partial<CampusLifeSectionText>): CampusLifeSectionText => {
  const current = getCampusLifeSectionText();
  const updated: CampusLifeSectionText = {
    ...current,
    ...text
  };

  try {
    localStorage.setItem(TEXT_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save custom campus life section text:', err);
  }

  notifyCampusLifeUpdate();
  return updated;
};

// 3. Reset Section Text to Default
export const resetCampusLifeSectionText = (): CampusLifeSectionText => {
  try {
    localStorage.removeItem(TEXT_STORAGE_KEY);
  } catch {
    // ignore
  }
  notifyCampusLifeUpdate();
  return { ...DEFAULT_CAMPUS_LIFE_SECTION_TEXT };
};

// 4. Get all Custom Campus Life Items
export const getCustomCampusLifeItems = (): Record<string, Partial<CustomCampusLifeItem>> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CAMPUS_LIFE_ITEMS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to read custom campus life items:', err);
  }
  return {};
};

// 5. Get merged list of Campus Life items (combines defaults with custom overrides and classroom photos)
export const getMergedCampusLifeList = (): CustomCampusLifeItem[] => {
  const customItems = getCustomCampusLifeItems();
  const classroomPhotos = getDrillClassroomPhotos();

  return STUDENT_COMMUNITY_GALLERY.map((defaultItem) => {
    const custom = customItems[defaultItem.id] || {};
    // Priority: custom item image > classroom photo cache > default image
    const customImg = custom.image || classroomPhotos[`classroom-${defaultItem.id}`] || defaultItem.image;

    return {
      ...defaultItem,
      ...custom,
      image: customImg
    };
  });
};

// 6. Save a single custom campus life item (caption, tag, image)
export const saveCustomCampusLifeItem = async (
  itemId: string,
  updates: Partial<CustomCampusLifeItem>
): Promise<CustomCampusLifeItem[]> => {
  const allCustom = getCustomCampusLifeItems();
  allCustom[itemId] = {
    ...(allCustom[itemId] || {}),
    ...updates
  };

  try {
    localStorage.setItem(CAMPUS_LIFE_ITEMS_KEY, JSON.stringify(allCustom));
  } catch (err) {
    console.warn('Failed to persist custom campus life item:', err);
  }

  // If image was updated, also mirror to classroom photos storage for global consistency
  if (updates.image) {
    try {
      await saveDrillClassroomPhoto(`classroom-${itemId}`, updates.image);
    } catch {
      // non-blocking
    }
  }

  notifyCampusLifeUpdate();
  return getMergedCampusLifeList();
};

// 7. Process and save an image upload for a campus life card
export const uploadCampusLifeImage = async (itemId: string, file: File): Promise<string> => {
  const compressed = await compressImage(file, 1000, 0.88);
  await saveCustomCampusLifeItem(itemId, { image: compressed });
  return compressed;
};

// 8. Reset a specific campus life item to default
export const resetCampusLifeItem = async (itemId: string): Promise<CustomCampusLifeItem[]> => {
  const allCustom = getCustomCampusLifeItems();
  delete allCustom[itemId];

  try {
    localStorage.setItem(CAMPUS_LIFE_ITEMS_KEY, JSON.stringify(allCustom));
  } catch {
    // ignore
  }

  // Also remove from classroom photos
  try {
    const photos = getDrillClassroomPhotos();
    delete photos[`classroom-${itemId}`];
    localStorage.setItem('bankplus_drill_classroom_photos', JSON.stringify(photos));
  } catch {
    // ignore
  }

  notifyCampusLifeUpdate();
  return getMergedCampusLifeList();
};

// 9. Reset entire section (text and all images)
export const resetEntireCampusLifeSection = async (): Promise<void> => {
  try {
    localStorage.removeItem(TEXT_STORAGE_KEY);
    localStorage.removeItem(CAMPUS_LIFE_ITEMS_KEY);
  } catch {
    // ignore
  }
  notifyCampusLifeUpdate();
};

// Internal notifier
function notifyCampusLifeUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CAMPUS_LIFE_UPDATED_EVENT));
  }
}
