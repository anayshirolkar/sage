// App.js - Main SAGE Application
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StoryMode from './components/StoryMode';
import PlaygroundMode from './components/PlaygroundMode';
import ChatSidebar from './components/ChatSidebar';
import './styles/App.css';

function App() {
  // Global state management
  const [currentMode, setCurrentMode] = useState('story'); // 'story' or 'playground'
  const [currentModule, setCurrentModule] = useState(1);
  const [progress, setProgress] = useState(20); // Progress percentage

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      message: "Hello! I'm SAGE, your AI tutor. I notice you're looking at some slow NumPy code. What do you think might be causing the performance bottleneck? 🤔",
      timestamp: new Date()
    }
  ]);

  // Benchmark state
  const [benchmarkResults, setBenchmarkResults] = useState({
    cpuTime: null,
    gpuTime: null,
    speedup: null
  });

  // Mode switching function
  const switchMode = (mode) => {
    setCurrentMode(mode);
    
    // Add appropriate chat message when switching modes
    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'ai',
      message: mode === 'story' 
        ? "I'm back in story mode! Ready to guide you through the learning journey. What questions do you have about GPU acceleration? 📚"
        : "Now I'm in playground mode! I can help convert your NumPy code to GPU-accelerated CuPy. Share your code and let's make it faster! ⚡",
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
  };

  // Module selection function
  const selectModule = (moduleNum) => {
    setCurrentModule(moduleNum);
    setProgress((moduleNum / 5) * 100);
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'ai',
      message: `Great! You've selected Module ${moduleNum}. What would you like to explore about this topic?`,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
  };

  // Add new chat message
  const addChatMessage = (sender, message) => {
    const newMessage = {
      id: chatMessages.length + 1,
      sender: sender,
      message: message,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
  };

  // Update benchmark results
  const updateBenchmarkResults = (results) => {
    setBenchmarkResults(results);
  };

  return (
    <div className="sage-app">
      <Header 
        currentMode={currentMode} 
        onModeSwitch={switchMode} 
      />
      
      <div className="sage-platform">
        <Sidebar 
          currentModule={currentModule}
          progress={progress}
          onModuleSelect={selectModule}
        />
        
        <main className="main-content">
          {currentMode === 'story' ? (
            <StoryMode 
              currentModule={currentModule}
              onModeSwitch={switchMode}
              onAddMessage={addChatMessage}
            />
          ) : (
            <PlaygroundMode 
              benchmarkResults={benchmarkResults}
              onUpdateBenchmark={updateBenchmarkResults}
              onAddMessage={addChatMessage}
            />
          )}
        </main>
        
        <ChatSidebar 
          currentMode={currentMode}
          chatMessages={chatMessages}
          onAddMessage={addChatMessage}
        />
      </div>
    </div>
  );
}

export default App;