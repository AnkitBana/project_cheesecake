// Utility to reset theme to light mode
// Run this in browser console if stuck in dark mode: clearTheme()
export const clearTheme = () => {
  localStorage.removeItem('theme');
  window.location.reload();
};

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).clearTheme = clearTheme;
}

// Made with Bob
