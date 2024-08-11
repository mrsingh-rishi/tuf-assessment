import React from "react";

interface MiniDrawerProps {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
}) => (
  <div
    className={`fixed top-0 left-0 h-full bg-gray-800 text-gray-200 transition-all duration-300 ${
      open ? "w-64" : "w-16"
    } overflow-hidden shadow-md z-30`}
  >
    <div className="flex items-center justify-between p-4">
      <button
        onClick={open ? handleDrawerClose : handleDrawerOpen}
        className="text-2xl"
      >
        {open ? "◁" : "▷"}
      </button>
    </div>
    <nav className="mt-4">
      {/* Navigation items */}
      <ul>
        <li className="p-2">
          {/* Dashboard item */}
          <button className="flex items-center w-full text-left p-2 hover:bg-gray-700 rounded">
            <span className="mr-2">🏠</span> {/* Dashboard icon */}
            {open && <span>Dashboard</span>}{" "}
            {/* Display text only if drawer is open */}
          </button>
        </li>
        <li className="p-2">
          {/* Create Item */}
          <button className="flex items-center w-full text-left p-2 hover:bg-gray-700 rounded">
            <span className="mr-2">➕</span> {/* Create item icon */}
            {open && <span>Create Item</span>}{" "}
            {/* Display text only if drawer is open */}
          </button>
        </li>
      </ul>
    </nav>
  </div>
);

export default MiniDrawer;
