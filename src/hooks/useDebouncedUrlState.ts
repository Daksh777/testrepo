import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router";

const useDebouncedUrlState = ({
  key,
  defaultValue,
  debounceMs = 500,
}: {
  key: string;
  defaultValue: string;
  debounceMs?: number;
}): [string, (value: string) => void, () => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Local state for immediate UI updates
  const [localValue, setLocalValue] = useState(
    searchParams.get(key) || defaultValue
  );

  // Update local state when URL changes (for back/forward navigation)
  useEffect(() => {
    const urlValue = searchParams.get(key) || defaultValue;
    setLocalValue(urlValue);
  }, [searchParams, key, defaultValue]);

  // Debounced update to URL
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        if (localValue === defaultValue || localValue === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, localValue);
        }

        return newParams;
      });
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [localValue, key, defaultValue, debounceMs, setSearchParams]);

  const setValue = useCallback((newValue: string) => {
    setLocalValue(newValue);
  }, []);

  // Immediate clear function
  const clearImmediate = useCallback(() => {
    setLocalValue(defaultValue);

    // Clear any pending debounced updates
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Update URL immediately
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete(key);
      return newParams;
    });
  }, [key, defaultValue, setSearchParams]);

  return [localValue, setValue, clearImmediate] as const;
};

export default useDebouncedUrlState;
