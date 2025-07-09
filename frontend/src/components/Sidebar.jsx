import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useEffect } from "react";
import { useState } from "react";
import { useThemeStore } from '../store/useThemeStore.js';
// Reusable link component for clarity and DRYness
const SidebarLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors 
        ${isActive
          ? "bg-blue-600 text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-100"
        }`} 
    >
      {label}
    </Link>
  );
};

const Sidebar = () => {
  const { authUser } = useAuthUser();

const [styl, setStyl] = useState({});
  const {theme} = useThemeStore();

   useEffect(()=>{
typeof theme =="string" ? setStyl({
      backgroundColor: "dark-blue",
     }) :  setStyl({
      backgroundColor : `${theme.colors[1]}`,
      color : `${theme.colors[3]}`,
      borderColor:`${theme.colors[0]}`
    })
  },[theme])

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen sticky top-0 shadow-md bg-blue-950" style={styl}>
      {/* Logo */}
      <div className="p-5 border-b">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-3xl font-bold font-mono bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Connectify
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 p-5">
        <SidebarLink to="/" label="Home" />
        <SidebarLink to="/friends" label="Friends" />
        <SidebarLink to="/notifications" label="Notifications" />
      </nav>

      {/* User info */}
      <div className="mt-auto p-5 border-t">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
