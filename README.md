
# 🚀 Sage - GPU-Accelerated Data Science Platform

A comprehensive platform for GPU-accelerated data science with AI tutoring, code execution, and real-time collaboration features.

## 🌟 Features

### **Frontend (React)**
- **Monaco Editor Integration**: Full-featured code editor with syntax highlighting
- **Real-time Chat Interface**: AI-powered tutoring and assistance
- **WebSocket Communication**: Live code execution and results
- **Modern UI**: Clean, responsive interface with dark/light themes

### **Backend (Flask + AI)**
- **Secure Code Execution**: Docker-based sandboxed execution environment
- **Advanced AI Tutoring**: LangChain/LangGraph integration with Gemini API
- **RAG System**: Retrieval-augmented generation with course content
- **Web Search Integration**: Real-time information grounding
- **Performance Benchmarking**: CPU vs GPU performance analysis
- **Clean Logging System**: Color-coded, minimalistic logging without emojis

### **AI Capabilities**
- **Multiple AI Agents**: Basic, enhanced, and Gemini-powered tutors
- **Code Analysis**: Review, optimization, explanation, and debugging
- **Learning Suggestions**: Personalized recommendations based on skill level
- **Tool Integration**: RAG retrieval, web search, and code examples

### **Security & Performance**
- **Docker Isolation**: Secure code execution in containers
- **Resource Limits**: Memory and CPU constraints
- **Input Validation**: Comprehensive security filtering
- **Session Management**: Conversation tracking and history

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- Docker (for secure code execution)
- Google API key (for advanced AI features)

### **1. Backend Setup**
```bash
cd backend
pip install -r requirements.txt
python3 setup_env.py  # Interactive setup
python3 run.py        # Start backend
```

### **2. Frontend Setup**
```bash
cd sage
npm install
npm start           # Start frontend
```

### **3. Access the Platform**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- Health Check: http://localhost:5001/health

## 🛠️ Configuration

### **Environment Variables**
```env
# Docker Configuration (enabled by default)
DOCKER_ENABLED=True
DOCKER_MEMORY_LIMIT=512m
DOCKER_CPU_LIMIT=0.5

# Google API Configuration
GOOGLE_API_KEY=your-api-key-here
GEMINI_MODEL=gemini-2.5-flash

# Logging Configuration
LOG_LEVEL=INFO
ENABLE_COLOR_LOGS=True

# AI Features
ENABLE_RAG=True
ENABLE_WEB_SEARCH=True
```

### **Docker Options**
- **Enabled (Recommended)**: Secure, isolated execution
- **Disabled**: Local execution (development only)
- **GPU Support**: NVIDIA Docker for GPU acceleration


### 🎓 Educational
- **GPU Programming Courses**: Learn CUDA, OpenCL, and compute shaders
- **Deep Learning**: PyTorch, TensorFlow GPU optimization
- **High-Performance Computing**: Parallel algorithms and optimization
- **Data Science**: GPU-accelerated analytics and visualization

### 🔬 Research & Development
- **Algorithm Prototyping**: Quick testing of GPU implementations
- **Performance Analysis**: Benchmarking and optimization research
- **AI-Assisted Development**: Code review and optimization suggestions

### 👥 Collaborative Learning
- **Real-time Assistance**: Live AI tutoring during coding sessions
- **Code Review**: AI-powered feedback and improvement suggestions
- **Knowledge Sharing**: Built-in course content and examples

## 🤖 AI Tutor Capabilities

### 🧠 Core Features
- **CUDA Programming**: Memory management, kernel optimization, performance tuning
- **Deep Learning Frameworks**: PyTorch, TensorFlow, JAX GPU acceleration
- **Performance Analysis**: Bottleneck identification and optimization strategies
- **Hardware Recommendations**: GPU selection and configuration advice

### 🔧 Tools & Integration
- **Course Content RAG**: Searchable knowledge base of GPU programming materials
- **Web Search**: Real-time information about latest GPU technologies
- **Code Analysis**: Context-aware code review and optimization
- **Tutorial Discovery**: Finding relevant learning resources and documentation


```

## 🔧 Configuration

### Backend Environment (.env)
```bash
# Flask Configuration
FLASK_ENV=development
SECRET_KEY=your-secret-key

# Google Gemini API
GOOGLE_API_KEY=your-google-api-key
GEMINI_MODEL=gemini-2.5-flash

# AI Features
ENABLE_RAG=True
ENABLE_WEB_SEARCH=True
ENABLE_STREAMING=True

# Docker Configuration
DOCKER_ENABLED=True
DOCKER_MEMORY_LIMIT=512m

# Security
EXECUTION_TIMEOUT=30
MAX_OUTPUT_SIZE=1048576
```

### Frontend Environment (.env)
```bash
REACT_APP_BACKEND_URL=http://localhost:5001
REACT_APP_WEBSOCKET_URL=http://localhost:5001
REACT_APP_ENV=development
```

## 🧪 Example Usage

### 1. Basic GPU Programming

```python
import numpy as np
import time

def cpu_matrix_multiply(A, B):
    start = time.time()
    C = np.matmul(A, B)
    return C, time.time() - start

# Create test matrices
A = np.random.random((2000, 2000))
B = np.random.random((2000, 2000))

# CPU computation
result, cpu_time = cpu_matrix_multiply(A, B)
print(f"CPU time: {cpu_time:.3f}s")

# Ask AI: "How can I accelerate this with GPU?"
```

### 2. AI-Assisted Learning

1. **Write code** in the Monaco Editor
2. **Click "🤖 Ask AI"** to get instant feedback
3. **Ask follow-up questions** like:
   - "Optimize this for better GPU utilization"
   - "What CUDA memory pattern should I use?"
   - "Compare different GPU libraries for this task"

### 3. Performance Benchmarking

```python
# GPU vs CPU comparison
import cupy as cp  # GPU arrays
import numpy as np # CPU arrays

size = 5000

# GPU benchmark will automatically compare:
# - Memory transfer overhead
# - Computation speedup  
# - Total execution time
# - Resource utilization
```

## 🐛 Troubleshooting

### Common Issues

1. **Docker not found**
   ```bash
   # Install Docker or disable Docker execution
   export DOCKER_ENABLED=False
   ```

2. **Google API Key issues**
   ```bash
   # Verify API key is set
   echo $GOOGLE_API_KEY
   # Enable Gemini API in Google Cloud Console
   ```

3. **WebSocket connection failed**
   ```bash
   # Check backend is running
   curl http://localhost:5001/health
   # Check CORS settings
   ```

4. **Monaco Editor not loading**
   ```bash
   # Clear browser cache
   # Check for JavaScript errors in console
   npm install @monaco-editor/react
   ```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup

```bash
# Backend development
cd backend
pip install -r requirements.txt
python -m pytest  # Run tests

# Frontend development  
cd sage
npm install
npm test         # Run tests
npm run lint     # Check code style
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


**🚀 Built with ❤️ for GPU-accelerated data science education**

*Ready to accelerate your data science journey? Start coding with Sage today!*
