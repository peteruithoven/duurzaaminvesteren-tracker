import { useEffect, useRef } from "react";

export default function useTimeout(callback: Function, delay: number) {
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = async () => {
      await savedCallback.current();
      timeoutRef.current = setTimeout(tick, delay);
    };
    tick();
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);
  return timeoutRef;
}
