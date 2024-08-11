import React, { useEffect, useState } from "react";
import MiniDrawer from "./MiniDrawer";
import Banner from "./Banner";
import { BASE_URL } from "../constant";
import axios from "axios";

interface DashboardScreenProps {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const [banners, setBanners] = useState<
    {
      id: number;
      description: string;
      visible: boolean;
      countdown: number;
    }[]
  >([]);

  // Fetch banners from the API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/banners`); // Replace with your API endpoint
        const data = await response.data;
        if (data.statusCode === 200) {
          console.log(data);
          setBanners(data);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="flex h-screen">
      <MiniDrawer
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <main
        className={`flex-1 transition-all duration-300 ${
          open ? "ml-64" : "ml-16"
        } bg-gray-900 text-gray-200`}
      >
        <div className="p-6">
          {/* Banner component */}
          <Banner banners={banners} />

          <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
          <p>
            Here is where the dashboard content will go. Add more sections or
            widgets as needed.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
