import Flag from "./icons/Flag";

export default function InvestedCard({
  label,
  value,
  timeLeft,
}: {
  label: string;
  value: string;
  timeLeft: string;
}) {
  return (
    <div className="relative flex aspect-square flex-1 flex-col items-center justify-center rounded bg-green-100 p-5 text-green-700">
      <dt className="flex flex-col items-center justify-center gap-2 text-center">
        <Flag />
        {label}
      </dt>
      <dd className="text-center">
        <p className="font-bold">{value}</p>
        <p className="mt-4" dangerouslySetInnerHTML={{ __html: timeLeft }} />
      </dd>
    </div>
  );
}
