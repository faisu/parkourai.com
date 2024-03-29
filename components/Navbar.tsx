"use client"
// components/Navbar.js


const Navbar = () => {
    return (
        <nav className='w-full ml-8 place-content-between'>
            <div className='flex items-stretch my-8 ml-4'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 30 30" width="24" height="24" className='self-center mr-4'>
                    <path fill="#E8B059" d="M40 61h9v9h-9zM40 50.5h9v9h-9zM50.5 61h9v9h-9z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M61 40H50.5v9H61v10.5h9V40h-9z" fill="#E8B059" />
                </svg>
                <span className={'self-center'} style={{ color: '#E8B059' }}>BRIDGE IT</span>
            </div>
        </nav>
    );
};

export default Navbar;