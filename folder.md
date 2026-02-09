```
weather-app/
│
├── public/
│   ├── index.html
│   ├── icons/
│   │   ├── weather/
│   │   └── app-icon.png
│   └── sounds/
│       ├── rain.mp3
│       ├── wind.mp3
│       └── thunder.mp3
│
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── AppProviders.jsx
│   │   └── routes.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Dashboard.styles.css
│   │   │   └── Dashboard.test.jsx
│   │   │
│   │   ├── Settings/
│   │   │   ├── Settings.jsx
│   │   │   └── Settings.test.jsx
│   │   │
│   │   └── NotFound.jsx
│   │
│   ├── components/
│   │   ├── WeatherEnvironment/
│   │   │   ├── WeatherEnvironment.jsx
│   │   │   ├── WeatherEffects.jsx
│   │   │   ├── WeatherEnvironment.styles.css
│   │   │   └── WeatherEnvironment.test.jsx
│   │   │
│   │   ├── WeatherCard/
│   │   │   ├── WeatherCard.jsx
│   │   │   ├── WeatherCard.styles.css
│   │   │   └── WeatherCard.test.jsx
│   │   │
│   │   ├── Search/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── AutocompleteList.jsx
│   │   │   ├── VoiceSearchButton.jsx
│   │   │   └── Search.test.jsx
│   │   │
│   │   ├── Loaders/
│   │   │   ├── SkeletonWeather.jsx
│   │   │   └── SkeletonSearch.jsx
│   │   │
│   │   ├── Feedback/
│   │   │   ├── ErrorState.jsx
│   │   │   ├── OfflineBanner.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   └── Common/
│   │       ├── Button.jsx
│   │       ├── Toggle.jsx
│   │       └── Modal.jsx
│   │
│   ├── effects/
│   │   ├── resolveWeatherEffects.js
│   │   ├── wind.css
│   │   └── thunder.css
│   │
│   ├── design-tokens/
│   │   ├── gradients.js
│   │   ├── colors.js
│   │   ├── spacing.js
│   │   └── typography.js
│   │
│   ├── context/
│   │   ├── WeatherContext.jsx
│   │   ├── LocationContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── UnitContext.jsx
│   │   └── UIContext.jsx
│   │
│   ├── services/
│   │   ├── weatherService.js
│   │   ├── geocodingService.js
│   │   ├── analyticsService.js
│   │   └── cacheService.js
│   │
│   ├── hooks/
│   │   ├── useWeather.js
│   │   ├── useLocation.js
│   │   ├── useOffline.js
│   │   ├── useReducedMotion.js
│   │   ├── useDebounce.js
│   │   └── useAmbientSound.js
│   │
│   ├── utils/
│   │   ├── getWeatherGradient.js
│   │   ├── deviceProfile.js
│   │   ├── stringSimilarity.js
│   │   ├── unitConversion.js
│   │   └── constants.js
│   │
│   ├── tests/
│   │   ├── resolveWeatherEffects.test.js
│   │   ├── gradients.test.js
│   │   ├── deviceProfile.test.js
│   │   └── failure-cases.test.js
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── themes.css
│   │   └── animations.css
│   │
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .env.example
├── package.json
├── vite.config.js
├── README.md
└── tsconfig.json (optional)
```


```
backend/
│
├── src/
│   ├── server.js              # App entry point
│   ├── app.js                 # Express app setup
│   │
│   ├── config/
│   │   ├── env.js             # Environment variables
│   │   ├── cors.js
│   │   └── rateLimiter.js
│   │
│   ├── routes/
│   │   ├── weather.routes.js
│   │   ├── location.routes.js
│   │   ├── user.routes.js     # optional
│   │   └── analytics.routes.js
│   │
│   ├── controllers/
│   │   ├── weather.controller.js
│   │   ├── location.controller.js
│   │   ├── analytics.controller.js
│   │   └── user.controller.js
│   │
│   ├── services/
│   │   ├── weather.service.js     # OpenWeather API calls
│   │   ├── geocoding.service.js
│   │   ├── cache.service.js
│   │   └── analytics.service.js
│   │
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Location.model.js
│   │   └── SearchLog.model.js
│   │
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── utils/
│   │   ├── apiResponse.js
│   │   ├── logger.js
│   │   └── constants.js
│   │
│   └── tests/
│       ├── weather.test.js
│       ├── location.test.js
│       └── analytics.test.js
│
├── .env
├── .env.example
├── package.json
└── README.md
```