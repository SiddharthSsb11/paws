import "./App.css";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import OnBoardingPage from "./Pages/OnBoardingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/onboarding" element={<OnBoardingPage />} />
      </Routes>
    </div>
  );
}

export default App;
