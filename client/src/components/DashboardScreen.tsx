import React, { useEffect, useState } from "react";
import MiniDrawer from "./MiniDrawer";
import axios from "axios";
import { BASE_URL } from "../constant";

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
          setBanners(data.banners); // Ensure the data structure matches your API response
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const totalBanners = banners.length;
  const activeBanners = banners.filter((b) => b.visible).length;
  const inactiveBanners = banners.filter((b) => !b.visible).length;

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
          {/* Banner Summary Cards */}
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold">Total Banners</h4>
              <p className="text-2xl">{totalBanners}</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold">Active Banners</h4>
              <p className="text-2xl">{activeBanners}</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold">Inactive Banners</h4>
              <p className="text-2xl">{inactiveBanners}</p>
            </div>
          </div>

          {/* Banners List */}
          <div className="space-y-4">
            {banners.length > 0 ? (
              banners.map((banner) => (
                <div
                  key={banner.id}
                  className={`p-4 rounded-lg shadow-md ${
                    banner.visible
                      ? "bg-blue-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  <h4 className="text-xl font-semibold">
                    {banner.description}
                  </h4>
                  <p className="text-lg">
                    {banner.visible
                      ? `Countdown: ${banner.countdown}s`
                      : "Inactive"}
                  </p>
                </div>
              ))
            ) : (
              <p>No banners available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
