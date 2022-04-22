import "./App.css";
import "./FallBack.css"
import React, { Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import ErrorFallback from "./components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { Box, Spinner } from "@chakra-ui/react";
//import HomePage from "./Pages/HomePage";
//import DashboardPage from "./Pages/DashboardPage";
//import OnBoardingPage from "./Pages/OnBoardingPage";
//import GalleryPage from "./Pages/GalleryPage";
//import { useCookies } from "react-cookie";
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const DashboardPage = React.lazy(() => import("./Pages/DashboardPage"));
const OnBoardingPage = React.lazy(() => import("./Pages/OnBoardingPage"));
const GalleryPage = React.lazy(() => import("./Pages/GalleryPage"));

function App() {
  /* const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken; */

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload(true)}>
        <Suspense fallback={
          <Box //d="flex" alignItems="center" justifyContent="center" minHeight="100vh"
            //style={{backgroundImage:"url(./assets/bg5.png)", backgroundPosition:"center", backgroundSize:"cover"}}
            className='back'
          >
            <Spinner
              thickness="16px"
              speed="0.65s"
              w={56}
              h={56}
              emptyColor="white"
              color="yellow.400"
              alignSelf="center"
              margin="auto"
            />
          </Box>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/onboarding" element={<OnBoardingPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
