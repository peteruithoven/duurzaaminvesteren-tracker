import { useCallback, useEffect, useState } from "react";

export default function useWakeLock() {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);
  const requestWakeLock = useCallback(async () => {
    try {
      const wakeLock = await navigator.wakeLock.request("screen");
      setWakeLock(wakeLock);
    } catch (err) {
      console.log("Wake Lock couldn't be activated", err);
    }
  }, []);

  const visibilityChangeHandler = useCallback(async () => {
    if (wakeLock !== null && document.visibilityState === "visible") {
      requestWakeLock();
    }
  }, [requestWakeLock]);

  useEffect(() => {
    requestWakeLock();
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      wakeLock?.release();
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, [requestWakeLock, visibilityChangeHandler]);
}
