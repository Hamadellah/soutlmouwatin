import { useState, useEffect } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "clean",   icon: "🧹", label: "النظافة",   labelFr: "Propreté",    color: "#16a34a", sub: ["زبل فالزنقة", "حاويات عامرين", "بلايص خاصها تنظيف"] },
  { id: "road",    icon: "🚦", label: "الطرق",     labelFr: "SafeRoad",    color: "#2563eb", sub: ["حفرة فالطريق", "ضو إشارة مقطوع", "panneaux مكسورين"] },
  { id: "light",   icon: "💡", label: "الإنارة",   labelFr: "Éclairage",   color: "#d97706", sub: ["lampadaire طافي", "مشاكل فالضو"] },
  { id: "env",     icon: "🌳", label: "البيئة",    labelFr: "Environnement",color: "#059669", sub: ["تلوث", "أشجار مقطوعة", "حريق صغير"] },
  { id: "service", icon: "🏥", label: "الخدمات",   labelFr: "Services",    color: "#7c3aed", sub: ["صيدلية مسدودة", "مستشفى فيه مشكل", "مرافق عمومية خاسرة"] },
];

const INITIAL_REPORTS = [
  { id: 1, catId: "road",    sub: "حفرة فالطريق",         desc: "حفرة كبيرة قرب المدرسة، خطر على السيارات والدراجات", location: "شارع محمد الخامس، بني ملال", status: "wip",  votes: 14, mine: false, time: "قبل ساعتين" },
  { id: 2, catId: "light",   sub: "lampadaire طافي",       desc: "الضو طافي من أسبوع ومحدش صلح",                        location: "حي الإدارة، بني ملال",        status: "new",  votes: 6,  mine: false, time: "قبل 5 ساعات" },
  { id: 3, catId: "clean",   sub: "زبل فالزنقة",           desc: "تراكم كبير ديال الزبل، ريحة كتضر",                    location: "حي الورود، بني ملال",         status: "done", votes: 31, mine: false, time: "أمس" },
  { id: 4, catId: "env",     sub: "أشجار مقطوعة",          desc: "شجرة كبيرة طاحت فالطريق، خطر",                        location: "شارع الحسن الثاني",           status: "new",  votes: 3,  mine: false, time: "قبل يومين" },
  { id: 5, catId: "service", sub: "مرافق عمومية خاسرة",   desc: "الحمام العمومي مسدود من أسبوع",                        location: "المركز، بني ملال",            status: "wip",  votes: 9,  mine: false, time: "قبل 3 أيام" },
];

const STATUS_CONFIG = {
  new:  { label: "جديد",          color: "#dc2626", bg: "#fef2f2" },
  wip:  { label: "قيد المعالجة", color: "#d97706", bg: "#fffbeb" },
  done: { label: "تم الحل",       color: "#16a34a", bg: "#f0fdf4" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getCat = (id) => CATEGORIES.find((c) => c.id === id);

// ─── Sub-components ──────────────────────────────────────────────────────────

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

function ReportCard({ report, onVote }) {
  const cat = getCat(report.catId);
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
      padding: "14px 16px", marginBottom: 10,
      borderLeft: `4px solid ${cat.color}`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, gap: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", flex: 1 }}>
          {cat.icon} {report.sub}
        </div>
        <StatusBadge status={report.status} />
      </div>
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>{report.desc}</div>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
        📍 {report.location} · {report.time}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => onVote(report.id)} style={{
          display: "flex", alignItems: "center", gap: 6,
          border: report.voted ? "1.5px solid #15803d" : "1px solid #d1d5db",
          background: report.voted ? "#f0fdf4" : "transparent",
          color: report.voted ? "#15803d" : "#6b7280",
          borderRadius: 20, padding: "5px 14px", fontSize: 13, cursor: "pointer", fontWeight: report.voted ? 700 : 400,
          transition: "all 0.15s",
        }}>
          👍 {report.votes} تأكيد
        </button>
        {report.mine && (
          <span style={{ fontSize: 11, color: "#7c3aed", background: "#f5f3ff", borderRadius: 20, padding: "2px 10px" }}>بلاغك</span>
        )}
      </div>
    </div>
  );
}

// ─── Screens ─────────────────────────────────────────────────────────────────

function HomeScreen({ reports, onVote, onReport }) {
  const recent = reports.slice(0, 3);
  return (
    <div style={{ padding: 16 }}>
      <div style={{
        background: "linear-gradient(135deg, #15803d 0%, #065f46 100%)",
        borderRadius: 14, padding: "18px 20px", marginBottom: 20, color: "#fff",
      }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>مرحباً، مواطن بني ملال 👋</div>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>شوف مشاكل مدينتك</div>
        <button onClick={onReport} style={{
          background: "#fff", color: "#15803d", border: "none", borderRadius: 8,
          padding: "8px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer",
        }}>
          + بلّغ على مشكل
        </button>
      </div>

      <div style={{ fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Categories</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={onReport} style={{
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 8px",
            textAlign: "center", cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.background = c.color + "0d"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#fff"; }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{c.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{c.label}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{c.labelFr}</div>
          </button>
        ))}
      </div>

      <div style={{ fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>آخر البلاغات</div>
      {recent.map((r) => <ReportCard key={r.id} report={r} onVote={onVote} />)}
    </div>
  );
}

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
