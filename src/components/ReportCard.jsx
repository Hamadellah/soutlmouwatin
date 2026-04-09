import { getCat } from "./../utils/helpers";
import StatusBadge from "./StatusBadge";
function ReportCard({ report, onVote }) {
  const cat = getCat(report.catId);
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 10,
        borderLeft: `4px solid ${cat.color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 6,
          gap: 8,
        }}
      >
        <div
          style={{ fontWeight: 600, fontSize: 14, color: "#111827", flex: 1 }}
        >
          {cat.icon} {report.sub}
        </div>
        <StatusBadge status={report.status} />
      </div>
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
        {report.desc}
      </div>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
        📍 {report.location} · {report.time}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => onVote(report.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: report.voted ? "1.5px solid #15803d" : "1px solid #d1d5db",
            background: report.voted ? "#f0fdf4" : "transparent",
            color: report.voted ? "#15803d" : "#6b7280",
            borderRadius: 20,
            padding: "5px 14px",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: report.voted ? 700 : 400,
            transition: "all 0.15s",
          }}
        >
          👍 {report.votes} تأكيد
        </button>
        {report.mine && (
          <span
            style={{
              fontSize: 11,
              color: "#7c3aed",
              background: "#f5f3ff",
              borderRadius: 20,
              padding: "2px 10px",
            }}
          >
            بلاغك
          </span>
        )}
      </div>
    </div>
  );
}
export default ReportCard;
