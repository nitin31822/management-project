"use client"
import Link from "next/link";
import React , {useEffect, useState} from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { navItem } from "../TypeScript-Types/types";
import MenuOverlay from "./MenuOverlay";
import { useSelector } from "react-redux";
import { RootState } from "../app/state/store";




function Navbar  ()  {

  const { status } = useSelector((state: RootState) => state.auth);
  console.log(status , "authstatus");
  
  const [isAuthenticate , setIsAuthenticate] = useState(false)

  useEffect(() => {
    if (status === true) {
      setIsAuthenticate(true);
    } else {
      setIsAuthenticate(false);
    }
  }, [status]);

    const [navbarOpen, setNavbarOpen] = useState(false);
    const navitems : Array<navItem> = [
      {
          title : "Search",
          path : "/Search" ,
          isActive : true
      } ,
      {
          title : "Posts" ,
          path : "/posts" ,
          isActive : true
      } ,
      {
          title : "Stories" ,
          path : "/story" ,
          isActive : true
      } ,
      {
          title : "Chat" ,
          path : "/message/organisations" ,
          isActive : true
      } ,
      {
        title : "Profile" ,
        path : "/profile" ,
        isActive : isAuthenticate
      } ,
      {
        title : "Sign-In" ,
        path : "/users/auth/login" ,
        isActive : !isAuthenticate
      }
  ]
    return (
        <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
         Pro-Perly
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
          {navitems.map((link, index) => (
              link.isActive ? <li key={index}>
              <NavLink href={link.path} title={link.title} />
            </li> : null
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navitems} /> : null}
    </nav>
    )
}

export default Navbar