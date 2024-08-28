import { useCallback, useEffect, useState } from "react";

export default function useWakeLock() {
  console.log("useWakeLock");
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);
  console.log("  wakeLock: ", wakeLock);
  const requestWakeLock = useCallback(async () => {
    console.log("requestWakeLock");
    try {
      const wakeLock = await navigator.wakeLock.request("screen");
      console.log("  wakeLock: ", wakeLock);
      setWakeLock(wakeLock);
    } catch (err) {
      console.log("Wake Lock couldn't be activated", err);
    }
  }, []);

  const visibilityChangeHandler = useCallback(async () => {
    console.log("visibilityChangeHandler: ");
    console.log("  document.visibilityState: ", document.visibilityState);
    console.log("  document.hidden: ", document.hidden);
    if (wakeLock !== null && document.visibilityState === "visible") {
      requestWakeLock();
    }
  }, [requestWakeLock]);

  useEffect(() => {
    console.log("useEffect");
    requestWakeLock();
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      wakeLock?.release();
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, [requestWakeLock, visibilityChangeHandler]);

  return { wakeLock };
}
