# StayFinder - Finland Stays (Windbnb Challenge Clone)

A modern, responsive, and dynamic property search and filtering web application built with **Vanilla JavaScript** and styled using **Tailwind CSS**. This project demonstrates advanced DOM manipulation, dynamic filtering systems, and mobile-first responsive layout shifts without relying on heavy framework architectures.

---

## 🚀 Live Demo & Preview
*(Add your live project link or deployment URL here, e.g., GitHub Pages/Vercel)*

---

## ✨ Features & Technical Highlights

* **Dynamic Dual-Criteria Filtering Engine:** Real-time synchronized sorting that handles simultaneous requests for geographic location and total guest capacity (segregated into separate calculators for adults and children).
* **High-Performance Unique Value Extraction:** Leverages modern JavaScript features `Array.prototype.map()`, `new Set()`, and the `...` (spread operator) to map out available cities dynamically from a local database file, efficiently dropping duplicates on the fly.
* **Adaptive Structural Component Relocation:** Implements a responsive layout controller using JavaScript's native `window.matchMedia()` API. It automatically moves the "Search" CTA button from the mobile modal container into the main screen navigation bar on desktop dimensions, preventing DOM element duplication and maintaining clean markup.
* **Dynamic DOM Card Generation:** Implements zero-dependency HTML compilation using `document.createElement` loops to parse local database lists, evaluate data attributes (such as `superHost` status), and dynamically render performance-optimized property listings.
* **Robust Event Delegation:** Handles aggregate button logic (`+` / `-` incremental calculators) via unified event listeners, reducing memory leaks and improving input processing efficiency.

---

## 🛠️ Tech Stack & Architecture

* **Logic Core:** Vanilla JavaScript (ES6+ Modules)
* **Styling Engine:** Tailwind CSS
* **Build Tool & Assets Bundler:** Vite (using JS asset imports for optimized SVG handling)
* **Markup Structure:** Semantic HTML5 (Mobile-First approach)

---

## 📁 Key File Structure Breakdown

### 1. `main.js`
Acts as the central entry point of the frontend app. It handles CSS imports and manages the sequence execution of foundational routines:

### 2. utils.js
The heavy-lifter utility module. Contains helper functions, internal global counters (with capped capacity limits up to 10 guests maximum via safety validation alerts), and filtering functions (filtrarDinamicamente()) that change text content configurations natively on state alterations.

### 3. index.html
Semantic baseline layout designed with extensive utility classes. Features an overlays modal navigation window that acts as a dropdown selection layout for responsive user profiles.

## 💡 Key Learning Experiences
Understanding JS Native Modules: Successfully isolated domain logic into decoupled ECMAScript modules (main.js and utils.js) for sustainable development workflows.

Handling Media Queries via JS: Mastered layouts adjustments dynamically using programmatic listeners (MediaQueryList.addEventListener('change')) instead of relying completely on CSS breakpoints for component repositioning.

UI/UX States Integration: Implemented intuitive fallback feedback conditions for users—such as modifying layout indicators to show "Please adjust filters" when no property matches criteria.