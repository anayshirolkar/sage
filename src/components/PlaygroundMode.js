"use client"

import { useState } from "react"
import MonacoEditor from "./MonacoEditor.js"

const PlaygroundMode = ({ benchmarkResults, onUpdateBenchmark, onAddMessage }) => {
  const [currentCode, setCurrentCode] = useState(`import numpy as np
import time

# Matrix operation example
size = 1000
A = np.random.randn(size, size)

start_time = time.time()
Q, R = np.linalg.qr(A)
end_time = time.time()

print(f"CPU Time: {end_time - start_time:.3f} seconds")`)

  const [output, setOutput] = useState(
    "Ready to run your code!\nClick 'Run CPU' or 'Convert & Run GPU' to see the magic happen.\n\nTip: Try the sample NumPy code first, then see the AI convert it to CuPy!",
  )

  const [isRunning, setIsRunning] = useState(false)
  const [solIframeVisible, setSolIframeVisible] = useState(false)

  // Sample conversion patterns for AI simulation
  const conversionPatterns = {
    "import numpy as np": "import cupy as cp",
    "np.": "cp.",
    numpy: "cupy",
  }

  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode)
  }

  const addOutputLine = (text) => {
    setOutput((prev) => prev + "\n" + text)
  }

  const runCPUCode = async () => {
    setIsRunning(true)
    addOutputLine("🖥️ Running NumPy code on CPU...")

    // Simulate execution time
    setTimeout(() => {
      const cpuTime = (Math.random() * 2 + 1.5).toFixed(2) // Random 1.5-3.5s
      const newResults = { ...benchmarkResults, cpuTime: Number.parseFloat(cpuTime) }
      onUpdateBenchmark(newResults)

      addOutputLine(`✅ CPU execution complete: ${cpuTime}s`)
      onAddMessage(
        "ai",
        `I see your CPU code took ${cpuTime} seconds. What do you think we could do to make this faster? Hint: Think about parallel processing! 🤔`,
      )
      setIsRunning(false)
    }, 2000)
  }

  const convertAndRunGPU = async () => {
    setIsRunning(true)
    addOutputLine("🤖 AI converting NumPy to CuPy...")

    setTimeout(() => {
      // Convert the code
      let convertedCode = currentCode
      Object.entries(conversionPatterns).forEach(([from, to]) => {
        convertedCode = convertedCode.replace(new RegExp(from, "g"), to)
      })

      // Add synchronization if not present
      if (!convertedCode.includes("synchronize")) {
        convertedCode = convertedCode.replace(
          "end_time = time.time()",
          "cp.cuda.Device().synchronize()  # Ensure GPU completes\nend_time = time.time()",
        )
      }

      setCurrentCode(convertedCode)
      addOutputLine("🔄 Code converted! Running on GPU...")

      setTimeout(() => {
        const gpuTime = (Math.random() * 0.5 + 0.2).toFixed(2) // Random 0.2-0.7s
        const cpuTime = benchmarkResults.cpuTime || 2.5
        const speedup = (cpuTime / Number.parseFloat(gpuTime)).toFixed(1)

        const newResults = {
          ...benchmarkResults,
          gpuTime: Number.parseFloat(gpuTime),
          speedup: Number.parseFloat(speedup),
        }
        onUpdateBenchmark(newResults)

        addOutputLine(`🚀 GPU execution complete: ${gpuTime}s`)
        addOutputLine(`📊 Speedup achieved: ${speedup}x faster!`)

        onAddMessage(
          "ai",
          `Wow! ${speedup}x speedup by just changing 'np' to 'cp'! What do you think makes the GPU so much faster for this operation? 🚀`,
        )
        setIsRunning(false)
      }, 1500)
    }, 1500)
  }

  const clearResults = () => {
    onUpdateBenchmark({ cpuTime: null, gpuTime: null, speedup: null })
    setOutput("Output cleared. Ready for new execution!")
    setCurrentCode(`import numpy as np
import time

# Matrix operation example
size = 1000
A = np.random.randn(size, size)

start_time = time.time()
Q, R = np.linalg.qr(A)
end_time = time.time()

print(f"CPU Time: {end_time - start_time:.3f} seconds")`)
  }

  const toggleSolInterface = () => {
    setSolIframeVisible(!solIframeVisible)
    if (!solIframeVisible) {
      onAddMessage(
        "ai",
        "Opening Sol interface! You can run code directly on the A100 GPUs. Try copying your converted code there for real benchmarking! 🖥️",
      )
    }
  }

  return (
    <div
      className="playground-mode"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        minHeight: "100vh",
        padding: "2rem",
        color: "#ffffff",
      }}
    >
      {/* Code Editor Section */}
      <div
        className="code-section"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div
          className="editor-panel"
          style={{
            background: "#333333",
            border: "2px solid #ff6b35",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div
            className="editor-header"
            style={{
              background: "#ff6b35",
              padding: "1rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, color: "#ffffff", fontSize: "1.25rem", fontWeight: "700" }}>📝 Code Editor</h3>
            <div className="editor-controls">
              <button
                className="btn btn-outline"
                onClick={toggleSolInterface}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#ffffff",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                {solIframeVisible ? "📋 Hide Sol" : "🖥️ Open Sol A100"}
              </button>
            </div>
          </div>

          {solIframeVisible ? (
            <div className="sol-iframe-container" style={{ height: "400px", position: "relative" }}>
              <iframe
                src="https://ood04.sol.rc.asu.edu/pun/sys/dashboard/batch_connect/sys/bc_jupyter/session_contexts/new/"
                title="Sol A100 Interface"
                className="sol-iframe"
                style={{ width: "100%", height: "100%", border: "none" }}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
              <div
                className="iframe-fallback"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  right: "1rem",
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "#ffffff",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                }}
              >
                <p style={{ margin: 0 }}>🔗 Sol A100 Interface</p>
                <p style={{ margin: 0 }}>
                  If iframe doesn't load,{" "}
                  <a href="https://sol.asu.edu" target="_blank" rel="noopener noreferrer" style={{ color: "#ff6b35" }}>
                    open Sol directly
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div style={{ height: "400px" }}>
              <MonacoEditor code={currentCode} onChange={handleCodeChange} language="python" />
            </div>
          )}
        </div>

        <div
          className="output-panel"
          style={{
            background: "#1a1a1a",
            border: "2px solid #ff8c42",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div
            className="output-header"
            style={{
              background: "#ff8c42",
              padding: "1rem 1.5rem",
            }}
          >
            <h4 style={{ margin: 0, color: "#ffffff", fontSize: "1.25rem", fontWeight: "700" }}>📊 Output Console</h4>
          </div>
          <div
            className="output-content"
            style={{
              padding: "1.5rem",
              height: "350px",
              overflowY: "auto",
              background: "#000000",
              fontFamily: "monospace",
            }}
          >
            <pre style={{ color: "#00ff00", margin: 0, whiteSpace: "pre-wrap" }}>{output}</pre>
          </div>
        </div>
      </div>

      {/* Benchmark Section */}
      <div
        className="benchmark-section"
        style={{
          background: "#333333",
          border: "2px solid #ff6b35",
          borderRadius: "16px",
          padding: "2rem",
        }}
      >
        <div className="benchmark-header" style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              color: "#ff6b35",
              fontSize: "1.5rem",
              fontWeight: "700",
              margin: 0,
            }}
          >
            ⚡ Performance Benchmarking
          </h3>
        </div>

        <div
          className="benchmark-controls"
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <button
            className={`btn btn-primary ${isRunning ? "loading" : ""}`}
            onClick={runCPUCode}
            disabled={isRunning}
            style={{
              background: isRunning ? "#666666" : "linear-gradient(135deg, #ff4500 0%, #ff6b35 100%)",
              color: "#ffffff",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "12px",
              cursor: isRunning ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              boxShadow: "0 4px 8px rgba(255, 69, 0, 0.3)",
            }}
          >
            {isRunning ? "⏳" : "🖥️"} Run CPU (NumPy)
          </button>

          <button
            className={`btn btn-success ${isRunning ? "loading" : ""}`}
            onClick={convertAndRunGPU}
            disabled={isRunning}
            style={{
              background: isRunning ? "#666666" : "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
              color: "#ffffff",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "12px",
              cursor: isRunning ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              boxShadow: "0 4px 8px rgba(255, 107, 53, 0.3)",
            }}
          >
            {isRunning ? "⏳" : "🚀"} Convert & Run GPU
          </button>

          <button
            className="btn btn-outline"
            onClick={clearResults}
            disabled={isRunning}
            style={{
              background: "transparent",
              color: "#cccccc",
              border: "2px solid #666666",
              padding: "1rem 2rem",
              borderRadius: "12px",
              cursor: isRunning ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            🗑️ Clear Results
          </button>
        </div>

        <div
          className="benchmark-results"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            className="result-card cpu"
            style={{
              background: "#1a1a1a",
              border: "2px solid #ff4500",
              borderRadius: "12px",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <h4 style={{ color: "#ff4500", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
              🖥️ CPU Performance
            </h4>
            <div
              className="result-time"
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#ffffff",
                marginBottom: "0.5rem",
              }}
            >
              {benchmarkResults.cpuTime ? `${benchmarkResults.cpuTime.toFixed(2)}s` : "--"}
            </div>
            <div className="result-label" style={{ color: "#cccccc", fontSize: "0.875rem" }}>
              NumPy Execution
            </div>
          </div>

          <div
            className="result-card gpu"
            style={{
              background: "#1a1a1a",
              border: "2px solid #ff6b35",
              borderRadius: "12px",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <h4 style={{ color: "#ff6b35", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
              🚀 GPU Performance
            </h4>
            <div
              className="result-time"
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#ffffff",
                marginBottom: "0.5rem",
              }}
            >
              {benchmarkResults.gpuTime ? `${benchmarkResults.gpuTime.toFixed(2)}s` : "--"}
            </div>
            <div className="result-label" style={{ color: "#cccccc", fontSize: "0.875rem" }}>
              CuPy Execution
            </div>
          </div>
        </div>

        {benchmarkResults.speedup && (
          <div
            className="speedup-banner"
            style={{
              background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
              color: "#ffffff",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "700",
              boxShadow: "0 4px 8px rgba(255, 107, 53, 0.3)",
            }}
          >
            🚀 {benchmarkResults.speedup}x Speedup Achieved!
          </div>
        )}
      </div>
    </div>
  )
}

export default PlaygroundMode
