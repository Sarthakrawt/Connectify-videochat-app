import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constant";
import { useState, useEffect, useRef } from "react";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef();

  // Optional: Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="inline-flex items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
        aria-expanded={visible}
        aria-haspopup="true"
      >
        Theme
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {visible && (
        <div className="absolute right-0 mt-2 w-60 z-20 rounded-md bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-2">
            {THEMES.map((themeOption) => (
              <button
                key={themeOption.name}
                onClick={() => {
                  setTheme(themeOption);
                  setVisible(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left ${
                  theme === themeOption.name
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span>{themeOption.label}</span>
                <div className="flex gap-1 ml-2">
                  {themeOption.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
