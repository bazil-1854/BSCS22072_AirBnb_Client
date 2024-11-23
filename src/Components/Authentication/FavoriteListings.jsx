import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteListings = () => {
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchListings();
    }, [currentPage]);

    const fetchListings = async () => {
        try {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/guest-favourites?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${token}` },
            }
            );

            if (currentPage === 1) {
                setListings(response.data.listings);
            }
            else {
                setListings((prev) => [...prev, ...response.data.listings]);
            }

            //setListings((prev) => [...prev, ...response.data.listings]);

            setTotalPages(response.data.totalPages);
        }
        catch (err) {
            setError('Failed to fetch favorite listings. Please try again.');
            console.error(err.response?.data || err.message);
        }
        finally {
            setLoading(false);
        }
    };

    const handleShowMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 mt-[250px]">
            <h1 className="text-2xl font-semibold text-center mb-6">Your Favorite Listings</h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {listings.map((listing) => (
                    <div
                        key={listing._id}
                        className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-300 ease-in-out"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{listing.name}</h2>
                        <p className="text-sm text-gray-600">{listing.address.street}</p>
                        <p className="text-sm text-gray-600">${listing.price} per night</p>
                        <img src={listing.images[0]} alt={listing.name} className="w-full h-40 object-cover rounded mt-2" />
                    </div>
                ))}
            </div>
            {currentPage < totalPages && (
                <div className="text-center mt-6">
                    <button
                        onClick={handleShowMore}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Show More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FavoriteListings;
