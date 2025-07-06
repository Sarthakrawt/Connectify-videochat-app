import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";


const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-50  shadow-md shadow-gray hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-3.5 border-b">
        <Link to="/" className="flex   items-center gap-2.5">
          <span className="text-3xl font-bold font-mono bg-clip-text
          bg-gradient-to-r ">
           Connectify
          </span>
        </Link>
      </div>

      <nav className="flex-col flex gap-10 p-4 space-y-1 justify-center ">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <span>Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 \border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10">
              <img src={authUser?.profilePic} alt="User Avatar" className="rounded-full" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-green-500 inline-block " />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;