function TopBar({ points, onNotif }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏙️</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1.1 }}>SmartCity Morocco</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>بني ملال — مواطن رقمي</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 12px", color: "#fff", fontSize: 13, fontWeight: 600 }}>
          ⭐ {points} pts
        </div>
        <button onClick={onNotif} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 16, color: "#fff" }}>🔔</button>
      </div>
    </div>
  );
}
export default TopBar