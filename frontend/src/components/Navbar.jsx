import { Link, useLocation} from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect,useState } from "react";


const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
 
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();
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
    <nav className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-30 h-16 flex items-center" style={styl}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full">
          
          {/* Left Side: Logo (Visible only on Chat page) */}
          {isChatPage && (
            <Link to="/" className="flex items-center gap-2.5">
              <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 tracking-wider">
                Connectify
              </span>
            </Link>
          )}

          {/* Right Side: Buttons & Avatar */}
          <div className="flex items-center gap-4 ml-auto">
            
            {/* Notification Button */}
            <Link to="/notification">
              <button className="rounded-full px-4 py-1.5 bg-blue-600 text-white font-medium text-sm shadow hover:bg-blue-700 transition">
                Notifications
              </button>
            </Link>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* Avatar */}
            {authUser?.profilePic && (
              <div className="avatar">
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    src={authUser.profilePic}
                    alt={`${authUser.fullName || "User"} Avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={logoutMutation}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
