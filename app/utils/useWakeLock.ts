import { useCallback, useEffect, useState } from "react";

export default function useWakeLock() {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);
  const requestWakeLock = useCallback(async () => {
    console.log("requestWakeLock");
    try {
      const wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", (event) => {
        console.log("Wake Lock was released:", event);
        setWakeLock(null);
      });
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
    if (document.visibilityState === "visible") {
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
