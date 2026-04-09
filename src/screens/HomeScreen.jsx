import { CATEGORIES } from "./../data/categories";
import ReportCard from "./../components/ReportCard";
function HomeScreen({ reports, onVote, onReport }) {
  const recent = reports.slice(0, 3);
  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          background: "linear-gradient(135deg, #15803d 0%, #065f46 100%)",
          borderRadius: 14,
          padding: "18px 20px",
          marginBottom: 20,
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
          مرحباً، مواطن بني ملال 👋
        </div>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>
          شوف مشاكل مدينتك
        </div>
        <button
          onClick={onReport}
          style={{
            background: "#fff",
            color: "#15803d",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          + بلّغ على مشكل
        </button>
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: "#374151",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Categories
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          marginBottom: 20,
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={onReport}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: "12px 8px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = c.color;
              e.currentTarget.style.background = c.color + "0d";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.background = "#fff";
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{c.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>
              {c.label}
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>
              {c.labelFr}
            </div>
          </button>
        ))}
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: "#374151",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        آخر البلاغات
      </div>
      {recent.map((r) => (
        <ReportCard key={r.id} report={r} onVote={onVote} />
      ))}
    </div>
  );
}
export default HomeScreen;
