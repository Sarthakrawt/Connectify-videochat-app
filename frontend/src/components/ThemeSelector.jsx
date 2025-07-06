
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constant/index";
import { useState } from "react";


const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  const [visible , setVisible] = useState(false);
  return (
    
     <div className="relative inline-block text-left">
  <div>
    <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 hover:text-gray-300 active:text-gray-650" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={()=> setVisible(prev => !prev)} >
      Options
      <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        
      </svg>
    </button>
  </div>
 
  
      {
       visible &&   <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
    <div className="py-1" role="none">
          {THEMES.map((themeOption) => (
            <a id="menu-item-0"
              key={themeOption.name}
              role="menuitem"
              className={`
             block px-4 py-2 text-sm text-gray-700
              ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }
            `}
              onClick={() => setTheme(themeOption)}
            >
             
              <span className="text-sm font-medium">{themeOption.label}</span>
              {/* THEME PREVIEW COLORS */}
              <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
      }
      
     
    </div>

  );
};
export default ThemeSelector;