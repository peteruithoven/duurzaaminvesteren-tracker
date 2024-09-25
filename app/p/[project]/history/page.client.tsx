"use client";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip as TooltipPlugin,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { HistoryItem } from "@/app/types";
import { Line } from "react-chartjs-2";

ChartJS.register(
  TimeScale,
  LinearScale,
  LineElement,
  PointElement,
  TooltipPlugin,
);

export default function ClientPage({ data }: { data: HistoryItem[] }) {
  console.log("ClientPage: ", ClientPage);
  // Extracting timestamps and funded amounts
  const timestamps = data.map((item) => new Date(item.timestamp)); // Directly use date objects
  const fundedAmounts = data.map((item) => item.funded);

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "x",
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour", // Adjust the unit as per your requirement (minute, hour, day, etc.)
          tooltipFormat: "yyyy-mm-dd hh:mm",
          displayFormats: {
            minute: "mm-dd hh:mm",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Invested",
        },
        beginAtZero: true,
      },
    },
  };
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Invested",
        data: fundedAmounts,
        fill: false,
        borderColor: "rgb(80 205 180)",
        tension: 0.1,
        backgroundColor: "rgb(80 205 180)",
        pointStyle: "circle",
        pointRadius: 2,
        pointHoverRadius: 5,
      },
    ],
  };

  return (
    <div className="relative aspect-video w-[600px]">
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}
