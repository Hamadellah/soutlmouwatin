function DashScreen({ reports }) {
  const total = reports.length;
  const done = reports.filter((r) => r.status === "done").length;
  const wip = reports.filter((r) => r.status === "wip").length;
  const newR = reports.filter((r) => r.status === "new").length;
  const pct = (n) => Math.round((n / total) * 100) || 0;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 14 }}>📊 Dashboard — إحصائيات</div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {[
          { label: "إجمالي البلاغات", value: total, color: "#111827" },
          { label: "تم الحل",          value: done,  color: "#16a34a" },
          { label: "قيد المعالجة",    value: wip,   color: "#d97706" },
          { label: "جديدة",            value: newR,  color: "#dc2626" },
        ].map((m) => (
          <div key={m.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 10 }}>معدل الحل</div>
        <div style={{ background: "#f3f4f6", borderRadius: 8, height: 10, marginBottom: 6, overflow: "hidden" }}>
          <div style={{ width: `${pct(done)}%`, background: "#16a34a", height: "100%", borderRadius: 8, transition: "width 0.6s" }} />
        </div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{pct(done)}% من البلاغات تم حلها</div>
      </div>

      {/* By category */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px" }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 12 }}>توزيع حسب النوع</div>
        {CATEGORIES.map((c) => {
          const count = reports.filter((r) => r.catId === c.id).length;
          const w = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 22, textAlign: "center" }}>{c.icon}</span>
              <div style={{ width: 70, fontSize: 12, color: "#374151", flexShrink: 0 }}>{c.label}</div>
              <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 4, height: 7, overflow: "hidden" }}>
                <div style={{ width: `${w}%`, background: c.color, height: "100%", borderRadius: 4, transition: "width 0.5s" }} />
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", width: 22, textAlign: "right" }}>{count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default DashScreen