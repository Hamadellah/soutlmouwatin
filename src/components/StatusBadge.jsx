function StatusBadge({ status }) {
  const s = STATUS_CONFIG[status];
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.color}33`,
      borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
    }}>
      {status === "new" ? "🔴" : status === "wip" ? "🟡" : "🟢"} {s.label}
    </span>
  );
}
export default StatusBadge