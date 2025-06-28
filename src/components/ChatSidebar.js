"use client"

import { useState, useEffect } from "react"

const ChatSidebar = ({ currentMode, onAddMessage }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  // MyAI Builder Configuration
  const getMyAIConfig = () => {
    if (currentMode === "story") {
      return {
        name: "Socratic Guide",
        status: "Guiding Discovery",
        icon: "🧭",
        iframeUrl: "https://app-beta.aiml.asu.edu/38ba769b4321496c874517e22a4cdd83",
        fallbackDescription: "AI tutor that guides learning through Socratic questioning",
      }
    } else {
      return {
        name: "Code Converter",
        status: "Ready to Optimize",
        icon: "⚡",
        iframeUrl: "https://app-beta.aiml.asu.edu/d5400fb227e1411f9b5f3606ebe0e97a",
        fallbackDescription: "AI assistant that converts NumPy code to GPU-accelerated CuPy",
      }
    }
  }

  const tutorConfig = getMyAIConfig()

  // Handle iframe load events
  const handleIframeLoad = () => {
    setIframeLoaded(true)
    setIframeError(false)
  }

  const handleIframeError = () => {
    setIframeError(true)
    setIframeLoaded(false)
  }

  // Reset iframe state when mode changes
  useEffect(() => {
    setIframeLoaded(false)
    setIframeError(false)
  }, [currentMode])

  // Fallback content when iframe fails to load
  const renderFallback = () => (
    <div
      className="iframe-fallback"
      style={{
        padding: "2rem",
        textAlign: "center",
        color: "#ffffff",
      }}
    >
      <div className="tutor-icon" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        {tutorConfig.icon}
      </div>
      <h4 style={{ color: "#ff6b35", marginBottom: "1rem" }}>{tutorConfig.name}</h4>
      <p style={{ marginBottom: "1.5rem", color: "#cccccc" }}>{tutorConfig.fallbackDescription}</p>

      <div
        style={{
          padding: "1rem",
          background: "#333333",
          borderRadius: "8px",
          border: "2px solid #ff6b35",
          marginBottom: "1rem",
        }}
      >
        <h5 style={{ marginBottom: "0.5rem", color: "#ff6b35" }}>🔗 MyAI Builder Integration</h5>
        <p style={{ fontSize: "0.8rem", color: "#cccccc", marginBottom: "0.5rem" }}>To activate the AI tutor:</p>
        <ol style={{ fontSize: "0.8rem", color: "#cccccc", paddingLeft: "1rem", textAlign: "left" }}>
          <li>Update the iframe URL with your MyAI Builder link</li>
          <li>Configure your AI assistants in MyAI Builder</li>
          <li>Train them with the SAGE curriculum content</li>
        </ol>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => window.open("https://myai.builder", "_blank")}
        style={{
          fontSize: "0.875rem",
          background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
          color: "#ffffff",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        🚀 Open MyAI Builder
      </button>

      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "#1a1a1a",
          borderRadius: "8px",
          border: "2px solid #ff8c42",
        }}
      >
        <h6 style={{ marginBottom: "0.5rem", color: "#ff8c42" }}>Demo Mode Active</h6>
        <p style={{ fontSize: "0.8rem", color: "#cccccc" }}>
          {currentMode === "story"
            ? "This would be your Socratic AI tutor guiding discovery through questions."
            : "This would be your Code Converter AI optimizing NumPy to CuPy code."}
        </p>
      </div>
    </div>
  )

  // Loading state
  const renderLoading = () => (
    <div
      className="iframe-fallback"
      style={{
        padding: "2rem",
        textAlign: "center",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid #333333",
          borderTop: "3px solid #ff6b35",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "1rem",
          margin: "0 auto 1rem auto",
        }}
      ></div>
      <h4 style={{ color: "#ff6b35" }}>Loading {tutorConfig.name}...</h4>
      <p style={{ color: "#cccccc" }}>Connecting to MyAI Builder</p>
    </div>
  )

  return (
    <aside
      className="chat-sidebar"
      style={{
        background: "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)",
        borderLeft: "2px solid #ff6b35",
        width: "350px",
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="chat-header"
        style={{
          background: "#333333",
          border: "2px solid #ff6b35",
          borderRadius: "12px",
          margin: "1rem",
          padding: "1.5rem",
        }}
      >
        <div
          className="tutor-info"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <span className="tutor-icon" style={{ fontSize: "2rem" }}>
            {tutorConfig.icon}
          </span>
          <div>
            <h3 style={{ margin: 0, color: "#ffffff", fontSize: "1.25rem", fontWeight: "700" }}>{tutorConfig.name}</h3>
            <p
              className="tutor-status"
              style={{
                margin: 0,
                color: "#ff6b35",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              {tutorConfig.status}
            </p>
          </div>
        </div>

        <div className="integration-status" style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: "0.75rem",
              color: iframeLoaded ? "#ff6b35" : "#ff8c42",
              fontWeight: "500",
              background: iframeLoaded ? "rgba(255, 107, 53, 0.1)" : "rgba(255, 140, 66, 0.1)",
              padding: "0.25rem 0.75rem",
              borderRadius: "1rem",
              border: `1px solid ${iframeLoaded ? "#ff6b35" : "#ff8c42"}`,
            }}
          >
            {iframeLoaded ? "🟢 Connected" : "🟡 Demo Mode"}
          </span>
        </div>
      </div>

      <div
        className="myai-iframe-container"
        style={{
          flex: 1,
          margin: "0 1rem 1rem 1rem",
          background: "#333333",
          border: "2px solid #444444",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {!iframeError ? (
          <>
            {!iframeLoaded && renderLoading()}
            <iframe
              className="myai-iframe"
              src={tutorConfig.iframeUrl}
              title={`${tutorConfig.name} - MyAI Builder`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: iframeLoaded ? "block" : "none",
                background: "#ffffff",
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              allow="clipboard-read; clipboard-write"
            />
          </>
        ) : (
          renderFallback()
        )}
      </div>

      {/* Quick Integration Guide */}
      <div
        style={{
          margin: "0 1rem 1rem 1rem",
          padding: "0.75rem",
          background: "rgba(255, 107, 53, 0.1)",
          border: "1px solid rgba(255, 107, 53, 0.2)",
          borderRadius: "8px",
        }}
      >
        <h6
          style={{
            fontSize: "0.8rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#ff6b35",
          }}
        >
          🔧 Integration Ready
        </h6>
        <p
          style={{
            fontSize: "0.75rem",
            color: "#ff6b35",
            margin: 0,
            lineHeight: "1.4",
          }}
        >
          Replace the iframe URLs above with your trained MyAI Builder assistants for full functionality.
        </p>
      </div>

      {/* Mode-specific tips */}
      <div
        style={{
          margin: "0 1rem 1rem 1rem",
          padding: "0.75rem",
          background: "rgba(255, 140, 66, 0.1)",
          border: "1px solid rgba(255, 140, 66, 0.2)",
          borderRadius: "8px",
        }}
      >
        <h6
          style={{
            fontSize: "0.8rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#ff8c42",
          }}
        >
          💡 {currentMode === "story" ? "Socratic Training Tips" : "Code Converter Tips"}
        </h6>
        <ul
          style={{
            fontSize: "0.7rem",
            color: "#ff8c42",
            margin: 0,
            paddingLeft: "1rem",
            lineHeight: "1.4",
          }}
        >
          {currentMode === "story" ? (
            <>
              <li>Train with questioning techniques</li>
              <li>Never give direct answers</li>
              <li>Guide discovery through hints</li>
            </>
          ) : (
            <>
              <li>Train with NumPy → CuPy patterns</li>
              <li>Include performance explanations</li>
              <li>Suggest optimization techniques</li>
            </>
          )}
        </ul>
      </div>

      {/* Add CSS animation for loading spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </aside>
  )
}

export default ChatSidebar
