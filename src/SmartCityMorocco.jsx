import TopBar from "./components/TopBar";
import TabBar from "./components/TabBar";

import HomeScreen from "./screens/HomeScreen";
import ReportScreen from "./screens/ReportScreen";
import FeedScreen from "./screens/FeedScreen";
import DashScreen from "./screens/DashScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { INITIAL_REPORTS } from "./data/reports";
import { useState } from "react";
export default function SmartCityMorocco() {
  const [tab, setTab] = useState("home");
  const [reports, setReports] = useState(
    INITIAL_REPORTS.map((r) => ({ ...r, voted: false })),
  );
  const [points, setPoints] = useState(120);
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = "#15803d") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  const handleVote = (id) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const voted = !r.voted;
        setPoints((p) => p + (voted ? 5 : -5));
        showToast(voted ? "👍 تم التأكيد — +5 نقاط!" : "تم إلغاء التأكيد");
        return { ...r, voted, votes: r.votes + (voted ? 1 : -1) };
      }),
    );
  };

  const handleSubmit = ({ catId, sub, desc, location }) => {
    const newReport = {
      id: Date.now(),
      catId,
      sub,
      desc,
      location,
      status: "new",
      votes: 1,
      voted: false,
      mine: true,
      time: "الآن",
    };
    setReports((prev) => [newReport, ...prev]);
    setPoints((p) => p + 20);
    showToast("✅ تم إرسال البلاغ — +20 نقطة!");
    setTab("feed");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 16px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          background: "#f9fafb",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
          display: "flex",
          flexDirection: "column",
          minHeight: 640,
        }}
      >
        <TopBar
          points={points}
          onNotif={() => showToast("🔔 لا توجد إشعارات جديدة", "#374151")}
        />
        <TabBar active={tab} onChange={setTab} />

        <div style={{ flex: 1, overflowY: "auto" }}>
          {tab === "home" && (
            <HomeScreen
              reports={reports}
              onVote={handleVote}
              onReport={() => setTab("report")}
            />
          )}
          {tab === "report" && <ReportScreen onSubmit={handleSubmit} />}
          {tab === "feed" && (
            <FeedScreen
              reports={reports}
              onVote={handleVote}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          )}
          {tab === "dash" && <DashScreen reports={reports} />}
          {tab === "profile" && (
            <ProfileScreen points={points} reports={reports} />
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            background: toast.color,
            color: "#fff",
            borderRadius: 12,
            padding: "10px 20px",
            fontWeight: 600,
            fontSize: 14,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease",
          }}
        >
          {toast.msg}
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}
