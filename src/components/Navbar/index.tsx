"use client";
import {
  faBars,
  faBox,
  faFileLines,
  faHamburger,
  faSignIn,
  faTimes,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home", href: "/" },
    { id: 2, text: "F.A.Q", href: "/faq" },
    { id: 3, text: "Apropos", href: "/appropos" },
    { id: 4, text: "Contact", href: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50 mx-auto flex h-24 w-full items-center justify-between justify-between bg-black bg-white  px-4 py-6 shadow-md">
      {/* Logo */}
      <h1 className="ml-20 w-full text-3xl font-bold">RestoreU</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="m-2 cursor-pointer rounded-xl p-4 duration-300 hover:text-black hover:text-black"
          >
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
      <Link href={"/login"} className="md:block">
        <button className="mt-2 flex h-[48px] w-full items-center justify-center gap-2 rounded-full  border-2 border-solid p-6 ">
          <FontAwesomeIcon icon={faSignIn} />
          <div>Connexion</div>
        </button>
      </Link>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="ml-10 block md:hidden">
        {nav ? (
          <FontAwesomeIcon icon={faTimes} width={20} height={20} />
        ) : (
          <FontAwesomeIcon icon={faBars} width={20} height={20} />
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "border-r-gray-900 fixed left-0 top-0 h-full w-[60%] border-r bg-[#000300] duration-500 ease-in-out md:hidden"
            : "fixed bottom-0 left-[-100%] top-0 w-[60%] duration-500 ease-in-out"
        }
      >
        {/* Mobile Logo */}
        <h1 className="m-4 w-full text-3xl font-bold text-[#00df9a]">
          RestoreU
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="border-gray-200 cursor-pointer rounded-xl border-b p-4 duration-300 hover:bg-[#00df9a] hover:text-black"
          >
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
        <Link href={"/login"}>
          <button className="mt-2 flex h-[48px] w-full items-center justify-center gap-2 rounded-full  border-2 border-solid p-6 ">
            <FontAwesomeIcon icon={faSignIn} />
            <div>Connexion</div>
          </button>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
