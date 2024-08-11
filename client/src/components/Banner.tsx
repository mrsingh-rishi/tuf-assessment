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
      {banners.length > 0 ? (
        banners.map((banner) => (
          <div
            key={banner.id}
            className={`p-4 mb-4 rounded ${
              banner.visible
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            <h3 className="text-xl font-bold">{banner.description}</h3>
            <p className="text-lg">
              {banner.visible ? `Time left: ${banner.countdown}s` : "Inactive"}
            </p>
          </div>
        ))
      ) : (
        <p>No banners available.</p>
      )}
    </div>
  );
};

export default Banner;
