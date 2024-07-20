"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import getData from "./actions/getData";
import useProject from "./useProject";
import useTimeout from "./utils/useTimeout";
import formatMoney from "./utils/formatMoney";
import Card from "./components/Card";

const NEW_BACKER_AUDIO = "/audio/newbacker.wav";

export default function ClientPage() {
  const { project } = useProject();
  const [prevFunded, setPrevFunded] = useState<number | null>(null);
  const [funded, setFunded] = useState<number | null>(null);

  useEffect(() => {
    if (funded === null || prevFunded === null || funded <= prevFunded) return;
    console.log("New investor!");
    const diff = funded - prevFunded;
    toast.success(`New investor! +${formatMoney(diff)}`, {
      duration: 1000 * 60,
      position: "top-right",
    });
    try {
      const newBackerAudio = new Audio(NEW_BACKER_AUDIO);
      newBackerAudio.play();
    } catch (e) {
      console.error(e);
    }
  }, [prevFunded, funded]);

  useTimeout(
    async () => {
      if (!project) return;
      const data = await getData({ project });
      setPrevFunded(funded);
      setFunded(data.funded);
    },
    // keep refreshing every minute
    1000 * 60,
  );

  if (!project) {
    return <div>No project specified</div>;
  }

  if (funded === null) {
    return null;
  }

  return <Card label="Invested so far" value={formatMoney(funded)} />;
}
