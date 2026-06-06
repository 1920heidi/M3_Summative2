import { useEffect, useState } from "react";

/**
 * Custom hook that debounces a fast-changing value.
 * Used by the search box so filtering reacts smoothly to typing
 * instead of recomputing on every keystroke.
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
