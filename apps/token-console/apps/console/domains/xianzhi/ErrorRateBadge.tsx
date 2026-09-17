/*
 * @Module : domains/xianzhi/ErrorRateBadge
 * @Family : 🔮 预见·先知
 */
export function ErrorRateBadge({ rate }: { rate: number }) {
  const pct = (rate * 100).toFixed(2);
  const tone =
    rate < 0.01 ? "text-status-success" : rate < 0.05 ? "text-status-warning" : "text-status-danger";
  return <span className={`font-mono text-caption ${tone}`}>{pct}%</span>;
}
