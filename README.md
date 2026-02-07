# 🌦️ Weather Information Dashboard

A modern, resilient, and accessibility-first **Weather Web Application** built with **React**.
The app provides real-time, search-based, and manually configured weather information with rich visual effects, offline support, and production-grade system design.

---

## 🚀 Key Highlights

- 🔍 **Search-based weather** (city name with autocomplete & typo handling)
- 🏠 **Manual location support** (privacy-friendly alternative to GPS)
- 📍 Optional **location-based weather**
- 🌧️ **Dynamic weather effects** (Rain, Snow, Fog, Wind, Thunder, Heat)
- 🎨 **Animated gradient backgrounds** (design-token driven)
- 📴 **Offline mode** with cached weather
- ♿ **Accessibility-first** (keyboard, ARIA, reduced-motion)
- ⚡ **Performance-aware** (low-end device optimizations)
- 🧪 **Unit-tested core logic**
- 🧱 **Scalable, MVC-style architecture**

---

## 🧠 System Design Philosophy

This project is designed as a **frontend system**, not just a UI.

### Core Principles
- **Data-driven UI** – visuals react only to validated data
- **Defensive programming** – bad input or API data never crashes the app
- **Separation of concerns** – logic, UI, effects, and services are isolated
- **Accessibility & trust** – users are always in control of permissions
- **Future-proof** – libraries can be replaced without breaking APIs

---

## 🏗️ Architecture Overview

Weather API
↓
Services (API, Geocoding, Cache)
↓
Context (Global State / Model)
↓
Hooks (Reusable Logic)
↓
Components (UI)
↓
Weather Effects Adapter
---

## 📁 Project Folder Structure

```text
src/
├── app/                # App bootstrap & providers
├── pages/              # Route-level pages (Dashboard, Settings)
├── components/         # Reusable UI components
├── effects/            # Weather effects & resolvers
├── design-tokens/      # Gradients, colors, spacing, typography
├── context/            # Global state (Weather, Location, UI)
├── services/           # API, geocoding, analytics, cache
├── hooks/              # Custom React hooks
├── utils/              # Pure utilities (testable logic)
├── tests/              # Unit & failure test cases
└── styles/             # Global & theme styles