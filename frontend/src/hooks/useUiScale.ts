import { useEffect, useState } from 'react';

const UI_SCALE_KEY = 'dayry-ui-scale';

export const UI_SCALE_OPTIONS = [
  { label: '100% (Default)', value: 1.0 },
  { label: '110% (Comfortable)', value: 1.1 },
  { label: '125% (Large)', value: 1.25 },
  { label: '150% (Extra Large)', value: 1.5 },
] as const;

export type UiScaleValue = typeof UI_SCALE_OPTIONS[number]['value'];

export function useUiScale() {
  const [scale, setScaleState] = useState<UiScaleValue>(() => {
    const stored = localStorage.getItem(UI_SCALE_KEY);
    if (stored) {
      const parsed = parseFloat(stored);
      if (UI_SCALE_OPTIONS.some(opt => opt.value === parsed)) {
        return parsed as UiScaleValue;
      }
    }
    return 1.0;
  });

  const setScale = (newScale: UiScaleValue) => {
    setScaleState(newScale);
    localStorage.setItem(UI_SCALE_KEY, newScale.toString());
    applyScale(newScale);
  };

  useEffect(() => {
    applyScale(scale);
  }, [scale]);

  return { scale, setScale, options: UI_SCALE_OPTIONS };
}

function applyScale(scale: number) {
  document.documentElement.style.setProperty('--ui-scale', scale.toString());
  // Apply to root font-size for rem-based scaling
  const baseFontSize = 16; // Default browser font size
  document.documentElement.style.fontSize = `${baseFontSize * scale}px`;
}
