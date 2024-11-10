import React, { useState, useEffect } from 'react';
import { FaBars, FaHeart, FaSearch, FaSlidersH, FaTimes, FaUser, FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { NavLink, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import airbnb from "../logo.svg";
import { LuGlobe } from 'react-icons/lu';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [homePath, sethomePath] = useState(true);
    const location = useLocation();

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 150], [1, 0]);
    const y = useTransform(scrollY, [0, 200], [0, -120]);

    useEffect(() => {
        sethomePath(location.pathname === '/');
    }, [location.pathname]);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setShowSearchBar(true);
        } else {
            setShowSearchBar(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="bg-white fixed w-full z-50 top-0">
            <nav className='md:block hidden'>
                <div className={`${location.pathname === '/' ? 'border-white pt-4' : 'border-b-[3px] border-gray-100 py-4'} mx-auto px-4 sm:px-6 md:px-[15px] lg:px-[35px] xl:px-[75px]`}>
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center">
                            <img src={airbnb} alt="" className='w-[32px] mr-[5px] h-[32px]' />
                            <NavLink to="/" className="text-[24px] font-[780] text-red-500">
                                airbnb
                            </NavLink>
                        </div>

                        {!homePath ?
                            <div className="hidden sm:flex items-cente border-[2px] xl:mr-[-165px] z-90 rounded-full py-2 px-4 shadow-md">
                                <p className="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-gray-700">Anywhere</p>
                                <p className="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-[15px] text-gray-700">Any week</p>
                                <p className="bg-transparent flex-grow outline-none px-[8px] font-[600] text-[15px] text-gray-500">Any Guests</p>
                                <AiOutlineSearch className="bg-red-500 text-white rounded-full p-[5.5px] ml-[6px] text-[28px]" />
                            </div>
                            : <>
                                {showSearchBar ? (
                                    <div className="hidden sm:flex z-50 items-cente border-[2px] xl:mr-[-165px] z-90 rounded-full py-2 px-4 shadow-md">
                                        <p className="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-gray-700">Anywhere</p>
                                        <p className="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-[15px] text-gray-700">Any week</p>
                                        <p className="bg-transparent flex-grow outline-none px-[8px] font-[600] text-[15px] text-gray-500">Any Guests</p>
                                        <AiOutlineSearch className="bg-red-500 text-white rounded-full p-[5.5px] ml-[6px] text-[28px]" />
                                    </div>
                                ) : (
                                    <motion.div
                                style={{ opacity, y }}
                                className="hidden sm:flex xl:mr-[-165px] bg-white z-90 space-x-6"
                            >
                                <NavLink to="/stays" className="text-gray-600 hover:text-black font-medium">
                                    Stays
                                </NavLink>
                                <NavLink to="/experiences" className="text-gray-600 hover:text-black font-medium">
                                    Experiences
                                </NavLink>
                            </motion.div>
                                )}
                            </>
                        }

                        <div className="flex items-center space-x-4">
                            <span className='text-gray-700 text-md'>Airbnb Your Home</span>
                            <button className="hidden md:inline-flex items-center text-gray-600 space-x-2 hover:text-black">
                                <LuGlobe className="text-xl" />
                            </button>
                            <div onClick={toggleMenu} className="flex items-center space-x-2 border rounded-full px-3 py-2 hover:shadow-lg transition-shadow">
                                <div className='sm:block hidden'><GiHamburgerMenu className="text-xl text-gray-500" /></div>
                                <div className="sm:hidden">
                                    <button onClick={toggleMenu}>
                                        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                                    </button>
                                </div>
                                <FaUserCircle className="text-3xl text-gray-500" />
                            </div>

                        </div>
                    </div>

                    {isOpen && (
                        <div className="lg:block hidden">
                            <div className="flex flex-col absolute z-[90] right-0 mr-[75px] w-[450px] bg-white rounded-lg border shadow-xl mt-2 p-4">
                                <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Sign up
                                </NavLink>
                                <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Log in
                                </NavLink>
                                <div className="w-full bg-gray-200 h-[2px] my-2"></div>
                                <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Gift Cards
                                </NavLink>
                                <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Airbnb Your Home
                                </NavLink>
                                <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Host an Experience
                                </NavLink>
                                <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Help Center
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <nav className='md:hidden block'>
                <div className="flex items-center pt-[15px] px-[18px] w-screen">
                    <div className='border-[2px] w-[85%] border-gray-300 rounded-[25px] flex items-center py-[5px] px-3'>
                        <FaSearch className="text-gray-700 mr-5" size={25} />
                        <div className="flex-1 text-[14px] text-gray-500">
                            <div className="font-medium">Where to?</div>
                            <div className="text-[12px] text-gray-400">Anywhere · Any week · Add guests</div>
                        </div>
                    </div>
                    <div className='w-[15%] flex justify-center'>
                        <button className=" border-[2px] p-2 border-gray-500 rounded-full bg-gray-100">
                            <FaSlidersH onClick={toggleMenu} className="text-gray-500" size={20} />
                        </button>
                    </div>

                </div>
                {isOpen && (
                    <div className="sm:hidden">
                        <div className="flex flex-col bg-white rounded-lg shadow-md mt-2 p-4">
                            <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Sign up
                            </NavLink>
                            <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Log in
                            </NavLink>
                            <div className="w-full bg-gray-200 h-[2px] my-2"></div>
                            <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Gift Cards
                            </NavLink>
                            <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Airbnb Your Home
                            </NavLink>
                            <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Host an Experience
                            </NavLink>
                            <NavLink to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Help Center
                            </NavLink>
                        </div>
                    </div>
                )}
                <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex px-[55px] justify-around py-2">
                    <div className="flex flex-col items-center">
                        <FaSearch className="text-red-500 mb-[6px]" size={22} />
                        <span className="text-xs text-gray-600">Explore</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaHeart className="text-gray-400 mb-[6px]" size={22} />
                        <span className="text-xs text-gray-600">Wishlist</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaUser className="text-gray-400 mb-[6px]" size={22} />
                        <span className="text-xs text-gray-600">Login</span>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
/*
                <HorizontalScrollList setCategory={setCategory} /> */