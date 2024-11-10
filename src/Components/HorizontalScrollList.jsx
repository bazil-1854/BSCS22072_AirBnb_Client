import React from 'react';
import { FaTree, FaStar, FaMoneyBillAlt, FaDog, FaCoffee, FaMountain, FaHeart, FaSwimmer, FaFire } from 'react-icons/fa';
import { MdOutlineBeachAccess, MdOutlineNature, MdOutlineStar, MdOutlineAttachMoney, MdOutlineGroup, MdOutlinePets, MdOutlineLocalCafe, MdOutlineHome, MdOutlinePool, MdOutlineSnowboarding, MdOutlineHiking, MdOutlineFlight, MdOutlineLocalDining, MdOutlineBusinessCenter, MdOutlineFitnessCenter } from 'react-icons/md';

const categories = [
    { name: 'All', category: '', icon: <MdOutlineHome className='text-[25px] mb-[5px]' /> },
    { name: 'Beachfront', category: 'Beachfront', icon: <MdOutlineBeachAccess className='text-[25px] mb-[5px]' /> },
    { name: 'Cabins', category: 'Cabins', icon: <FaTree className='text-[25px] mb-[5px]' /> },
    { name: 'Trending', category: 'Trending', icon: <MdOutlineStar className='text-[25px] mb-[5px]' /> },
    { name: 'Luxury', category: 'Luxury', icon: <FaMoneyBillAlt className='text-[25px] mb-[5px]' /> },
    { name: 'Budget', category: 'Budget', icon: <MdOutlineAttachMoney className='text-[25px] mb-[5px]' /> },
    { name: 'Family', category: 'Family-Friendly', icon: <MdOutlineGroup className='text-[25px] mb-[5px]' /> },
    { name: 'Farms', category: 'Pet-Friendly', icon: <MdOutlinePets className='text-[25px] mb-[5px]' /> },
    { name: 'Unique', category: 'Unique Stays', icon: <MdOutlineLocalCafe className='text-[25px] mb-[5px]' /> },
    { name: 'Romantic', category: 'Romantic Getaways', icon: <MdOutlineNature className='text-[25px] mb-[5px]' /> },
    { name: 'Adventure', category: 'Adventure', icon: <FaMountain className='text-[25px] mb-[5px]' /> },
    { name: 'Swimming', category: 'Swimming', icon: <MdOutlinePool className='text-[25px] mb-[5px]' /> },
    { name: 'Camping', category: 'Camping', icon: <FaFire className='text-[25px] mb-[5px]' /> },
    { name: 'Skiing', category: 'Skiing', icon: <MdOutlineSnowboarding className='text-[25px] mb-[5px]' /> },
    { name: 'Hiking', category: 'Hiking', icon: <MdOutlineHiking className='text-[25px] mb-[5px]' /> },
    { name: 'Flights', category: 'Flights', icon: <MdOutlineFlight className='text-[25px] mb-[5px]' /> }, 
    { name: 'Dining', category: 'Dining', icon: <MdOutlineLocalDining className='text-[25px] mb-[5px]' /> },
    { name: 'Business', category: 'Business', icon: <MdOutlineBusinessCenter className='text-[25px] mb-[5px]' /> },
    { name: 'Fitness', category: 'Fitness', icon: <MdOutlineFitnessCenter className='text-[25px] mb-[5px]' /> },
    { name: 'Wildlife', category: 'Wildlife', icon: <FaDog className='text-[25px] mb-[5px]' /> },
    { name: 'Relaxation', category: 'Relaxation', icon: <FaCoffee className='text-[25px] mb-[5px]' /> },
    { name: 'Culture', category: 'Culture', icon: <FaStar className='text-[25px] mb-[5px]' /> },
    { name: 'Wellness', category: 'Wellness', icon: <FaHeart className='text-[25px] mb-[5px]' /> },
    { name: 'New', category: 'New', icon: <FaSwimmer className='text-[25px] mb-[5px]' /> },
];

const HorizontalScrollList = ({ setCategory }) => {
    return (
        <div className='flex overflow-x-hidden pt-4 xl:w-[88vw] mx-auto'>
            <div className="flex bg-white overflow-x-auto py-4 no-scrollbar">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setCategory(category.category)}
                        className="py-2 w-[] rounded-xl flex mr-[35px] flex-col justify-center items-center text-sm font-medium text-gray-500 hover:bg-gray-100 transition duration-200"
                    >
                        {category.icon}
                        <p className="text-gray-700">{category.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScrollList;
