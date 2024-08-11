import React, { useState } from "react";
import DashboardScreen from "./components/DashboardScreen";
import UpdateScreen from "./components/UpdateScree";

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [bannerDescription, setBannerDescription] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(true);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleTimerUpdate = () => {
    setCountdown(timer);
  };

  const handleBannerVisibility = () => {
    setBannerVisible(!bannerVisible);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <DashboardScreen
        open={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <UpdateScreen
        bannerDescription={bannerDescription}
        bannerLink={bannerLink}
        timer={timer}
        setBannerDescription={setBannerDescription}
        setBannerLink={setBannerLink}
        setTimer={setTimer}
        setCountdown={setCountdown}
        countdown={countdown}
        handleTimerUpdate={handleTimerUpdate}
        bannerVisible={bannerVisible}
        handleBannerVisibility={handleBannerVisibility}
      />
    </div>
  );
};

export default App;
