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
import useWakeLock from "@/app/utils/useWakeLock";
import fireworks from "@/app/utils/fireworks";
import CustomToast from "@/app/components/CustomToast";
import investorConfetti from "@/app/utils/investorConfetti";
import Money from "@/app/components/icons/Money";

const NEW_BACKER_AUDIO = "/audio/newbacker.wav";

export default function ClientPage({ project }: { project: string }) {
  const { wakeLock } = useWakeLock();

  const [data, setData] = useState<Data | null>(null);
  const [prevData, setPrevData] = useState<Data | null>(null);

  const funded = useMemo(() => data?.funded, [data]);
  const prevFunded = useMemo(() => prevData?.funded, [prevData]);
  const minAmount = useMemo(() => data?.minAmount ?? 0, [data]);
  const targetAmount = useMemo(() => data?.targetAmount ?? 0, [data]);

  const isDemo = project === "demo";

  useEffect(() => {
    if (funded == undefined || prevFunded == undefined) return;
    const additionalFunding = funded - prevFunded;
    if (additionalFunding <= 0) return;
    toast.custom(
      <CustomToast>
        <Money />
        New investor!
        <strong className="font-bold">{formatMoney(additionalFunding)}</strong>
      </CustomToast>,
    );
    investorConfetti();
    try {
      const newBackerAudio = new Audio(NEW_BACKER_AUDIO);
      newBackerAudio.play();
    } catch (e) {
      console.error(e);
    }

    if (prevFunded < minAmount && funded >= minAmount) {
      fireworks(30 * 1000);
      toast.custom(
        <CustomToast>
          <Party />
          Minimum amount reached!
        </CustomToast>,
      );
    }

    if (prevFunded < targetAmount && funded >= targetAmount) {
      fireworks(10 * 60 * 1000);
      toast.custom(
        <CustomToast>
          <Party />
          Target amount reached!
        </CustomToast>,
      );
    }
  }, [funded, prevFunded, minAmount, targetAmount]);

  useTimeout(
    async () => {
      if (!project) return;
      try {
        const newData = await getData({ project });
        setPrevData(data);
        setData(newData);
      } catch (err) {
        console.error(err);
      }
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
      <div className={"size-3 " + (wakeLock ? "bg-[green]" : "bg-[red]")}></div>
      <InvestedCard
        label="Invested so far"
        value={formatMoney(data.funded)}
        timeLeft={data.timeLeft}
      />
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
