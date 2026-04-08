function FeedScreen({ reports, onVote, filterStatus, setFilterStatus }) {
  const filtered = filterStatus === "all" ? reports : reports.filter((r) => r.status === filterStatus);
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 12 }}>
        كل البلاغات <span style={{ color: "#6b7280", fontWeight: 400, fontSize: 13 }}>({filtered.length})</span>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto" }}>
        {[
          { id: "all", label: "الكل" },
          { id: "new", label: "🔴 جديد" },
          { id: "wip", label: "🟡 معالجة" },
          { id: "done", label: "🟢 تم الحل" },
        ].map((f) => (
          <button key={f.id} onClick={() => setFilterStatus(f.id)} style={{
            padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
            whiteSpace: "nowrap", border: "1.5px solid",
            borderColor: filterStatus === f.id ? "#15803d" : "#e5e7eb",
            background: filterStatus === f.id ? "#f0fdf4" : "#fff",
            color: filterStatus === f.id ? "#15803d" : "#6b7280",
            transition: "all 0.15s",
          }}>{f.label}</button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>لا توجد بلاغات</div>
      )}
      {filtered.map((r) => <ReportCard key={r.id} report={r} onVote={onVote} />)}
    </div>
  );
}
export default FeedScreen