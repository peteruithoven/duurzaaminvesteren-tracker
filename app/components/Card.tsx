import Flag from "./icons/Flag";

export default function Card({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="relative flex flex-col justify-center items-center bg-green-100 text-green-700 aspect-square rounded p-5 ">
      <dt className="flex flex-col justify-center items-center gap-2 text-center">
        <Flag />
        {label}
      </dt>
      <dd className="text-center">
        <p className="font-bold">{value}</p>
      </dd>
    </div>
  );
}
