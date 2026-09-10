// Utility to manage BankPlus logo customizations, file uploads, and style selection
// Persists cleanly across reloads and dispatches reactive window events

const LOGO_DATA_KEY = 'bankplus_custom_logo_data';
const LOGO_STYLE_KEY = 'bankplus_logo_style';
const LOGO_SCALE_KEY = 'bankplus_logo_scale';

export type BankPlusLogoStyle = 'emblem' | 'cross' | 'wordmark';

export const getCustomLogo = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(LOGO_DATA_KEY);
  } catch {
    return null;
  }
};

export const saveCustomLogo = (dataUrl: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOGO_DATA_KEY, dataUrl);
    window.dispatchEvent(new Event('bankplus_logo_updated'));
  } catch (e) {
    console.error('Failed to save custom logo to localStorage:', e);
  }
};

export const removeCustomLogo = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(LOGO_DATA_KEY);
    window.dispatchEvent(new Event('bankplus_logo_updated'));
  } catch (e) {
    console.error('Failed to remove custom logo:', e);
  }
};

export const getLogoStyle = (): BankPlusLogoStyle => {
  if (typeof window === 'undefined') return 'emblem';
  try {
    const saved = localStorage.getItem(LOGO_STYLE_KEY);
    if (saved === 'cross' || saved === 'wordmark' || saved === 'emblem') {
      return saved;
    }
  } catch {
    // Ignore
  }
  return 'emblem';
};

export const setLogoStyle = (style: BankPlusLogoStyle): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOGO_STYLE_KEY, style);
    window.dispatchEvent(new Event('bankplus_logo_updated'));
  } catch (e) {
    console.error('Failed to save logo style:', e);
  }
};

export const getLogoScale = (): number => {
  if (typeof window === 'undefined') return 100;
  try {
    const saved = localStorage.getItem(LOGO_SCALE_KEY);
    if (saved) {
      const num = parseInt(saved, 10);
      if (!isNaN(num) && num >= 70 && num <= 150) return num;
    }
  } catch {
    // Ignore
  }
  return 100;
};

export const setLogoScale = (scale: number): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOGO_SCALE_KEY, scale.toString());
    window.dispatchEvent(new Event('bankplus_logo_updated'));
  } catch (e) {
    console.error('Failed to save logo scale:', e);
  }
};
