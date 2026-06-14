import { Spinner } from "../ui/spinner";

const VERDICT_STYLES: Record<string, string> = {
  AC:      "text-green-500",
  WA:      "text-red-500",
  TLE:     "text-yellow-700",
  MLE:     "text-orange-700",
  RE:      "text-red-500",
  CE:      "text-red-600",
  PENDING: "text-green-400",
};

const VERDICT_LABELS: Record<string, string> = {
  AC:      "Accepted",
  WA:      "Wrong Answer",
  TLE:     "Time Limit Exceeded",
  MLE:     "Memory Limit Exceeded",
  RE:      "Runtime Error",
  CE:      "Compile Error",
  PENDING: "Pending",
};

export default function VerdictBadge({ verdict }: { verdict: string }) {
  return (
    <span className={`text-xl font-extrabold px-2.5 py-1 rounded-full flex items-center gap-2 ${VERDICT_STYLES[verdict] ?? ""}`}>
      {VERDICT_LABELS[verdict] ?? verdict}
      {verdict === "PENDING" && <Spinner />}
    </span>
  );
}