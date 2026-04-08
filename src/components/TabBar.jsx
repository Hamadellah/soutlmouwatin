function TabBar({ active, onChange }) {
  const tabs = [
    { id: "home",    icon: "🏠", label: "الرئيسية" },
    { id: "report",  icon: "📝", label: "بلّغ" },
    { id: "feed",    icon: "📋", label: "المشاكل" },
    { id: "dash",    icon: "📊", label: "Dashboard" },
    { id: "profile", icon: "🏆", label: "نقاطي" },
  ];
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          flex: 1, padding: "10px 2px", border: "none", background: "transparent",
          cursor: "pointer", fontSize: 11, fontWeight: active === t.id ? 700 : 400,
          color: active === t.id ? "#15803d" : "#6b7280",
          borderBottom: active === t.id ? "2.5px solid #15803d" : "2.5px solid transparent",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          transition: "all 0.15s",
        }}>
          <span style={{ fontSize: 17 }}>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
export default TabBar