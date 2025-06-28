"use client"

// components/StoryMode.js - Enhanced Educational Story Mode with Detailed Modules
import { useState } from "react"

const StoryMode = ({ currentModule, onModeSwitch, onAddMessage }) => {
  const [showLearningObjectives, setShowLearningObjectives] = useState(false)
  const [completedObjectives, setCompletedObjectives] = useState({})

  const moduleContent = {
    1: {
      title: "🐍 Computational Foundations & Performance Mindset",
      duration: "45-60 minutes",
      prerequisites: "Basic Python knowledge",
      character: "Meet Alex, Computer Science Student",
      scenario:
        "Alex is learning data science and working with NumPy arrays. The operations are working, but they're curious about performance and wondering if there's room for improvement. Alex notices that as datasets grow larger, simple operations take much longer than expected.",
      problem:
        "Alex's basic matrix operations are functional but slow. They need to understand computational foundations before diving into acceleration techniques. A simple matrix multiplication that should be fast is taking over 2 seconds!",

      learningObjectives: [
        "Identify performance bottlenecks in NumPy operations",
        "Measure and compare execution times using proper benchmarking techniques",
        "Explain the difference between sequential and parallel computation",
        "Recognize when operations are 'embarrassingly parallel'",
        "Write timing code to measure computational performance",
      ],

      skillProgression: [
        {
          stage: "Foundation (15 min)",
          concept: "Understanding computational performance",
          activity: "Measure Alex's matrix multiplication code",
          socraticPrompt: "What factors do you think determine how fast this runs?",
        },
        {
          stage: "Exploration (20 min)",
          concept: "Sequential vs parallel processing concepts",
          activity: "Visual demonstration - 1 worker vs 1000 workers analogy",
          socraticPrompt: "If we could use 2,048 cores instead of 8, what might happen?",
        },
        {
          stage: "GPU Introduction (15 min)",
          concept: "CPUs vs GPUs - architecture differences",
          activity: "Side-by-side comparison showing GPU potential",
          socraticPrompt: "What do you think makes GPUs different from CPUs?",
        },
      ],

      code: `import numpy as np
import time

# Alex's slow matrix operations
def benchmark_operation(func, *args, **kwargs):
    start = time.perf_counter()
    result = func(*args, **kwargs)
    end = time.perf_counter()
    return result, end - start

# The bottleneck operation
size = 1000
data = np.random.randn(size, size)

result, duration = benchmark_operation(np.dot, data, data.T)
print(f"Matrix multiplication took: {duration:.3f} seconds")

# Challenge: What happens with larger sizes?
sizes = [500, 1000, 2000, 4000]
for size in sizes:
    A = np.random.randn(size, size)
    _, time_taken = benchmark_operation(np.linalg.qr, A)
    print(f"Size {size}: {time_taken:.3f}s")`,

      insight:
        "Understanding how NumPy works internally is crucial before exploring GPU acceleration. What factors do you think determine how fast this computation runs? The answer lies in understanding parallel processing!",

      gpuTeaser: "🚀 GPU Preview: The same operation runs 20x faster with just 'import cupy as np'!",

      stats: {
        cpu_time: "2.1s",
        operations: "1M",
        cores_used: "8",
        gpu_potential: "20x faster",
      },
    },
    // ... (other modules would follow the same pattern)
  }

  const content = moduleContent[currentModule] || moduleContent[1]

  const handlePlaygroundTransition = () => {
    const characterName = content.character.split(",")[0].replace("Meet ", "")
    onAddMessage(
      "ai",
      `Perfect! Let's head to the playground and help ${characterName} solve this performance challenge. I'll guide you through the solution step by step! 🚀`,
    )
    onModeSwitch("playground")
  }

  const handleChatGuidance = () => {
    onAddMessage(
      "ai",
      `I see you're exploring ${content.title}! I'm here to guide you through this learning journey using Socratic questioning. What specific aspect would you like to discover together? Feel free to ask about any concept that seems unclear - I'll help you discover the answers! 🤔`,
    )
  }

  const toggleObjectives = () => {
    setShowLearningObjectives(!showLearningObjectives)
  }

  const toggleObjectiveComplete = (index) => {
    setCompletedObjectives((prev) => ({
      ...prev,
      [`${currentModule}-${index}`]: !prev[`${currentModule}-${index}`],
    }))
  }

  const getProgressForModule = (moduleId) => {
    return Math.min(100, (moduleId / 5) * 100)
  }

  const getCompletedObjectivesCount = () => {
    const moduleObjectives = content.learningObjectives.length
    const completed = content.learningObjectives.filter(
      (_, index) => completedObjectives[`${currentModule}-${index}`],
    ).length
    return { completed, total: moduleObjectives }
  }

  const { completed, total } = getCompletedObjectivesCount()

  return (
    <div
      className="story-mode"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        minHeight: "100vh",
        padding: "2rem",
        color: "#ffffff",
      }}
    >
      <div
        className="story-content"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Module Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
            background: "#333333",
            padding: "2rem",
            borderRadius: "16px",
            border: "2px solid #ff6b35",
          }}
        >
          <div>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "1rem",
              }}
            >
              {content.title}
            </h2>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "0.5rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#ffffff",
                  background: "#ff6b35",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                  fontWeight: "600",
                }}
              >
                Module {currentModule} of 5
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#ff8c42",
                  fontWeight: "600",
                }}
              >
                {getProgressForModule(currentModule)}% Progress
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#ffffff",
                  background: "#444444",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                }}
              >
                {content.duration}
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#1a1a1a",
                  background: "#ff8c42",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                  fontWeight: "600",
                }}
              >
                Prerequisites: {content.prerequisites}
              </span>
            </div>
          </div>
        </div>

        {/* Learning Objectives Panel */}
        <div
          style={{
            background: "#333333",
            border: "2px solid #444444",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h4
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#ffffff",
                fontSize: "1.25rem",
                fontWeight: "700",
              }}
            >
              🎯 Learning Objectives
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#ffffff",
                  background: "#ff6b35",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "1rem",
                  fontWeight: "600",
                }}
              >
                {completed}/{total} completed
              </span>
            </h4>
            <button
              onClick={toggleObjectives}
              style={{
                background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
              }}
            >
              {showLearningObjectives ? "Hide Details" : "Show Details"}
            </button>
          </div>

          {showLearningObjectives && (
            <div>
              <p
                style={{
                  color: "#cccccc",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                By the end of this module, you will be able to:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {content.learningObjectives.map((objective, index) => (
                  <label
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedObjectives[`${currentModule}-${index}`] || false}
                      onChange={() => toggleObjectiveComplete(index)}
                      style={{ marginTop: "0.125rem" }}
                    />
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: completedObjectives[`${currentModule}-${index}`] ? "#ff6b35" : "#ffffff",
                        textDecoration: completedObjectives[`${currentModule}-${index}`] ? "line-through" : "none",
                      }}
                    >
                      {objective}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat Guidance Call-to-Action */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
            color: "white",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🤔</div>
          <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem", fontWeight: "700" }}>Need Guidance? Ask SAGE!</h4>
          <p
            style={{
              margin: "0 0 1rem 0",
              opacity: 0.9,
              fontSize: "1rem",
            }}
          >
            I use Socratic questioning to help you discover concepts naturally. Instead of giving direct answers, I'll
            guide you to insights through thoughtful questions!
          </p>
          <button
            onClick={handleChatGuidance}
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              backdropFilter: "blur(10px)",
            }}
          >
            💬 Start Socratic Discovery Chat
          </button>
        </div>

        {/* Character Introduction */}
        <div
          className="story-scenario"
          style={{
            background: "#333333",
            border: "2px solid #444444",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h3 style={{ color: "#ff6b35", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>
            {content.character}
          </h3>
          <p
            className="scenario-text"
            style={{
              color: "#cccccc",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            {content.scenario}
          </p>
        </div>

        {/* Problem Section */}
        <div
          className="problem-section"
          style={{
            background: "#333333",
            border: "2px solid #ff4500",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h4
            style={{
              color: "#ff4500",
              fontSize: "1.25rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            🎯 The Performance Challenge
          </h4>
          <p style={{ color: "#ffffff", fontSize: "1rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
            {content.problem}
          </p>

          {/* Performance Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            {Object.entries(content.stats).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: "#1a1a1a",
                  border: "2px solid #444444",
                  borderRadius: "12px",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: key.includes("gpu") || key.includes("speedup") ? "#ff6b35" : "#ff4500",
                    marginBottom: "0.25rem",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#cccccc",
                    textTransform: "capitalize",
                    fontWeight: "500",
                  }}
                >
                  {key.replace("_", " ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Section */}
        <div
          className="code-section"
          style={{
            background: "#1a1a1a",
            border: "2px solid #ff6b35",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h4
            style={{
              color: "#ff6b35",
              fontSize: "1.25rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            📝 Code Challenge
          </h4>
          <pre
            className="code-block"
            style={{
              background: "#000000",
              border: "1px solid #333333",
              borderRadius: "8px",
              padding: "1.5rem",
              overflow: "auto",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            }}
          >
            <code style={{ color: "#ffffff" }}>{content.code}</code>
          </pre>
        </div>

        {/* GPU Acceleration Teaser */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
            color: "white",
            borderRadius: "16px",
            padding: "2rem",
            margin: "2rem 0",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚡</div>
          <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem", fontWeight: "700" }}>{content.gpuTeaser}</h4>
        </div>

        {/* Insight Section */}
        <div
          className="insight-section"
          style={{
            background: "#333333",
            border: "2px solid #ff8c42",
            borderRadius: "16px",
            padding: "2rem",
          }}
        >
          <h4
            style={{
              color: "#ff8c42",
              fontSize: "1.25rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            🤔 Discovery Challenge
          </h4>
          <p style={{ color: "#ffffff", fontSize: "1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
            {content.insight}
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handlePlaygroundTransition}
              style={{
                background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
                color: "white",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                boxShadow: "0 4px 8px rgba(255, 107, 53, 0.3)",
              }}
            >
              🚀 Solve in Playground
            </button>

            <button
              onClick={handleChatGuidance}
              style={{
                background: "transparent",
                color: "#ff6b35",
                border: "2px solid #ff6b35",
                padding: "1rem 2rem",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              💬 Get Socratic Guidance
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoryMode
