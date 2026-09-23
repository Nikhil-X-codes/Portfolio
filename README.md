# 🚀 Nikhil's Developer Portfolio

A production-grade, performance-optimized personal portfolio built with **React 19** and **Vite**, featuring a WebGL fluid cursor, GPU-accelerated animations, lazy-loaded heavy components, and a 3D interactive project deck.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Featured Projects](#-featured-projects)
- [Component Architecture](#-component-architecture)
- [Performance Optimizations](#-performance-optimizations)
- [Getting Started](#-getting-started)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite (rolldown-vite 7) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| 3D / WebGL | Three.js (fluid cursor) |
| Font | @fontsource/inter (self-hosted, no Google Fonts) |
| Email | EmailJS Browser |
| Linting | ESLint + unused-imports plugin |
| Dead code | Knip |

---

## 📁 Project Structure

```
my-project/
├── public/                          # Static assets
├── src/
│   ├── components/
│   │   ├── ui/                      # Reusable primitives
│   │   │   ├── ProjectCard.jsx           # Left carousel card (memo'd)
│   │   │   ├── BorderBeam.jsx            # Animated border effect
│   │   │   ├── DecryptedText.jsx         # Scramble reveal text
│   │   │   ├── ParticlesBackground.jsx   # Canvas particle field (lazy)
│   │   │   └── ScrollProgressBar.jsx
│   │   ├── Home.jsx            # Hero / landing section
│   │   ├── Projects.jsx        # Dual-panel project showcase
│   │   ├── Skills.jsx          # Tech stack display
│   │   ├── Achievements.jsx    # Awards & milestones
│   │   ├── Experience.jsx      # Work experience timeline
│   │   ├── ContactUs.jsx       # EmailJS contact form
│   │   ├── Navbar.jsx          # Floating glass dock navbar
│   │   ├── IntroSplash.jsx     # Entry curtain animation
│   │   └── SplashCursor.jsx    # WebGL fluid cursor (lazy)
│   ├── App.jsx                 # Root — layout, observers, lazy loading
│   └── main.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🗂 Featured Projects

### 🌐 Web

| Project | Description | Tech Stack |
|---------|-------------|------------|
| **Vidcast** | Full-stack video streaming platform with upload, search, likes, comments, subscriptions and playlist management | React · Node.js · MongoDB · Tailwind |
| **BusEase** | Bus ticket booking with virtual credit cards, interactive seat selection and full booking history | React · Tailwind · MongoDB · Express |

### 🤖 AI

| Project | Description | Tech Stack |
|---------|-------------|------------|
| **AI Blog Generation** | AI-powered blogging platform generating complete posts with images, tone control, live editing and export | React · HuggingFace · Tailwind |
| **Multi-Agent CLI Orchestration** | Production-grade multi-agent AI system with 6 specialized agents (Planner, Researcher, Architect, Coder, Reviewer, Debugger) orchestrated via `ThreadPoolExecutor`. Features RAG pipeline (ChromaDB + Sentence Transformers + Tree-sitter), LLM guardrail scanning on unified diffs, bounded self-correction loops with confidence gating, SQLite observability layer with Click CLI, and multi-tier LLM fallback chain (Groq → OpenRouter → llama.cpp) | Python · ChromaDB · Groq |
| **Neutrosophic Traffic Management** | AI-powered traffic management using Neutrosophic Logic and YOLO to analyze vehicle density, detect obstacles, and automate signal decisions | Python · YOLO · OpenCV · Neutrosophic Logic |
| **Iris Recognition System** | Deep learning biometric auth using EfficientNetV2-S for high-accuracy iris recognition and real-time verification | Python · PyTorch · OpenCV |
| **Medzee.ai** | AI healthcare assistant analyzing medical reports and prescriptions via OCR, LLMs, and RAG; features health analytics dashboard, voice-enabled AI chat, and personalized medical insights | Next.js · FastAPI · PostgreSQL · Prisma · LangChain · RAG · Docker |

### 📊 Data Analytics

| Project | Description | Tech Stack |
|---------|-------------|------------|
| **WhatsApp Chat Analysis** | Chat analytics platform with message insights, activity trends, word frequency, emoji analysis, and participant statistics via interactive visualizations | Python · Streamlit · ML Library |

### 🔐 Cybersecurity

| Project | Description | Tech Stack |
|---------|-------------|------------|
| **LSTEM IoT Attack Detection** | Trust-aware IoT attack detection framework combining behavioral trust scoring with ML to improve malicious traffic classification in resource-constrained networks | Python · Machine Learning · IoT · Scikit-learn |

---

## 🧩 Component Architecture

### `App.jsx` — Root Shell
- Manages global splash state and scroll lock
- Single `IntersectionObserver` for all `.scroll-animate` elements (staggered reveals by sibling index)
- Throttled `requestAnimationFrame` scroll handler writing `--scroll-y` CSS variable
- Owns `<Suspense>` boundaries for lazy-loaded heavy components

---

### `Projects.jsx` — Dual-Panel Showcase

Two panels in a responsive grid (`lg:grid-cols-2`):

**Left Panel — Infinite Vertical Carousel**
- `requestAnimationFrame` scroll loop at `0.6px/frame` (~60fps)
- Seamless infinite loop via DOM duplication (renders projects × 2)
- Scroll event propagation stopped to prevent page-scroll hijacking
- Fade-out masks at top/bottom via `pointer-events-none` gradient overlays

**Right Panel — 3D Fanned Deck**
- `setInterval` auto-rotates active card every 4 seconds
- Per-card `getFanTransform()` computes `rotateZ / x / y / scale / opacity / zIndex`
- Mouse-tracking 3D tilt on front card via `rotateX` / `rotateY` (±8°)
- Cursor-following radial glow + border spotlight via `WebkitMask` composite

---

### `SpotlightCard` — Interactive 3D Card
- Tracks `mousemove` for real-time 3D tilt using `getBoundingClientRect`
- Cursor-following `radial-gradient` background glow
- Border spotlight via `WebkitMask` + `radial-gradient` masking
- Wrapped in `memo()` — skips re-render when not the active card

---

### `ProjectCard` — Left Carousel Item
- Hover-triggered pan-up effect via CSS `translateY` (transform only, no layout shift)
- `BorderBeam` animated border on hover
- Wrapped in `memo()` — 18 instances in DOM (9 × 2 for loop), prevents mass re-renders on every carousel tick

---

### `Experience.jsx` — Career Timeline
- Vertical orange timeline line with animated `animate-ping` node
- `BorderBeam` animated card border
- `DecryptedText` scramble-reveal heading
- Status badges: `Ongoing` (emerald + pulse dot) · `Completed` (orange)
- Entries: **StackX** (Full Stack Intern) · **McKinsey Forward Program** (Current)

---

### `Navbar.jsx` — Floating Glass Dock
- Hides on scroll-down (delta > 4px), shows on scroll-up
- Framer Motion spring animations: `whileHover` scale + lift, `whileTap` press
- Nav: Home · Projects · Tech Stack · Achievements · Experience · Contact
- Social: GitHub · LinkedIn · Codolio (custom SVG icon)

---

## ⚡ Performance Optimizations

### 1. `React.memo` — Eliminate Wasted Re-renders

**Files:** `Projects.jsx`, `ui/ProjectCard.jsx`

```jsx
// Projects.jsx
const SpotlightCard = memo(function SpotlightCard({ ... }) { ... });

// ui/ProjectCard.jsx
const ProjectCard = memo(function ProjectCard({ project }) { ... });
export default ProjectCard;
```

**Problem solved:** `activeDeckIndex` state changes every 4 seconds (auto-rotate interval), triggering a re-render of the `Projects` parent. Without `memo`, all 9 `SpotlightCard` instances and all 18 `ProjectCard` instances (9 × 2 for infinite loop) re-render every tick.

**Result:** Only the card whose props actually changed re-renders. 8 of 9 deck cards and all 18 carousel cards skip entirely.

---

### 2. `useCallback` — Stable Function References for Memoized Children

**File:** `Projects.jsx`

```jsx
const handleDeckClick = useCallback((idx) => {
  setActiveDeckIndex(idx);
}, []);

const getVisualOffset = useCallback((idx) => {
  let diff = idx - activeDeckIndex;
  if (diff < 0) diff += projects.length;
  return diff;
}, [activeDeckIndex, projects.length]);

const getFanTransform = useCallback((visualOffset) => {
  // ... lookup table returning transform values
}, [projects.length]);

const isGithubLink = useCallback((url) => url?.includes('github.com'), []);
```

**Problem solved:** Without `useCallback`, every parent re-render creates a new function reference. New references break `React.memo` on children — memo compares props by reference, so a new function = forced re-render even if the logic is identical.

**Result:** `memo` + `useCallback` work together. Functions are recreated only when their actual dependencies change.

---

### 3. `React.lazy` + `Suspense` — Deferred Bundle Chunks

**File:** `App.jsx`

```jsx
import { lazy, Suspense } from 'react';

// Deferred — not in the initial JS bundle
const SplashCursor        = lazy(() => import('./components/SplashCursor'));
const ParticlesBackground = lazy(() => import('./components/ui/ParticlesBackground.jsx'));

// Wrapped with Suspense in JSX
<Suspense fallback={null}>
  <ParticlesBackground />
</Suspense>

<Suspense fallback={null}>
  <SplashCursor SIM_RESOLUTION={128} DYE_RESOLUTION={512} COLOR="#EF4444" RAINBOW_MODE={true} />
</Suspense>
```

**Problem solved:** `SplashCursor` bundles Three.js WebGL shaders (~35KB). `ParticlesBackground` runs a canvas animation loop. Neither is needed for first paint — they were blocking the initial bundle.

**Result:** Browser loads hero + navbar immediately, then fetches the heavy chunks asynchronously. First-paint and time-to-interactive both improve.

---

### 4. `useMemo` — Stable Data Array Reference

**File:** `Projects.jsx`

```jsx
const projects = useMemo(() => [
  { id: 1, title: 'Vidcast', ... },
  // ... 8 more projects
], []);
```

**Problem solved:** The projects array is a dependency of three `useEffect` hooks (carousel RAF loop, deck auto-rotation interval, scroll propagation prevention). Without `useMemo`, a new array reference on every render would re-fire all three effects, restarting intervals and animation frames.

**Result:** Array computed once on mount, three effects fire once on mount, and cleanly tear down on unmount only.

---

### 5. `requestAnimationFrame` Loop — Zero React Re-renders for Animation

**File:** `Projects.jsx` (left panel carousel)

```jsx
useEffect(() => {
  const carousel = carouselLeftRef.current;
  let rafId;
  const scrollStep = 0.6; // px per frame at ~60fps

  const tick = () => {
    if (carousel.scrollTop + carousel.clientHeight >= carousel.scrollHeight - 10) {
      carousel.scrollTop = 0;       // Reset for infinite loop
    } else {
      carousel.scrollTop += scrollStep;  // Direct DOM mutation
    }
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);  // Cleanup prevents memory leak
}, [projects]);
```

**Problem solved:** Animating via React state (`setState` on every frame) would re-render the entire component tree 60 times per second.

**Result:** Direct `scrollTop` DOM mutation bypasses React and the VDOM entirely. Zero re-renders, zero diffing overhead — pure 60fps animation.

---

### 6. GPU-Accelerated Animations Only

**File:** `Projects.jsx` — Framer Motion `animate` props

```jsx
// ✅ GPU composited — no layout recalculation
animate={{
  rotateZ: fan.rotateZ,
  x: fan.x,
  y: fan.y,
  scale: fan.scale,
  opacity: fan.opacity,
}}

// ❌ Avoided — triggers layout on every frame
animate={{ top: ..., left: ..., width: ..., marginLeft: ... }}
```

**Why it matters:** CSS properties like `top`, `left`, `width`, and `margin` force the browser to recalculate layout on every animation frame → jank. `transform` (rotateZ, x, y, scale) and `opacity` are composited directly on the GPU — the layout engine is never involved.

**Result:** Smooth 60fps card animations even on mid-range hardware, with no layout thrashing.

---

### 7. Throttled Scroll Handler via `requestAnimationFrame`

**File:** `App.jsx`

```jsx
useEffect(() => {
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll-y', String(window.scrollY));
        ticking = false;
      });
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

**Problem solved:** `scroll` fires 60–100+ times per second during fast scrolling. Without throttling, every event triggers a style write.

**Result:** `ticking` flag coalesces multiple scroll events into one DOM write per animation frame. `{ passive: true }` lets the browser optimize scroll on mobile (no `preventDefault` possible → hardware scroll acceleration enabled).

---

### 8. Font Self-Hosting — Eliminate Render-Blocking External Request

**Files:** `main.jsx`, `index.css`

```js
// main.jsx — self-hosted via @fontsource/inter (bundled into dist/)
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
```

```css
/* index.css — REMOVED the old render-blocking request */
/* ❌ Before: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); */
/* ✅ After: fonts are self-hosted, no external DNS hit */
```

**Problem solved:** A Google Fonts `@import url(...)` in CSS is **render-blocking** — the browser must resolve an external DNS, open a connection, and download the stylesheet before it can continue parsing. This adds ~100–300ms to first paint on cold loads.

**Result:** Inter font files are bundled directly into `dist/assets/` and served from your own CDN alongside the rest of the site. Zero external font requests, zero render-blocking.

---

### 9. Manual Chunk Splitting — Vendor Cache Isolation

**File:** `vite.config.js`

```js
build: {
  rollupOptions: {
    output: {
      // rolldown-vite requires function syntax (not object)
      manualChunks(id) {
        if (id.includes('node_modules/three'))          return 'vendor-three';
        if (id.includes('node_modules/framer-motion'))  return 'vendor-framer';
        if (id.includes('node_modules/react-dom'))      return 'vendor-react';
        if (id.includes('node_modules/react'))          return 'vendor-react';
      },
    },
  },
  chunkSizeWarningLimit: 500,
},
```

**Problem solved:** Without splitting, Vite may co-bundle vendor code with app code into one large file. When you push a code update, the entire bundle (including unchanged Three.js, Framer Motion, React) gets a new hash → users re-download everything, even if those libraries didn't change.

**Verified build output (`npm run build`):**

| Chunk | Raw | Gzip | Notes |
|---|---|---|---|
| `vendor-three` | 535 KB | **133 KB** | Three.js — cached separately |
| `vendor-react` | 218 KB | **73 KB** | React + ReactDOM — almost never changes |
| `vendor-framer` | 141 KB | **47 KB** | Framer Motion — cached separately |
| `index` (app code) | 76 KB | **23 KB** | Only this re-downloads on code push |
| `SplashCursor` | 21 KB | 6 KB | Async chunk (lazy loaded) |
| `ParticlesBackground` | 3 KB | 1 KB | Async chunk (lazy loaded) |
| CSS | 85 KB | **15 KB** | Tailwind purged |

**Result:** Repeat visitors re-download only the `index` chunk (23 KB gzip) when app code changes — vendor chunks stay cached.

---

### 10. Bundle Visualizer — Measure, Don't Guess

**File:** `vite.config.js`

```js
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  react(),
  tailwindcss(),
  visualizer({
    filename: 'dist/stats.html',
    open: false,
    gzipSize: true,
    brotliSize: true,
  }),
],
```

**Usage:** Run `npm run build` → open `dist/stats.html` in a browser → interactive treemap showing exact size of every module (raw, gzip, brotli). Use it to find unexpected heavy dependencies before they reach production.

---

### 📊 Optimization Summary

| # | Optimization | File(s) | What It Prevents |
|---|---|---|---|
| 1 | `React.memo` on `SpotlightCard` | `Projects.jsx` | 8/9 deck cards re-rendering every 4s |
| 2 | `React.memo` on `ProjectCard` | `ui/ProjectCard.jsx` | 18 carousel cards re-rendering on scroll |
| 3 | `useCallback` on 4 handlers | `Projects.jsx` | Broken memo due to unstable function refs |
| 4 | `useMemo` on projects array | `Projects.jsx` | 3 effects restarting on every render |
| 5 | `React.lazy` + `Suspense` | `App.jsx` | SplashCursor + Particles blocking first paint |
| 6 | `rAF` loop (no setState) | `Projects.jsx` | 60fps carousel triggering VDOM re-renders |
| 7 | Transform/opacity only | `Projects.jsx` | Layout recalculation on animated cards |
| 8 | Throttled scroll via `rAF` | `App.jsx` | 100+ DOM writes/sec during scroll |
| 9 | Font self-hosting (`@fontsource`) | `main.jsx`, `index.css` | Render-blocking Google Fonts external request |
| 10 | Manual chunk splitting | `vite.config.js` | Full re-download on every code push |
| 11 | Bundle visualizer | `vite.config.js` | Blind deployment without size awareness |

---

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

> **Node version:** 18+ recommended
> Configure EmailJS credentials in `.env`:
> ```
> VITE_EMAILJS_SERVICE_ID=your_service_id
> VITE_EMAILJS_TEMPLATE_ID=your_template_id
> VITE_EMAILJS_PUBLIC_KEY=your_public_key
> ```

---

## 📄 License

MIT — free to fork and adapt for your own portfolio.
