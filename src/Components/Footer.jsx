import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-100  mx-auto px-4 xl:px-[55px] py-10">

            <div className="flex px-4 justify-evenly mb-6">
                <div className="flex-1">
                    <h5 className="text-gray-700 font-semibold mb-2">Airbnb</h5>
                    <ul>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">About Us</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Become a Host</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Host your home</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Host an Online Experience</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Resource Center</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Careers</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Privacy</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Terms</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Help</a></li>
                    </ul>
                </div>

                <div className="flex-1">
                    <h5 className="text-gray-700 font-semibold mb-2">Support</h5>
                    <ul>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Help Center</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Cancellation Options</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Trust & Safety</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Accessibility</a></li>
                    </ul>
                </div>

                <div className="flex-1">
                    <h5 className="text-gray-700 font-semibold mb-2">Community</h5>
                    <ul>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Diversity & Belonging</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Airbnb.org</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Community Center</a></li>
                        <li><a href="#!" className="text-gray-600 hover:text-gray-800">Neighborhood Support</a></li>
                    </ul>
                </div>
            </div>

            <div className='h-[3px] bg-gray-200 w-[85%] mx-auto'></div>
            <div className="flex mt-[15px] flex-wrap justify-between items-center">
                <div className="text-gray-600 flex items-center">
                    <p className='mr-[8px]'>© 2024 Airbnb, Inc.</p>
                    <p className='flex items-center'><span className='w-[4px] mt-[3px] mr-[4px] h-[4px] bg-gray-400 rounded-full'></span>Term</p>
                    <p className='flex items-center'><span className='w-[4px] mt-[3px] mx-[10px] h-[4px] bg-gray-400 rounded-full'></span>Sitemap</p>
                    <p className='flex items-center'><span className='w-[4px] mt-[3px] mx-[10px] h-[4px] bg-gray-400 rounded-full'></span>Privacy</p>
                    <p className='flex items-center'><span className='w-[4px] mt-[3px] mx-[10px] h-[4px] bg-gray-400 rounded-full'></span>Your Privacy Choices</p>
                </div>
                <div className="flex space-x-4">
                    <a href="#!" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaFacebookF /></a>
                    <a href="#!" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaTwitter /></a>
                    <a href="#!" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaInstagram /></a>
                    <a href="#!" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaPinterestP /></a>
                    <a href="#!" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaLinkedinIn /></a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
