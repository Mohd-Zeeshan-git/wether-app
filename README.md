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
```text
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
```
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





# 🌦️ Weather Backend (BFF – Backend for Frontend)

This backend acts as a **Backend for Frontend (BFF)** for the Weather Information Dashboard.
Its primary role is to **secure, normalize, cache, and enrich** weather data consumed by the frontend.

---

## 🎯 Why This Backend Exists

The backend is intentionally **thin** and **frontend-oriented**.

### Responsibilities
- 🔐 Protect third-party API keys (OpenWeather, Geocoding)
- 📦 Normalize weather API responses
- 🚦 Apply rate limiting & caching
- 📍 Resolve ambiguous city names to canonical coordinates
- 👤 Store user preferences (optional)
- 📊 Collect analytics & search logs
- 🧱 Provide a stable contract to the frontend

The backend **does not render UI** and **does not contain business UI logic**.

---

## 🏗️ Architecture Overview
```text
Frontend (React)
↓
Backend API (Node + Express)
↓
External APIs (Weather / Geocoding)
↓
Cache / Database
```

---

## 📁 Folder Structure
```text
backend/
├── src/
│ ├── server.js # HTTP server bootstrap
│ ├── app.js # Express app & middleware
│ │
│ ├── config/ # App configuration
│ ├── routes/ # API routes
│ ├── controllers/ # Request handlers
│ ├── services/ # External API & business services
│ ├── models/ # Database models
│ ├── middlewares/ # Auth, validation, error handling
│ ├── utils/ # Helpers & constants
│ └── tests/ # Backend tests
│
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## 🔌 Core API Endpoints

| Method | Endpoint | Description |
|------|--------|-------------|
| GET | `/api/weather/current` | Current weather by lat/lon |
| GET | `/api/weather/forecast` | 5-day forecast |
| POST | `/api/location/resolve` | Resolve city → lat/lon |
| GET | `/api/location/default` | User’s default/manual location |
| POST | `/api/analytics/search` | Log search events |

---

## 🔐 Environment Variables

```env
PORT=4000
WEATHER_API_KEY=your_openweather_key
GEOCODING_API_KEY=your_geocoding_key
NODE_ENV=development
```

---

# 2️⃣ API Contract (OpenAPI / Swagger)

You can place this in:

```yaml
openapi: 3.0.0
info:
  title: Weather Backend API
  version: 1.0.0
  description: Backend for Frontend API for Weather Dashboard

servers:
  - url: http://localhost:4000/api

paths:
  /weather/current:
    get:
      summary: Get current weather by coordinates
      parameters:
        - in: query
          name: lat
          required: true
          schema:
            type: number
        - in: query
          name: lon
          required: true
          schema:
            type: number
      responses:
        '200':
          description: Current weather data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Weather'

  /weather/forecast:
    get:
      summary: Get 5-day forecast
      parameters:
        - in: query
          name: lat
          required: true
          schema:
            type: number
        - in: query
          name: lon
          required: true
          schema:
            type: number
      responses:
        '200':
          description: Forecast data

  /location/resolve:
    post:
      summary: Resolve city name to coordinates
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LocationInput'
      responses:
        '200':
          description: Canonical location
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Location'

components:
  schemas:
    LocationInput:
      type: object
      properties:
        city:
          type: string
        country:
          type: string
        pincode:
          type: string

    Location:
      type: object
      properties:
        displayName:
          type: string
        lat:
          type: number
        lon:
          type: number
        country:
          type: string

    Weather:
      type: object
      properties:
        temperature:
          type: number
        condition:
          type: string
        humidity:
          type: number
        windSpeed:
          type: number
          ```