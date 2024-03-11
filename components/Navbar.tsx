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
            <Link href="#!">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 582 720"
                                stroke="currentColor">
                                <path fill="#E8B059" d="M40 61h9v9h-9zM40 50.5h9v9h-9zM50.5 61h9v9h-9z" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M61 40H50.5v9H61v10.5h9V40h-9z" fill="#E8B059" />
                            </svg>
                    </Link>
        </nav>
    );
};

export default Navbar;