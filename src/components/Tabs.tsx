import React from "react";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  countOpen: number;
  countCompleted: number;
}

const Tabs: React.FC<TabsProps> = ({
  activeTab,
  onTabChange,
  countOpen,
  countCompleted,
}) => {
  return (
    <div className="flex gap-4 mb-6">
      <div
        className={`flex items-center cursor-pointer ${
          activeTab === "All" ? "text-blue-700" : "text-gray-700"
        }`}
        onClick={() => onTabChange("All")}
      >
        <span>All</span>
        <div
          className={`rounded-xl px-2 text-xs ml-2 ${
            activeTab === "All"
              ? "bg-blue-700 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          <span>{countOpen + countCompleted}</span>
        </div>
      </div>
      <div
        className={`flex items-center cursor-pointer ${
          activeTab === "Open" ? "text-blue-700" : "text-gray-700"
        }`}
        onClick={() => onTabChange("Open")}
      >
        <span>Open</span>
        <div
          className={`rounded-xl px-2 text-xs ml-2 ${
            activeTab === "Open"
              ? "bg-blue-700 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          <span>{countOpen}</span>
        </div>
      </div>
      <div
        className={`flex items-center cursor-pointer ${
          activeTab === "Completed" ? "text-blue-700" : "text-gray-700"
        }`}
        onClick={() => onTabChange("Completed")}
      >
        <span>Completed</span>
        <div
          className={`rounded-xl px-2 text-xs ml-2 ${
            activeTab === "Completed"
              ? "bg-blue-700 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          <span>{countCompleted}</span>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
