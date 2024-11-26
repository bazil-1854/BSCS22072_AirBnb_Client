import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const FavoriteListings = () => {
    const navigate = useNavigate();
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
        <div className='bg-gray-100 pt-[115px] min-h-screen justify-center items-center '>
            <div className="max-w-[950px] mx-auto" >
                <h3 className='text-[24px] mb-[15px] text-rose-600 font-[700]'>Favourite Listings</h3>
                <div className='h-[2.5px] bg-rose-600 lg:mb-[55px]'></div>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {listings.map((listing) => (
                        <div
                            key={listing._id}
                            onClick={() => navigate(`/listing/${listing._id}`)}
                            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-300 ease-in-out"
                        >
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <img src={listing.images.placePicture} alt="Connection Error" className='h-[50px] w-[70px] rounded-xl' />
                                    <p className="ml-[8px]">
                                        <span className="text-lg font-semibold">{listing.name}</span> <br />
                                        <span className="text-[12px] mt-[-4px] text-gray-500">{listing.address.suburb}, {listing.address.country}</span>
                                    </p>
                                </div>
                                <button
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                >
                                    <RiDeleteBinLine />
                                </button>
                            </div>
                            <p className="text-[14px] mt-[8px] text-gray-700">{listing.summary}</p>
                            <p className="mt-2 text-[14px] text-green-700 font-medium">${listing.price} /night</p>


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
        </div>
    );
};

export default FavoriteListings;
