const formatter = new Intl.NumberFormat("nl-NL", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function formatPercentage(value: number): string {
  return formatter.format(value);
}
