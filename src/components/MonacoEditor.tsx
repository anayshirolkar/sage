"use client"

// components/MonacoEditor.js - Monaco Code Editor Wrapper
import { useEffect, useRef } from "react"

const MonacoEditor = ({ code, onChange, language = "python" }) => {
  const editorRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Load Monaco Editor
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs/loader.min.js"
    script.onload = () => {
      (window as any).require.config({
        paths: {
          vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs",
        },
      })

      (window as any).require(["vs/editor/editor.main"], () => {
        if (containerRef.current && !editorRef.current) {
          // Define custom dark orange theme
          (window as any).monaco.editor.defineTheme("dark-orange", {
            base: "vs-dark",
            inherit: true,
            rules: [
              { token: "comment", foreground: "#888888", fontStyle: "italic" },
              { token: "keyword", foreground: "#ff6b35", fontStyle: "bold" },
              { token: "string", foreground: "#ff8c42" },
              { token: "number", foreground: "#ffab73" },
              { token: "identifier", foreground: "#ffffff" },
              { token: "operator", foreground: "#ff6b35" },
              { token: "delimiter", foreground: "#cccccc" },
            ],
            colors: {
              "editor.background": "#1a1a1a",
              "editor.foreground": "#ffffff",
              "editor.lineHighlightBackground": "#2d2d2d",
              "editor.selectionBackground": "#ff6b3540",
              "editor.selectionHighlightBackground": "#ff6b3520",
              "editorCursor.foreground": "#ff6b35",
              "editorLineNumber.foreground": "#666666",
              "editorLineNumber.activeForeground": "#ff6b35",
              "editor.findMatchBackground": "#ff6b3540",
              "editor.findMatchHighlightBackground": "#ff6b3520",
              "scrollbarSlider.background": "#444444",
              "scrollbarSlider.hoverBackground": "#555555",
              "scrollbarSlider.activeBackground": "#ff6b35",
            },
          })

          editorRef.current = (window as any).monaco.editor.create(containerRef.current, {
            value: code,
            language: language,
            theme: "dark-orange",
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            renderWhitespace: "selection",
            bracketPairColorization: { enabled: true },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: true,
            smoothScrolling: true,
            fontLigatures: true,
            lineNumbers: "on",
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: "all",
          })

          // Listen for content changes
          editorRef.current.onDidChangeModelContent(() => {
            const currentValue = editorRef.current.getValue()
            if (onChange) {
              onChange(currentValue)
            }
          })
        }
      })
    }

    document.head.appendChild(script)

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose()
        editorRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (editorRef.current && code !== editorRef.current.getValue()) {
      editorRef.current.setValue(code)
    }
  }, [code])

  return (
    <div
      ref={containerRef}
      className="monaco-editor-container"
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid #333333",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  )
}

export default MonacoEditor
