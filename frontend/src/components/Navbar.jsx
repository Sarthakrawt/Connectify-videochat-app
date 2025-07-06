import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");


  const { logoutMutation } = useLogout();

  return (
    <nav className=" border-b sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  Connectify
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="rounded-full bg-blue-600 w-20 mr-10 shadow-gray shadow-md">
                notify
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="avatar">
            <div className="w-10 ml-10 mr-5">
              <img src={authUser?.profilePic} 
              className="rounded-full"
               alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout button */}
          <button className="text-blue-500
          font-bold hover:text-blue-800 active:text-blue-900" onClick={logoutMutation}>
         -logout-
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;