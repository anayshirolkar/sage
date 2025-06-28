"use client"

const Sidebar = ({ currentModule, progress, onModuleSelect }) => {
  const modules = [
    {
      id: 1,
      title: "Python & NumPy Foundations",
      description: "Master array operations and performance basics",
      duration: "15 min",
      icon: "🐍",
      difficulty: "Beginner",
      completed: progress >= 20,
    },
    {
      id: 2,
      title: "GPU Acceleration Discovery",
      description: "Discover GPU power through hands-on comparison",
      duration: "20 min",
      icon: "🚀",
      difficulty: "Beginner",
      completed: progress >= 40,
    },
    {
      id: 3,
      title: "Data Science Pipeline",
      description: "Apply GPU acceleration to real workflows",
      duration: "25 min",
      icon: "📊",
      difficulty: "Intermediate",
      completed: progress >= 60,
    },
    {
      id: 4,
      title: "Advanced GPU Computing",
      description: "Explore custom kernels and simulation",
      duration: "30 min",
      icon: "⚡",
      difficulty: "Advanced",
      completed: progress >= 80,
    },
    {
      id: 5,
      title: "Performance Optimization",
      description: "Master GPU performance tuning techniques",
      duration: "25 min",
      icon: "🎯",
      difficulty: "Advanced",
      completed: progress >= 100,
    },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "#ff6b35"
      case "Intermediate":
        return "#ff8c42"
      case "Advanced":
        return "#ff4500"
      default:
        return "#666666"
    }
  }

  const handleModuleClick = (moduleId) => {
    onModuleSelect(moduleId)
  }

  return (
    <aside
      className="sidebar"
      style={{
        background: "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)",
        borderRight: "2px solid #ff6b35",
        padding: "1.5rem",
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        width: "320px",
        minWidth: "320px",
      }}
    >
      <div className="sidebar-header" style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            color: "#ffffff",
            fontSize: "1.25rem",
            fontWeight: "700",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          🎓 Learning Path
        </h3>
        <div className="progress-section">
          <div
            className="progress-bar"
            style={{
              width: "100%",
              height: "8px",
              background: "#333333",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid #444444",
            }}
          >
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(progress, 100)}%`,
                height: "100%",
                background: "linear-gradient(90deg, #ff6b35 0%, #ff8c42 100%)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            <span
              className="progress-text"
              style={{
                color: "#cccccc",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              {Math.round(progress)}% Complete
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#ff6b35",
                fontWeight: "600",
              }}
            >
              {modules.filter((m) => m.completed).length}/5 Modules
            </span>
          </div>
        </div>
      </div>

      <div className="modules-list" style={{ flex: 1 }}>
        {modules.map((module) => (
          <div
            key={module.id}
            className={`module-item ${currentModule === module.id ? "active" : ""} ${module.completed ? "completed" : ""}`}
            onClick={() => handleModuleClick(module.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleModuleClick(module.id)
              }
            }}
            style={{
              background:
                currentModule === module.id
                  ? "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)"
                  : module.completed
                    ? "rgba(255, 107, 53, 0.1)"
                    : "#333333",
              border: currentModule === module.id ? "2px solid #ff8c42" : "1px solid #444444",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                currentModule === module.id ? "0 4px 8px rgba(255, 107, 53, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => {
              if (currentModule !== module.id) {
                e.target.style.borderColor = "#ff6b35"
                e.target.style.transform = "translateY(-2px)"
              }
            }}
            onMouseLeave={(e) => {
              if (currentModule !== module.id) {
                e.target.style.borderColor = "#444444"
                e.target.style.transform = "translateY(0)"
              }
            }}
          >
            <div
              className="module-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.25rem" }}>{module.icon}</span>
                <div>
                  <strong
                    style={{
                      fontSize: "0.875rem",
                      color: "#ffffff",
                    }}
                  >
                    Module {module.id}
                  </strong>
                  {module.completed && (
                    <span
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "0.75rem",
                        color: currentModule === module.id ? "#ffffff" : "#ff6b35",
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.25rem",
                }}
              >
                <span
                  className="module-duration"
                  style={{
                    fontSize: "0.75rem",
                    color: currentModule === module.id ? "#ffffff" : "#cccccc",
                  }}
                >
                  {module.duration}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: getDifficultyColor(module.difficulty),
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  {module.difficulty}
                </span>
              </div>
            </div>

            <div
              className="module-title"
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#ffffff",
                marginBottom: "0.5rem",
              }}
            >
              {module.title}
            </div>
            <div
              className="module-description"
              style={{
                fontSize: "0.875rem",
                color: currentModule === module.id ? "rgba(255, 255, 255, 0.9)" : "#cccccc",
                lineHeight: "1.4",
              }}
            >
              {module.description}
            </div>

            {currentModule === module.id && (
              <div
                className="module-status"
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.75rem",
                  color: "#ffffff",
                  fontWeight: "600",
                  background: "rgba(255, 255, 255, 0.2)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  display: "inline-block",
                }}
              >
                📍 Currently Learning
              </div>
            )}

            {module.completed && currentModule !== module.id && (
              <div
                style={{
                  fontSize: "0.75rem",
                  marginTop: "0.5rem",
                  color: "#ff6b35",
                  fontWeight: "500",
                }}
              >
                ✅ Completed
              </div>
            )}

            {!module.completed && currentModule !== module.id && module.id > 1 && (
              <div
                style={{
                  fontSize: "0.75rem",
                  marginTop: "0.5rem",
                  color: "#888888",
                  fontStyle: "italic",
                }}
              >
                🔒 Complete previous modules first
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="sidebar-footer"
        style={{
          marginTop: "auto",
          paddingTop: "1.5rem",
          borderTop: "1px solid #444444",
        }}
      >
        {/* Achievement Badge */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
            color: "white",
            padding: "0.75rem",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "1rem",
            boxShadow: "0 4px 6px rgba(255, 107, 53, 0.3)",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>🏆</div>
          <div style={{ fontSize: "0.875rem", fontWeight: "600" }}>GPU Explorer</div>
          <div style={{ fontSize: "0.75rem", opacity: "0.9" }}>
            {progress >= 100 ? "Master Achieved!" : "In Progress..."}
          </div>
        </div>

        {/* Encouragement Message */}
        <div
          style={{
            background: "#333333",
            border: "1px solid #444444",
            borderRadius: "8px",
            padding: "0.75rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "#cccccc",
              margin: 0,
              lineHeight: "1.4",
            }}
          >
            {progress < 20 && "🌟 Welcome to SAGE! Let's start your GPU acceleration journey."}
            {progress >= 20 &&
              progress < 50 &&
              "🚀 Great progress! You're discovering the power of parallel computing."}
            {progress >= 50 && progress < 80 && "💪 Excellent work! You're becoming a GPU acceleration expert."}
            {progress >= 80 && progress < 100 && "🔥 Almost there! Master the final optimization techniques."}
            {progress >= 100 && "🎉 Congratulations! You've mastered GPU acceleration with SAGE!"}
          </p>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              background: "rgba(255, 107, 53, 0.1)",
              border: "1px solid rgba(255, 107, 53, 0.3)",
              borderRadius: "6px",
              padding: "0.5rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "#ff6b35" }}>
              {Math.round((progress / 100) * 115)}
            </div>
            <div style={{ fontSize: "0.7rem", color: "#ff6b35" }}>Minutes Learned</div>
          </div>
          <div
            style={{
              background: "rgba(255, 140, 66, 0.1)",
              border: "1px solid rgba(255, 140, 66, 0.3)",
              borderRadius: "6px",
              padding: "0.5rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "#ff8c42" }}>
              {Math.max(1, Math.round(progress / 20))}x
            </div>
            <div style={{ fontSize: "0.7rem", color: "#ff8c42" }}>Speed Boost</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
