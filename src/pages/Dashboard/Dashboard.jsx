import React from "react";

// Hooks
import { useWeather } from "../../hooks/useWeather";
import { useOffline } from "../../hooks/useOffline";

// Components
import WeatherEnvironment from "../../components/WeatherEnvironment/WeatherEnvironment";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import SkeletonWeather from "../../components/Loaders/SkeletonWeather";
import ErrorState from "../../components/Feedback/ErrorState";
import OfflineBanner from "../../components/Feedback/OfflineBanner";
import EmptyState from "../../components/Feedback/EmptyState";
import SearchBar from "../../components/Search/SearchBar";

const Dashboard = () => {
  // 1️⃣ Weather data & state
  const { weather, isLoading, error, refetch } = useWeather();

  // 2️⃣ Network state
  const { isOffline } = useOffline();

  // 3️⃣ Extract weather safely
  const temp = weather?.temp;
  const condition = weather?.condition;

  return (
    <main className="relative min-h-screen flex flex-col px-4 pt-20 pb-10">
      {/* Offline status */}
      <OfflineBanner isOffline={isOffline} />

      {/* Background environment */}
      {weather && (
        <WeatherEnvironment temp={temp} condition={condition} />
      )}

      {/* Foreground content */}
      <div className="relative z-20 w-full flex flex-col gap-6">
        {/* Search input always visible */}
        <SearchBar />

        {/* Loading */}
        {isLoading && <SkeletonWeather />}

        {/* Error */}
        {error && !isLoading && (
          <ErrorState
            title={error.title}
            message={error.message}
            onRetry={refetch}
          />
        )}

        {/* Success */}
        {weather && !isLoading && !error && (
          <WeatherCard
            city={weather.city}
            temp={weather.temp}
            condition={weather.condition}
            humidity={weather.humidity}
            wind={weather.wind}
          />
        )}

        {/* Empty / First-time */}
        {!weather && !isLoading && !error && <EmptyState />}
      </div>
    </main>
  );
};

export default Dashboard;

/*
import { useWeather } from '../../context/WeatherContext'

import WeatherEnvironment from '../../components/WeatherEnvironment/WeatherEnvironment'
import WeatherCard from '../../components/WeatherCard/WeatherCard'
import SearchBar from '../../components/Search/SearchBar'
import SkeletonWeather from '../../components/Loaders/SkeletonWeather'
import EmptyState from '../../components/Feedback/EmptyState'

const Dashboard = () => {
  // ------------------------------
  // 1️⃣ Weather state
  // ------------------------------
  const { data, loading } = useWeather()

  // ------------------------------
  // 2️⃣ Layout
  // ------------------------------
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* --------------------------
          3️⃣ Weather background & effects
         -------------------------- }
      <WeatherEnvironment />

      {/* --------------------------
          4️⃣ Foreground content
         -------------------------- }
      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          items-center
          px-4
          pt-6
          sm:px-6
          lg:px-8
        "
      >
        {/* ----------------------
            5️⃣ Search bar
           ---------------------- }
        <div className="w-full max-w-xl">
          <SearchBar />
        </div>

        {/* ----------------------
            6️⃣ Main content
           ---------------------- }
        <div className="mt-10 w-full max-w-md">
          {loading && <SkeletonWeather />}

          {!loading && data && <WeatherCard />}

          {!loading && !data && <EmptyState />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
*/