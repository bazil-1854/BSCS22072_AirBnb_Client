import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useAuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const SearchListings = () => {
    const navigate = useNavigate()
    const { searchfilters } = useAuthContext();
    const [results, setResults] = useState([]); 
    const [displayedResults, setDisplayedResults] = useState([]); // Paginated results
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const resultsPerPage = 1; // Number of results per page (change to 10, etc., as needed)

    // Fetch listings based on filters on component load
    useEffect(() => {
        const fetchListings = async () => {
            try {
                console.log(searchfilters)
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/filtered-listings`, searchfilters);

                setResults(response.data); // Full results
                console.log(response.data)
                setDisplayedResults(response.data.data.slice(0, resultsPerPage)); // Initial results
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, [searchfilters]);

    // Function to load more results
    const loadMoreResults = () => {
        const nextPage = currentPage + 1;
        const start = currentPage * resultsPerPage;
        const end = start + resultsPerPage;

        setDisplayedResults([...displayedResults, ...results.slice(start, end)]);
        setCurrentPage(nextPage);
    };

    return (
        <div className="mt-[150px] min-h-screen md:mt-[110px] xl:px-[75px] px-4">
            <h2 className="text-[24px] lg:text-[30px] underline font-[700] mb-[8px] text-rose-500 tracking-wide">
                Search Listings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                {displayedResults.map(listing => (
                    <div
                        key={listing.id}
                        onClick={() => navigate(`/listing/${listing._id}`)}
                        className="overflow-hidden cursor-pointer"
                    >
                        <img
                            src={listing.image}
                            loading="lazy"
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
                                {[...Array(5 - Math.floor(listing.rating) - ((listing.rating % 1 >= 0.5) ? 1 : 0))].map((_, index) => (
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

            {/* Show More Button */}
            {displayedResults.length < results.length && (
                <div className="text-center mt-6">
                    <button
                        onClick={loadMoreResults}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchListings;
