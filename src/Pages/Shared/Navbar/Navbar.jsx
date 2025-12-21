import React, { useContext } from 'react';
import Logo from '../../../Components/Logo/Logo';
import { AuthContext } from '../../../Context/AuthContext';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const { user, togl, setTogl, signout } = useContext(AuthContext)
    const handleLogOut = () => {
        signout()
    }

    const links = <>
        <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`} >
                Home
            </NavLink>
        </li>

        <li> <NavLink to="/all-tickets" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`} >
            All Ticket
        </NavLink> </li>
        <li>
            <NavLink
                to="/why-choose-us"
                className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                }
            >
                Why Choose Us
            </NavLink>
        </li>


        {/* <li >
            <details>
                <summary className="nav-link">About</summary>
                <ul className="p-2 bg-base-100 w-40 z-1"> */}

        <li>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                }
            >
                About Us
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                }
            >
                Contact Us
            </NavLink>
        </li>
        {/* </ul>
            </details>
        </li> */}


    </>

    return (
        <div className="navbar fixed z-10 px-16 bg-base-300/20 backdrop-blur-sm shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={"/"} className="text-xl"><Logo /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className="flex gap-2">

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            data-tip={user?.displayName}
                                            referrerPolicy="no-referrer"
                                            title={user?.displayName}
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.photoURL} />

                                    </div>

                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li><NavLink to='/dashboard/'>Dashboard</NavLink></li>
                                    <li><NavLink to='/dashboard/user/profile'>My Profile</NavLink></li>
                                    <li ><button onClick={handleLogOut} >Logout</button></li>
                                </ul>
                            </div>
                        </div>
                        : <div>
                            <Link to={"/login"}>
                                <button onClick={() => setTogl(false)} className={`btn btn-primary ${togl ? "bg-white text-black" : ""}`}>Login</button>
                            </Link>
                            <Link to={"/register"}>
                                <button onClick={() => setTogl(true)} className={`btn btn-primary ${togl ? "" : "bg-white text-black"}`}>Register</button>
                            </Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;