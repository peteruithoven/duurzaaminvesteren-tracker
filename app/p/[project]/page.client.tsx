"use client";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import getData from "../../actions/getData";
import useTimeout from "../../utils/useTimeout";
import formatMoney from "../../utils/formatMoney";
import InvestedCard from "../../components/InvestedCard";
import ProgressCard from "../../components/ProgressCard";
import { Data } from "../../types";
import Party from "../../components/icons/Party";

const NEW_BACKER_AUDIO = "/audio/newbacker.wav";

export default function ClientPage({ project }: { project: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [prevData, setPrevData] = useState<Data | null>(null);

  const funded = useMemo(() => data?.funded, [data]);
  const prevFunded = useMemo(() => prevData?.funded, [prevData]);

  const isDemo = project === "demo";

  useEffect(() => {
    if (funded == undefined || prevFunded == undefined) return;
    const additionalFunding = funded - prevFunded;
    if (additionalFunding <= 0) return;
    toast.custom(
      <div className="flex gap-2 rounded-lg bg-green-700 p-4 text-white shadow-lg">
        <Party />
        New investor!
        <strong className="font-bold">{formatMoney(additionalFunding)}</strong>
      </div>,
      {
        duration: 1000 * 60,
        position: "bottom-right",
      },
    );
    try {
      const newBackerAudio = new Audio(NEW_BACKER_AUDIO);
      newBackerAudio.play();
    } catch (e) {
      console.error(e);
    }
  }, [funded, prevFunded]);

  useTimeout(
    async () => {
      if (!project) return;
      const newData = await getData({ project });
      setPrevData(data);
      setData(newData);
    },
    isDemo
      ? // refresh every 10 seconds for demo
        1000 * 10
      : // refresh every 1 minute normally
        1000 * 60,
  );

  if (!project) {
    return <div>No project specified</div>;
  }

  if (data === null) {
    return null;
  }

  return (
    <>
      <InvestedCard label="Invested so far" value={formatMoney(data.funded)} />
      <ProgressCard
        strokeDasharray={data.minStrokeDasharray}
        percentage={data.minProgress}
        label="Progress minimum amount"
        value={formatMoney(data.minAmount)}
      />
      <ProgressCard
        strokeDasharray={data.targetStrokeDasharray}
        percentage={data.targetProgress}
        label="Progress target amount"
        value={formatMoney(data.targetAmount)}
      />
    </>
  );
}
