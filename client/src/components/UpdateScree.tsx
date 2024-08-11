import React from "react";

// Define the types for the props that UpdateScreen will receive.
interface UpdateScreenProps {
  bannerDescription: string; // Description of the banner.
  bannerLink: string; // Link associated with the banner.
  timer: number; // Timer value in seconds.
  setBannerDescription: (value: string) => void; // Function to update the banner description.
  setBannerLink: (value: string) => void; // Function to update the banner link.
  setTimer: (value: number) => void; // Function to update the timer.
  setCountdown: (value: number) => void; // Function to update the countdown (unused here).
  countdown: number; // Countdown value to display.
  handleTimerUpdate: () => void; // Function to trigger timer update.
  bannerVisible: boolean; // Boolean indicating if the banner is visible.
  handleBannerVisibility: () => void; // Function to toggle banner visibility.
}

// Functional component for the UpdateScreen.
const UpdateScreen: React.FC<UpdateScreenProps> = ({
  bannerDescription,
  bannerLink,
  timer,
  setBannerDescription,
  setBannerLink,
  setTimer,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCountdown,
  countdown,
  handleTimerUpdate,
  bannerVisible,
  handleBannerVisibility,
}) => (
  <div className="p-6 dark:bg-background-default dark:text-text-primary">
    {/* Heading for the update screen */}
    <h2 className="text-3xl font-bold mb-4">Banner Configuration</h2>

    {/* Button to toggle banner visibility */}
    <button
      onClick={handleBannerVisibility}
      className={`mb-4 px-4 py-2 rounded ${
        bannerVisible ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {bannerVisible ? "Hide Banner" : "Show Banner"}
    </button>

    {/* Input field for banner description */}
    <div className="mb-4">
      <label className="block mb-2">Banner Description</label>
      <input
        type="text"
        value={bannerDescription}
        onChange={(e) => setBannerDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded dark:bg-background-paper dark:border-gray-600 dark:text-text-primary"
      />
    </div>

    {/* Input field for banner link */}
    <div className="mb-4">
      <label className="block mb-2">Banner Link</label>
      <input
        type="text"
        value={bannerLink}
        onChange={(e) => setBannerLink(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded dark:bg-background-paper dark:border-gray-600 dark:text-text-primary"
      />
    </div>

    {/* Input field for timer value */}
    <div className="mb-4">
      <label className="block mb-2">Timer (seconds)</label>
      <input
        type="number"
        value={timer}
        onChange={(e) => setTimer(Number(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded dark:bg-background-paper dark:border-gray-600 dark:text-text-primary"
      />
    </div>

    {/* Button to set the timer */}
    <button
      onClick={handleTimerUpdate}
      className="mb-4 px-4 py-2 rounded bg-blue-500 text-white"
    >
      Set Timer
    </button>

    {/* Display the banner content if it's visible */}
    <div className="mt-4">
      {bannerVisible && (
        <div className="bg-primary text-text-primary p-4 rounded">
          <h3 className="text-xl">{bannerDescription}</h3>
          <p className="text-lg">{countdown}s</p>
        </div>
      )}
    </div>
  </div>
);

export default UpdateScreen;
