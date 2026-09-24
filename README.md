# Sudipto Satpati — Personal Developer Portfolio & Open-Source Platform

> A dark-themed, terminal and developer-tool styled personal portfolio showcasing production engineering systems, flagship architectural case studies, and open-source packages with live usage telemetry.

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three-dot-js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

---

## 🌟 Overview

This platform is engineered to serve two audiences simultaneously:
1. **Recruiters & Engineering Managers:** Communicates technical depth through detailed architectural case studies (problem $\rightarrow$ approach $\rightarrow$ outcome) and production telemetry.
2. **Open-Source Community:** Showcases npm packages, CLI utilities, and Chrome extensions with real-time download and star metrics pulled directly via API proxies.

---

## ✨ Key Features

### 💻 Public Showcase
- **Obsidian Terminal Design System:** Modern dev-tool UI featuring `$ command` prompt labels, 3-dot window chrome, luminescent accent glows, and subtle dot-grid textures.
- **3D Particle Constellation Hero:** Interactive Three.js particle constellation rendered via React Three Fiber, dynamically adjusting for performance and reduced motion.
- **Typewriter Tagline:** GSAP animated typewriter tagline with an infinitely blinking cursor block.
- **Flagship Case Studies:** In-depth technical breakdowns for **SCIDMS** (Enterprise Logistics), **DocSync** (Real-time Collaboration), and **Prepify.AI** (AI Mock Interview Engine).
- **Live-Telemetry OSS Shelf:** Cards for npm packages (`import-cleaner`, `env-guard-v2`), CLI tools (`api-tester-cli`), and Chrome extensions displaying live npm download numbers and GitHub stars.
- **Commit-Log Experience Timeline:** Vertical timeline for Systems Engineering at TCS and Junior Software Developer at Aponiar Solution.

### 🛡️ Owner Admin Panel (`/admin`)
- **Protected Auth Console:** Firebase Auth protected admin panel to publish, edit, or reorder projects and tools without redeploying code.
- **Project Editor:** Rich form with chip-based tech stack input, problem/approach/outcome fields, and image upload dropzone.
- **Global Site Config:** Update headline stats, social links, bio, and resume PDF dynamically.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, TypeScript) |
| **Styling** | Tailwind CSS + Obsidian Terminal Tokens |
| **3D & Animation** | React Three Fiber + `@react-three/drei`, GSAP + ScrollTrigger |
| **Icons & UI** | Lucide React, Shadcn/ui principles |
| **Database & Auth** | Firebase Firestore, Firebase Auth, Firebase Storage |
| **Stat Telemetry** | Server-side API proxies (`npm registry API` & `GitHub REST API`) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.x` or `v20.x`
- npm `v9.x` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sudipto-satpati-dev/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional for local development):**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
   *(Note: The application includes zero-crash safe mock fallbacks if Firebase credentials are not provided.)*

4. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Project Structure

```
/app
  /(public)
    page.tsx                 # Homepage (Hero, Flagship Projects, OSS, Experience, Skills, Contact)
    projects/[slug]/page.tsx # Case study detail view
  /admin
    login/page.tsx           # Admin authentication
    page.tsx                 # CMS Dashboard
    projects/[id]/page.tsx   # Project CRUD editor
    tools/[id]/page.tsx      # OSS Tool CRUD editor
    experience/[id]/page.tsx # Experience CRUD editor
    settings/page.tsx        # Global config editor
  /api
    stats/npm/[pkg]/route.ts # Cached npm stats API proxy
    stats/github/[repo]/route.ts # Cached GitHub stars API proxy
/components
  /hero                      # HeroSection, TypewriterTagline, HeroStats
  /projects                  # ProjectCard, ProjectGrid
  /oss                       # OssShelf, OssToolCard, LiveStatBadge
  /experience                # Timeline, TimelineItem
  /skills                    # SkillsSection
  /three                     # HeroCanvas, ConstellationField
  /ui                        # TerminalWindow, PromptLabel, Badge, Navbar, Footer
  /admin                     # AdminSidebar
/lib
  firebase.ts, gsap.ts, mockData.ts
```

---

## 📄 License & Author

**Author:** Sudipto Satpati  
**Email:** [sudiptosatpatiofficial@gmail.com](mailto:sudiptosatpatiofficial@gmail.com)  
**LinkedIn:** [linkedin.com/in/sudiptosatpati](https://www.linkedin.com/in/sudiptosatpati)  
**GitHub:** [github.com/SudiptoSatpati](https://github.com/SudiptoSatpati)
