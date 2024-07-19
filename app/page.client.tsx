"use client";
import { useState } from "react";
import getData from "./actions/getData";
import useProject from "./useProject";
import useTimeout from "./utils/useTimeout";
import formatMoney from "./utils/formatMoney";
import Card from "./components/Card";

const NEW_BACKER_AUDIO = "/audio/newbacker.wav";

export default function ClientPage() {
  const { project } = useProject();
  const [funded, setFunded] = useState<number | null>(null);

  useTimeout(
    async () => {
      if (!project) return;
      const data = await getData({ project });

      if (funded !== null && data.funded > funded) {
        console.log("new backer!");
        try {
          const newBackerAudio = new Audio(NEW_BACKER_AUDIO);
          newBackerAudio.play();
        } catch (e) {
          console.error(e);
        }
      }
      setFunded(data.funded);
    },
    // keep refreshing every minute
    1000 * 60
  );

  if (!project || !funded) return null;

  return <Card label="Tot nu toe geïnvesteerd" value={formatMoney(funded)} />;
}
