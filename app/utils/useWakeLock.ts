import { useCallback, useEffect, useState } from "react";

export default function useWakeLock() {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);
  const requestWakeLock = useCallback(async () => {
    try {
      const wakeLock = await navigator.wakeLock.request("screen");
      setWakeLock(wakeLock);
      console.log("Wake Lock active");
      alert("Wake Lock active");
    } catch (err) {
      console.error("Wake Lock couldn't be activated", err);
      alert("Wake Lock couldn't be activated");
    }
  }, []);

  const visibilityChangeHandler = useCallback(async () => {
    console.log("visibilityChange:", document.visibilityState);
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
