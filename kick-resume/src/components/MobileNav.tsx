import Link from 'next/link'
import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";


const MobileNav = () => {
  return (
    <div className=" lg:hidden block ml-auto relative">
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className=""
      >
        <GiHamburgerMenu size={20} />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li className="relative group">
          <span className="cursor-pointer flex items-center gap-1">
            Features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 shadow-md rounded-box mt-2 p-2 w-40 z-10">
            <li>
              <Link href="/">Submenu 1</Link>
            </li>
            <li>
              <Link href="/">Submenu 2</Link>
            </li>
          </ul>
        </li>

        <li className="relative group">
          <span className="cursor-pointer flex items-center gap-1">
            Resume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 shadow-md rounded-box mt-2 p-2 w-40 z-10">
            <li>
              <Link href="/">Submenu 1</Link>
            </li>
            <li>
              <Link href="/">Submenu 2</Link>
            </li>
          </ul>
        </li>

        <li className="relative group">
          <span className="cursor-pointer flex items-center gap-1">
            Cover Letter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 shadow-md rounded-box mt-2 p-2 w-40 z-10">
            <li>
              <Link href="/">Submenu 1</Link>
            </li>
            <li>
              <Link href="/">Submenu 2</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href={"/"}>Pricing</Link>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default MobileNav
