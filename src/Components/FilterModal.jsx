import React, { useState } from 'react';
import { FaWifi, FaSnowflake, FaTshirt } from 'react-icons/fa';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useAuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const FiltersModal = () => {
    const navigate = useNavigate();
    const { setSearchFilters } = useAuthContext();
    const [title, setTitle] = useState('');
    const [suburb, setSuburb] = useState('');
    const [country, setCountry] = useState('');
    const [minPrice, setMinPrice] = useState(10);
    const [maxPrice, setMaxPrice] = useState(130);
    const [beds, setBeds] = useState('Any');
    const [bathrooms, setBathrooms] = useState('Any');

    const handleRangeChange = (e, type) => {
        const value = Number(e.target.value);
        if (type === 'min') {
            setMinPrice(Math.min(value, maxPrice)); // Ensure minPrice doesn't exceed maxPrice
        } else if (type === 'max') {
            setMaxPrice(Math.max(value, minPrice)); // Ensure maxPrice doesn't go below minPrice
        }
    };

    const resetFilters = () => {
        setTitle('');
        setSuburb('');
        setCountry('');
        setMinPrice(10);
        setMaxPrice(130);
        setBeds('Any');
        setBathrooms('Any');
    };

    const logValues = () => {
        console.log({
            title,
            suburb,
            country,
            minPrice,
            maxPrice,
            beds,
            bathrooms,
        });
        setSearchFilters({
            title,
            suburb,
            country,
            minPrice,
            maxPrice,
            beds,
            bathrooms,
        })
        navigate("/search");
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button className="text-gray-500 hover:text-black text-2xl">&times;</button>
                </div>

                {/* Content */}
                <div className="mt-4">
                    {/* Search Bar for Title */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Suburb and Country Inputs */}
                    <div className="mb-6 grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="Suburb"
                            value={suburb}
                            onChange={(e) => setSuburb(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <h3 className="font-medium">Price Range</h3>
                        <p className="text-sm text-gray-500">Nightly prices before fees and taxes</p>
                        <div className="relative mt-4">
                            <div className="absolute inset-0 bg-gray-300 h-1 rounded-full"></div>
                            <div
                                className="absolute bg-pink-500 h-1 rounded-full"
                                style={{
                                    left: `${((minPrice - 10) / 240) * 100}%`,
                                    right: `${100 - ((maxPrice - 10) / 240) * 100}%`,
                                }}
                            ></div>
                            <input
                                type="range"
                                className="absolute w-full slider-thumb text-rose-700 appearance-none bg-transparent z-10 pointer-events-auto"
                                min="10"
                                max="250"
                                value={minPrice}
                                onChange={(e) => handleRangeChange(e, 'min')}
                            />
                            <input
                                type="range"
                                className="absolute w-full slider-thumb2 appearance-none bg-transparent mt-[15px] z-10 pointer-events-auto"
                                min="10"
                                max="250"
                                value={maxPrice}
                                onChange={(e) => handleRangeChange(e, 'max')}
                            />
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>${minPrice}</span>
                            <span>${maxPrice}+</span>
                        </div>
                    </div>

                    {/* Beds and Bathrooms */}
                    <div className="mb-6">
                        <h3 className="font-medium">Beds and Bathrooms</h3>
                        <div className="flex justify-between items-center mt-2">
                            <span>Beds</span>
                            <div className="flex items-center">
                                <button
                                    className="p-1 border rounded text-gray-700 hover:text-black"
                                    onClick={() =>
                                        setBeds((prev) => (prev === 'Any' ? 0 : Math.max(0, prev - 1)))
                                    }
                                >
                                    <AiOutlineMinus />
                                </button>
                                <span className="px-4">{beds}</span>
                                <button
                                    className="p-1 border rounded text-gray-700 hover:text-black"
                                    onClick={() => setBeds((prev) => (prev === 'Any' ? 1 : prev + 1))}
                                >
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span>Bathrooms</span>
                            <div className="flex items-center">
                                <button
                                    className="p-1 border rounded text-gray-700 hover:text-black"
                                    onClick={() =>
                                        setBathrooms((prev) =>
                                            prev === 'Any' ? 0 : Math.max(0, prev - 1)
                                        )
                                    }
                                >
                                    <AiOutlineMinus />
                                </button>
                                <span className="px-4">{bathrooms}</span>
                                <button
                                    className="p-1 border rounded text-gray-700 hover:text-black"
                                    onClick={() =>
                                        setBathrooms((prev) => (prev === 'Any' ? 1 : prev + 1))
                                    }
                                >
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-6">
                        <h3 className="font-medium">Amenities</h3>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            <button className="p-2 border rounded flex flex-col items-center hover:bg-gray-100">
                                <FaWifi />
                                <span className="text-sm">Wifi</span>
                            </button>
                            <button className="p-2 border rounded flex flex-col items-center hover:bg-gray-100">
                                <FaSnowflake />
                                <span className="text-sm">Air conditioning</span>
                            </button>
                            <button className="p-2 border rounded flex flex-col items-center hover:bg-gray-100">
                                <FaTshirt />
                                <span className="text-sm">Washer</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        className="text-gray-700 underline hover:text-black"
                        onClick={resetFilters}
                    >
                        Clear all
                    </button>
                    <button
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        onClick={logValues}
                    >
                        Show 1,000+ places
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FiltersModal;