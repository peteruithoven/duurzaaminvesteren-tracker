export default function ProgressCard({
  strokeDasharray,
  percentage,
  label,
  value,
}: {
  strokeDasharray: string;
  percentage: string;
  label: string;
  value: string;
}) {
  return (
    <div className="relative flex aspect-square min-w-44 flex-1 flex-col items-center justify-center gap-2 rounded bg-green-100 p-2 text-green-700 lg:flex-1 lg:p-5">
      <div className="relative">
        <svg
          className="h-[75px] w-[75px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 75 75"
        >
          <g>
            <path
              d="M37.5 3
                  a 34.5 34.5 0 0 1 0 69
                  a 34.5 34.5 0 0 1 0 -69"
              fill="none"
              stroke="#004B46"
              strokeWidth="6"
            ></path>
            <path
              d="M37.5 3
                  a 34.5 34.5 0 0 1 0 69
                  a 34.5 34.5 0 0 1 0 -69"
              fill="none"
              stroke="#50CDB4"
              strokeWidth="6"
              strokeDasharray={strokeDasharray}
            ></path>
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#004B46"
              fontWeight="bold"
            >
              {percentage}
            </text>
          </g>
        </svg>
      </div>
      <dt className="text-center">{label}</dt>
      <dd className="text-center font-bold">{value}</dd>
    </div>
  );
}
