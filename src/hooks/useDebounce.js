import { useState, useCallback } from "react";

export default function useDebounce(callback, delay = 300) {
  const [timer, setTimer] = useState(null);

  const debounced = useCallback((...args) => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => callback(...args), delay);
    setTimer(newTimer);
  }, [callback, delay, timer]);

  return debounced;
}
