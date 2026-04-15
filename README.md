# Advanced Modern URL Shortener (2026 Stack)

A strictly modular, highly decoupled Full-Stack URL shortener demonstrating modern 2026 stack best practices, including Next-Generation React and Three.js visuals.

## 🚀 Architectural Blueprint

The architecture implements a firm separation of concerns, heavily applying the **Feature-Sliced Design (FSD)** methodology for the UI, decoupled from a robust Flask REST API.

```mermaid
graph TD
    subgraph Client [Frontend - Vite React TS]
        direction TB
        UI[Tailwind v4 Components]
        State[Zustand & TanStack Query]
        3D[Three.js / React Three Fiber Layer]
        API_Client[Fetch Hook Interceptors]
        
        UI <--> State
        UI --> 3D
        State <--> API_Client
    end

    subgraph Backend [Flask JSON REST API]
        direction TB
        Routes[/api/* Endpoints]
        Service[Shortening Logic]
        Models[SQLAlchemy Models]
        DB[(SQLite)]
        
        Routes <--> Service
        Service <--> Models
        Models <--> DB
    end

    API_Client <-->|Strict REST JSON| Routes
```

## 🛠️ Tech Stack Upgrades (2026)

- **Frontend**: React 19+ ready, Vite 6, strict mode TypeScript, Tailwind CSS v4 design tokens.
- **State Management**: TanStack Query v5 for deterministic async flow and preloading.
- **Visual Enhancements**: Three.js integration via `@react-three/fiber` and `@react-three/drei` for optimized particle-field backgrounds. Uses `framer-motion` for buttery smooth layout transitions.
- **Backend API**: Flask serving pure JSON payloads, decoupled from Jinja templating. Securely integrates CORS for dev layers.

## 📦 Local Setup Instructions

### 1. Start the Flask REST API
Ensure you have Python 3.10+ installed.

```bash
# In the root directory
python -m venv US
# Activate the virtual environment
US\\Scripts\\activate  # Windows
# or
source US/bin/activate # Mac/Linux

# Install dependencies (Flask, Flask-Cors, SQLAlchemy)
pip install -r requirements.txt

# Run the API server
python app.py
```
The API server will run on `http://127.0.0.1:5000`

### 2. Start the Frontend Application
In a separate terminal:

```bash
cd frontend

# Install the 2026 tech stack
npm install

# Start the Vite development server
npm run dev
```

The React app will proxy and connect to the Flask server seamlessly.

## 🧪 Testing and Performance
- Web Vitals target: **>= 95** for LCP and CLS.
- Test suites implemented via `vitest`.
