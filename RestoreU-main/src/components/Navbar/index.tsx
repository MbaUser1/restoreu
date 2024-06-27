"use client";
import { faBars, faBox, faFileLines, faHamburger, faSignIn, faTimes, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home', href: "/" },
    { id: 2, text: 'F.A.Q', href: "/faq" },
    { id: 3, text: 'Apropos', href: "/appropos" },
    { id: 4, text: 'Contact', href: "/contact" },
  ];

  return (
    <div className='sticky top-0 justify-between py-6 bg-white shadow-md z-50 bg-black flex justify-between items-center h-24  mx-auto px-4 w-full'>
      {/* Logo */}
      <h1 className='w-full text-3xl font-bold ml-20'>RestoreU</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:text-black rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            <Link href={item.href}>
              {item.text}
            </Link>
            
          </li>
          
        ))}
      </ul>
        <Link href={"/login"} className='md:block'>
          <button className="border-solid border-2 rounded-full p-6 mt-2 flex h-[48px] w-full  items-center justify-center gap-2 ">
            <FontAwesomeIcon icon={faSignIn} />
            <div>Connexion</div>
          </button>
        </Link>
      

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden ml-10'>
        {nav ? <FontAwesomeIcon icon={faTimes} width={20} height={20} /> : <FontAwesomeIcon icon={faBars} width={20} height={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>RestoreU</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-200'
          >
            <Link href={item.href}>
              {item.text}
            </Link>
          </li>
        ))}
        <Link href={"/login"}>
          <button className="border-solid border-2 rounded-full p-6 mt-2 flex h-[48px] w-full  items-center justify-center gap-2 ">
            <FontAwesomeIcon icon={faSignIn} />
            <div>Connexion</div>
          </button>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;