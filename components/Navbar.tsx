"use client"
// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    // State to manage the visibility of the collapsible menu
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    // Event handler to toggle the menu visibility
    const toggleNav = () => {
        setIsNavExpanded(!isNavExpanded);
    };

    return (
        <nav
            className="absolute top-0 flex w-full items-center justify-between bg-white py-2 shadow-sm shadow-neutral-700/10 lg:flex-wrap lg:justify-start">
            {/* // Container wrapper */}
            <div className="flex w-full flex-wrap items-center justify-between px-6">
                <div className="flex items-center">
                    {/* // Toggle button */}
                    <button
                        onClick={toggleNav}
                        className="block border-0 bg-transparent py-2 pr-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden"
                        type="button" data-te-collapse-init data-te-target="#navbarSupportedContentY"
                        aria-controls="navbarSupportedContentY" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="[&>svg]:w-7">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                                <path fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                    </button>

                    {/* // Navbar Brand */}
                    <Link className="text-neutral-800" href="#!">
                        <span className="[&>svg]:ml-2 [&>svg]:mr-3 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:lg:ml-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        </span>
                    </Link>
                </div>

                {/* // Collapsible wrapper */}
                <div className={`flex-grow basis-[100%] items-center lg:!flex lg:basis-auto ${isNavExpanded ? 'flex' : 'hidden'}`}
                    id="navbarSupportedContentY" data-te-collapse-item>
                    {/* // Left links */}
                    <ul className="mr-auto lg:flex lg:flex-row" data-te-navbar-nav-ref>
                        <li data-te-nav-item-ref>
                            <Link className="block py-2 pr-2 text-neutral-800 transition duration-150 ease-in-out hover:text-neutral-400 focus:text-neutral-800 disabled:text-black/30 lg:px-2 [&.active]:text-black/80"
                                href="#!" data-te-nav-link-ref data-te-ripple-init data-te-ripple-color="light">BRIDGE IT</Link>
                        </li>
                    </ul>
                    {/* // Left links */}
                </div>
                {/* // Collapsible wrapper */}

                {/* // Right elements */}
                <div className="my-1 flex items-center lg:my-0 lg:ml-auto">
                    <button type="button"
                        className="mr-2 inline-block rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-400-600 focus:text-neutral-800-600 focus:outline-none focus:ring-0 active:text-neutral-800-700">
                        Login
                    </button>
                    <button type="button"
                        className="mr-2 inline-block rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-400-600 focus:text-neutral-800-600 focus:outline-none focus:ring-0 active:text-neutral-800-700">
                        Sign Up
                    </button>
                </div>
                {/* // Right elements */}
            </div>
            {/* // Container wrapper */}
        </nav>
    );
};

export default Navbar;