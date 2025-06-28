"use client"

const Header = ({ currentMode, onModeSwitch }) => {
  return (
    <header
      className="sage-header"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        borderBottom: "2px solid #ff6b35",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        className="logo-section"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          className="sage-logo"
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.1em",
          }}
        >
          SAGE
        </div>
        <div
          className="sage-tagline"
          style={{
            fontSize: "0.875rem",
            color: "#cccccc",
            fontWeight: "500",
            letterSpacing: "0.05em",
          }}
        >
          Smart Assistant for Goal Enhancement
        </div>
      </div>

      <div
        className="mode-toggle"
        style={{
          display: "flex",
          gap: "0.5rem",
          background: "#333333",
          padding: "0.25rem",
          borderRadius: "12px",
          border: "1px solid #444444",
        }}
      >
        <button
          className={`mode-btn ${currentMode === "story" ? "active" : ""}`}
          onClick={() => onModeSwitch("story")}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background: currentMode === "story" ? "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)" : "transparent",
            color: currentMode === "story" ? "#ffffff" : "#cccccc",
            boxShadow: currentMode === "story" ? "0 2px 4px rgba(255, 107, 53, 0.3)" : "none",
          }}
        >
          📖 Story Mode
        </button>
        <button
          className={`mode-btn ${currentMode === "playground" ? "active" : ""}`}
          onClick={() => onModeSwitch("playground")}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background:
              currentMode === "playground" ? "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)" : "transparent",
            color: currentMode === "playground" ? "#ffffff" : "#cccccc",
            boxShadow: currentMode === "playground" ? "0 2px 4px rgba(255, 107, 53, 0.3)" : "none",
          }}
        >
          ⚡ Playground
        </button>
      </div>
    </header>
  )
}

export default Header
