import { useCallback, useMemo, useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'light';

// const prefersDark = (): boolean => {
//     if (typeof window === 'undefined') return false;

//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
// };

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

// const getStoredAppearance = (): Appearance => {
//     // Always return 'light' to force light theme only
//     return 'light';
// };

// const isDarkMode = (appearance: Appearance): boolean => {
//     // Always return false to disable dark mode
//     return false;
// };

//appearance: Appearance
const applyTheme = (): void => {
    if (typeof document === 'undefined') return;

    // Always apply light theme
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

// const mediaQuery = (): MediaQueryList | null => {
//     if (typeof window === 'undefined') return null;

//     return window.matchMedia('(prefers-color-scheme: dark)');
// };

// const handleSystemThemeChange = (): void => {
//     applyTheme(currentAppearance);
//     notify();
// };

export function initializeTheme(): void {
    if (typeof window === 'undefined') return;

    // Always set to light theme
    currentAppearance = 'light';
    localStorage.setItem('appearance', 'light');
    setCookie('appearance', 'light');
    applyTheme();

    // No need to listen for system theme changes since we only support light theme
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'light',
    );

    const resolvedAppearance: ResolvedAppearance = useMemo(
        () => 'light', // Always return light
        [],
    );

    const updateAppearance = useCallback((): void => { //mode: Appearance param
        // Ignore any theme changes and always force light theme
        currentAppearance = 'light';
        localStorage.setItem('appearance', 'light');
        setCookie('appearance', 'light');
        applyTheme();
        notify();
    }, []);

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
