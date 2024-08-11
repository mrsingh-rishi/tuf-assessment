import React from "react";

interface BannerProps {
  banners: {
    id: number;
    description: string;
    visible: boolean;
    countdown: number;
  }[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  return (
    <div>
      {banners.map((banner) =>
        banner.visible ? (
          <div
            key={banner.id}
            className="bg-blue-500 text-white p-4 rounded mb-4"
          >
            <h3 className="text-xl font-bold">{banner.description}</h3>
            <p className="text-lg">Time left: {banner.countdown}s</p>
          </div>
        ) : (
          <div
            key={banner.id}
            className="bg-gray-500 text-white p-4 rounded mb-4"
          >
            <h3 className="text-xl font-bold">{banner.description}</h3>
            <p className="text-lg">Inactive</p>
          </div>
        )
      )}
    </div>
  );
};

export default Banner;
