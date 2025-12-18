import React, { useContext } from 'react';
import Logo from '../../../Components/Logo/Logo';
import { AuthContext } from '../../../Context/AuthContext';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const {user,togl, setTogl,signout} = useContext(AuthContext)
    const handleLogOut = ()=>{
        signout()
    }
    return (
        <div className="navbar px-16 bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl"><Logo/></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2 bg-base-100 w-40 z-1">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
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
                                    title={user?.displayName}
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL} />
                                        
                                </div>
                                
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li><NavLink to='/my-profile'>My Profile</NavLink></li>
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