import React, { useState } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchListings = () => {
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setResults([]);
        try {
            const response = await axios.get('http://localhost:3001/api/search', {
                params: { type, title, category }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="mt-[150px] min-h-screen md:mt-[110px]  xl:px-[75px] px-4">
            <h2 className="text-[24px] lg:text-[30px] underline  font-[700] mb-[8px] text-rose-500 tracking-wide">
                Search Listings
            </h2>
            <p className="text-base mb-6 text-gray-600">
                Search by <span className="font-semibold text-blue-600">type</span>, <span className="font-semibold text-blue-600">title</span>, or <span className="font-semibold text-blue-600">category</span>. Only one field is required.
            </p>

            <form onSubmit={handleSearch} className="w-full flex flex-col lg:flex-row items-center bg-white border-[2px] border-gray-200 rounded-[45px] shadow-md mx-auto gap-4 p-4">
                <div className="relative flex flex-col py-[10px] rounded-[45px] px-[35px] w-full lg:w-1/3 hover:bg-gray-100 transition group">
                    <label className="text-[12px] font-[700] mb-[-2px] text-gray-600">Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="outline-none focus:none w-full mt-[6px] group-hover:bg-gray-100 transition duration-200"
                        placeholder="Type (optional)"
                    />
                </div>

                <div className="relative flex flex-col py-[10px] rounded-[45px] px-[35px] w-full lg:w-1/3 hover:bg-gray-100 transition group">
                    <label className="text-[12px] font-[700] mb-[-2px] text-gray-600">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="outline-none focus:none w-full mt-[6px] group-hover:bg-gray-100 transition duration-200"
                        placeholder="Title (optional)"
                    />
                </div>

                <div className="relative flex flex-col py-[10px] rounded-[45px] px-[35px] w-full lg:w-1/3 hover:bg-gray-100 transition group">
                    <label className="text-[12px] font-[700] mb-[-2px] text-gray-600">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none focus:none w-full mt-[6px] group-hover:bg-gray-100 transition duration-200"

                        placeholder="Category (optional)"
                    />
                </div>

                <button type="submit" className=" bg-red-500 ml-[85px] mr-[35px] text-white text-[22px] p-[10px] rounded-full hover:bg-red-600 transition duration-200">
                    <AiOutlineSearch />
                </button>
            </form>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                {results.map(listing => (
                    <div
                        key={listing.id}
                        onClick={() => window.location.href = `/listing/${listing.id}`}
                        className="overflow-hidden cursor-pointer"
                    >
                        <img
                            src={listing.image}
                            loading='lazy'
                            alt={listing.title}
                            className="m-2 h-[290px] w-[95%] border rounded-xl hover:shadow-xl transition duration-200"
                        />
                        <div className="p-4">
                            <h2 className="font-semibold text-lg">{listing.title}</h2>
                            <p className="text-gray-500">{listing.type}</p>
                            <p className="text-gray-500">{listing.category}</p>
                            <p className="text-gray-700">Guests: {listing.guests}</p>
                            <p className="font-bold text-lg">${listing.price} / night</p>
                            <div className="flex">
                                {[...Array(Math.floor(listing.rating))].map((_, index) => (
                                    <FaStar
                                        size={22}
                                        key={`full-${index}`}
                                        className="text-yellow-500"
                                    />
                                ))}
                                {(listing.rating % 1 >= 0.5) && (
                                    <FaStarHalfAlt
                                        size={22}
                                        key="half"
                                        className="text-yellow-500"
                                    />
                                )}
                                {[...Array(5 - (Math.floor(listing.rating)) - ((listing.rating % 1 >= 0.5) ? 1 : 0))].map((_, index) => (
                                    <FaStar
                                        size={22}
                                        key={`empty-${index}`}
                                        className="text-gray-300"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default SearchListings;
