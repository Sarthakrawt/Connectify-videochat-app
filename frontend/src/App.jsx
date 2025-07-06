import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import  { Toaster } from "react-hot-toast";
import PageLoader from './components/PageLoader.jsx';
import UseAuthUser from './hooks/useAuthUser.js';
import { useThemeStore } from './store/useThemeStore.js';

function App() {
  const location = useLocation();
  const {theme} = useThemeStore();
 const [styl , setStyl] = useState({});
  const {isLoading, authUser} = UseAuthUser();
 const isAuthenticated = Boolean(authUser)
 const isOnBoarded = authUser?.isOnboarded
  const publicRoutes = ["/login", "/signup"];

 useEffect(()=>{
typeof theme =="string" ? setStyl({
      backgroundColor: "dark-blue",
    }) :  setStyl({
      backgroundColor : `${theme.colors[1]}`,
      color : `${theme.colors[3]}`,
      borderColor:`${theme.colors[0]}`
    })
  },[theme])

 
  // While loading, don't render anything (or you can return a loading spinner)
  if (isLoading) return <PageLoader/>;

  // If not authenticated and trying to access a protected route → redirect to login
  if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated and trying to access login/signup → redirect to home
  (isAuthenticated && isOnBoarded) ? (<Navigate to="/" replace /> ) : (
    <Navigate to={!isAuthenticated? "/login" :"/onboarding"}/>
  );
 
 
   
  return (
    <div className ="h-screen" style={styl}>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
