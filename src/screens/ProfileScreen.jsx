function ProfileScreen({ points, reports }) {
  const mine = reports.filter((r) => r.mine);
  const BADGES = [
    { icon: "🥇", name: "أول بلاغ",     sub: "مكتسب",    locked: false },
    { icon: "🌟", name: "5 بلاغات",      sub: "مكتسب",    locked: false },
    { icon: "🔥", name: "أكثر تصويت",   sub: "مكتسب",    locked: false },
    { icon: "🏆", name: "20 بلاغ",       sub: "قريباً",   locked: true  },
    { icon: "💎", name: "مواطن ذهبي",   sub: "مغلق",     locked: true  },
    { icon: "🚀", name: "50 بلاغ",       sub: "مغلق",     locked: true  },
  ];
  const rank = points >= 500 ? "مواطن ذهبي 💎" : points >= 200 ? "مواطن نشيط 🌟" : "مواطن مبتدئ 🟢";

  return (
    <div style={{ padding: 16 }}>
      {/* Points banner */}
      <div style={{ background: "linear-gradient(135deg, #15803d, #065f46)", borderRadius: 14, padding: "20px", marginBottom: 18, textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 42, fontWeight: 800 }}>{points}</div>
        <div style={{ fontSize: 13, opacity: 0.8 }}>نقطة مجموعة</div>
        <div style={{ marginTop: 8, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 14px", display: "inline-block", fontSize: 12 }}>
          {rank}
        </div>
      </div>

      {/* Badges */}
      <div style={{ fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>الأوسمة</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {BADGES.map((b) => (
          <div key={b.name} style={{
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
            padding: "12px 8px", textAlign: "center",
            opacity: b.locked ? 0.4 : 1, filter: b.locked ? "grayscale(1)" : "none",
          }}>
            <div style={{ fontSize: 26, marginBottom: 4 }}>{b.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#111827" }}>{b.name}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{b.sub}</div>
          </div>
        ))}
      </div>

      {/* My reports */}
      <div style={{ fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        بلاغاتي ({mine.length})
      </div>
      {mine.length === 0 && (
        <div style={{ textAlign: "center", color: "#9ca3af", padding: "24px 0", fontSize: 14 }}>
          لم تبلغ بعد 🙂<br /><span style={{ fontSize: 12 }}>ابدأ وربح نقاطك!</span>
        </div>
      )}
      {mine.map((r) => {
        const cat = getCat(r.catId);
        return (
          <div key={r.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{cat.icon} {r.sub}</div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{r.time}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <StatusBadge status={r.status} />
              <span style={{ fontSize: 11, color: "#7c3aed", fontWeight: 600 }}>+20 pts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ProfileScreen