function ReportScreen({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [catId, setCatId] = useState("");
  const [sub, setSub] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("بني ملال، المغرب");
  const [photo, setPhoto] = useState(false);

  const cat = getCat(catId);

  const handleSubmit = () => {
    if (!catId || !sub || !desc) return;
    onSubmit({ catId, sub, desc, location });
    setStep(1); setCatId(""); setSub(""); setDesc(""); setPhoto(false);
  };

  return (
    <div style={{ padding: 16 }}>
      {/* Progress */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[1, 2, 3].map((s) => (
          <div key={s} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: s <= step ? "#15803d" : "#e5e7eb",
            transition: "background 0.3s",
          }} />
        ))}
      </div>

      {step === 1 && (
        <>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 4 }}>اختار نوع المشكل</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Étape 1 sur 3</div>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => { setCatId(c.id); setSub(""); setStep(2); }} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 14,
              background: catId === c.id ? c.color + "12" : "#fff",
              border: `1.5px solid ${catId === c.id ? c.color : "#e5e7eb"}`,
              borderRadius: 10, padding: "12px 16px", marginBottom: 8,
              cursor: "pointer", textAlign: "left", transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 26 }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{c.label}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{c.labelFr}</div>
              </div>
              {catId === c.id && <span style={{ marginLeft: "auto", color: c.color, fontSize: 18 }}>✓</span>}
            </button>
          ))}
        </>
      )}

      {step === 2 && cat && (
        <>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 4 }}>
            {cat.icon} {cat.label} — نوع المشكل
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Étape 2 sur 3</div>
          {cat.sub.map((s) => (
            <button key={s} onClick={() => { setSub(s); setStep(3); }} style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: sub === s ? cat.color + "12" : "#fff",
              border: `1.5px solid ${sub === s ? cat.color : "#e5e7eb"}`,
              borderRadius: 10, padding: "14px 16px", marginBottom: 8,
              cursor: "pointer", fontSize: 14, color: "#111827", fontWeight: sub === s ? 700 : 400,
              transition: "all 0.15s",
            }}>
              {s}
              {sub === s && <span style={{ color: cat.color }}>✓</span>}
            </button>
          ))}
          <button onClick={() => setStep(1)} style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: 13, marginTop: 8 }}>
            ← رجع
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 4 }}>التفاصيل والموقع</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Étape 3 sur 3</div>

          {/* GPS */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#15803d", flexShrink: 0 }} />
            <input value={location} onChange={(e) => setLocation(e.target.value)} style={{
              flex: 1, border: "none", background: "transparent", fontSize: 13, color: "#166534", fontWeight: 600, outline: "none",
            }} />
            <span style={{ fontSize: 16 }}>📍</span>
          </div>

          {/* Description */}
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>الوصف *</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="وصف المشكل بالتفصيل..." style={{
            width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 12px",
            fontSize: 14, resize: "none", height: 90, fontFamily: "inherit", outline: "none",
            color: "#111827", boxSizing: "border-box",
          }} />

          {/* Photo */}
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", margin: "12px 0 6px" }}>صورة (اختياري)</label>
          <div onClick={() => setPhoto(!photo)} style={{
            border: `2px dashed ${photo ? "#15803d" : "#d1d5db"}`, borderRadius: 10,
            padding: "18px", textAlign: "center", cursor: "pointer",
            background: photo ? "#f0fdf4" : "#fafafa", transition: "all 0.2s",
          }}>
            {photo ? (
              <div style={{ color: "#15803d", fontWeight: 600 }}>📸 تم اختيار الصورة ✓</div>
            ) : (
              <div style={{ color: "#9ca3af" }}>📸 اضغط لتحميل صورة<br /><span style={{ fontSize: 11 }}>JPG, PNG — 5MB max</span></div>
            )}
          </div>

          <button onClick={handleSubmit} disabled={!desc} style={{
            width: "100%", background: desc ? "#15803d" : "#d1d5db",
            color: "#fff", border: "none", borderRadius: 10, padding: "14px",
            fontWeight: 700, fontSize: 15, cursor: desc ? "pointer" : "not-allowed",
            marginTop: 16, transition: "background 0.2s",
          }}>
            إرسال البلاغ — +20 نقطة 🎯
          </button>

          <button onClick={() => setStep(2)} style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: 13, marginTop: 10, display: "block" }}>
            ← رجع
          </button>
        </>
      )}
    </div>
  );
}
export default ReportScreen