import React from "react";
import { useTheme } from "../../useContextHook/useTheme";

const MenuItems = ({ item, isSelected, onclick }) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      onClick={item.type === "category" ? onclick : undefined}
      className={`px-4 py-3 flex items-center space-x-4 rounded-md cursor-pointer ${
        isDarkMode
          ? "text-gray-300 hover:bg-gray-700 "
          : "hover:bg-gray-100 text-gray-500 "
      } ${isSelected ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
    >
      <span
        className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        {item.icon}
      </span>
      <span
        className={`font-medium ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {item.name}
      </span>
    </div>
  );
};

export default MenuItems;
