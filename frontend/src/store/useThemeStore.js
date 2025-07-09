import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      theme: {
        name: "coffee",
        colors: ["#654321", "#1a1a1a", "#f0f0f0", "#ffffff"] // default theme
      },
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "streamify-theme", // this is the localStorage key
    }
  )
);

export { useThemeStore };