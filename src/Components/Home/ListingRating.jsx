import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBookmark, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { div } from 'framer-motion/client';

export const FavoriteButton = ({ listingId, isInitiallyFavorited }) => {
    const [isFavorited, setIsFavorited] = useState(isInitiallyFavorited);
    const [error, setError] = useState('');

    const toggleFavorite = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings/${listingId}/toggle-favorite`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            }
            );

            setIsFavorited(!isFavorited);
        } catch (err) {
            setError('Failed to toggle favorite. Please try again.');
            console.error('Error toggling favorite:', err.response?.data || err.message);
        }
    };

    return (
        <div>
            <button onClick={toggleFavorite} className={`text-[30px] ${isFavorited ? 'text-yellow-400  ' : 'text-gray-400  '} hover:opacity-80`}>
                <FaBookmark />
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};


export const AddRating = ({ listingId }) => {
    const [rating, setRating] = useState(3);
    const [review, setReview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!rating || rating < 1 || rating > 5) {
            setError('Rating must be between 1 and 5.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/listing-rating/add-review`,
                { listingId, rating, review },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Review submitted successfully!');
            setRating(2);
            setReview('');
        } catch (err) {
            console.error('Error submitting review:', err.response?.data || err.message);
            setError('Failed to submit review. Please try again.');
        }
    };
    const handleStarClick = (index) => {
        setRating(index + 1); // Set rating based on star index (1-based)
    };
    return (
        <div className="w-full">
            <div className="bg-white border-t-[3px] border-gray-300 mt-[25px] pt-[15px]">
                <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit}>
                    {/*<div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating (1-5):
                        </label>
                        <input
                            type="number"
                            id="rating"
                            className="border rounded-md w-full p-2"
                            min="1"
                            max="5"
                            step="0.01"
                            value={rating}
                            onChange={(e) => setRating(parseFloat(e.target.value))}
                        />
                    </div>
                    */}
                    <div className="flex items-center">
                        <label className="mr-[10px] text-xl font-semibold">Rating:</label>
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                size={25}
                                key={index}
                                className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                onClick={() => handleStarClick(index)}
                            />
                        ))}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                            Review:
                        </label>
                        <textarea
                            id="review"
                            className="border rounded-md w-full p-2"
                            rows="4"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <div type="button" className="text-[14px] mr-2 px-4 py-[4px] bg-gray-100 text-red-700 rounded-md">
                            Cancel
                        </div>
                        <button type="submit" className="text-[14px] mr-4 px-4 py-[4px] bg-rose-500 text-white rounded-md">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export const Reviews = ({ listingId, ratingReviews, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchReviews = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/listing-rating/get-reviews/${listingId}`, { params: { page, limit: 5 } });

            if (page === 1) {
                setReviews(response.data.reviews);
            }
            else {
                setReviews((prevReviews) => [...prevReviews, ...response.data.reviews]);
            }

            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        }
        catch (err) {
            setError('Failed to fetch reviews. Please try again.');
            console.error('Error fetching reviews:', err.response?.data || err.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews(1);
    }, [listingId]);

    const handleShowMore = () => {
        if (currentPage < totalPages) {
            fetchReviews(currentPage + 1);
        }
    };

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="fixed inset-0 bg-black  bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg overflow-y-auto no-scrollbar lg:overflow-y-hidden h-[90vh] w-full max-w-4xl mx-4 md:mx-auto shadow-lg">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-lg font-semibold">Guest Reviews</h2>
                    <button onClick={onClose}>
                        <AiOutlineClose className="text-xl text-gray-500 hover:text-gray-800" />
                    </button>
                </div>
                <div className="grid lg:grid-cols-5 grid-cols-1 p-4">
                    <div className="lg:col-span-2">
                        <div className='text-center'>
                            <p className='text-[38px] font-[600]'>{ratingReviews.averageRating}</p>
                        </div>
                        <p className="text-sm text-center text-yellow-700 font-[600] underline">Guest favorite</p>
                        <p className='mt-[15px] text-[13px] text-gray-600'>One of the most loved homes on Airbnb based on ratings, reviews, and reliability</p>

                    </div>

                    <div className="lg:col-span-3  mt-[15px]">
                        <h3 className="text-lg font-medium mb-4">{ratingReviews.arraySize} Reviews</h3>
                        <div className='overflow-y-auto mb-[75px] no-scrollbar max-h-[520px]'>

                            {!loading ?
                                <>
                                    {reviews.map((review, index) => (
                                        <div key={index} className="mb-6 p-4 bg-white">
                                            <div className="flex items-center">
                                                {review.user?.profilePicture ?
                                                    <img
                                                        src={review.user.profilePicture}
                                                        alt={`${review.user.name}'s profile`}
                                                        className="w-10 h-10 rounded-full mr-4"
                                                    />
                                                    :
                                                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                                                }
                                                <div>
                                                    <h4 className="text-[15px] font-medium">{review.user?.username || 'Anonymous'}</h4>
                                                </div>
                                            </div>
                                            <div className='flex my-[4px] items-center'>
                                                <div className='flex'>
                                                    {[...Array(Math.floor(review.rating))].map((_, index) => (
                                                        <FaStar size={15} key={`full-${index}`} className="text-yellow-500" />
                                                    ))}
                                                    {(review.rating % 1 >= 0.5) && (
                                                        <FaStarHalfAlt size={15} key="half" className="text-yellow-500" />
                                                    )}
                                                    {[...Array(5 - (Math.floor(review.rating)) - ((review.rating % 1 >= 0.5) ? 1 : 0))].map((_, index) => (
                                                        <FaStar size={15} key={`empty-${index}`} className="text-gray-300" />
                                                    ))}
                                                </div>
                                                <p className="text-sm ml-[15px] mb-[3px] text-gray-500">
                                                    {(() => {
                                                        const reviewDate = new Date(review.date);
                                                        const now = new Date();
                                                        const timeDiff = now - reviewDate; // Difference in milliseconds

                                                        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                                                        const months = Math.floor(days / 30);
                                                        const years = Math.floor(days / 365);

                                                        if (years >= 1) {
                                                            return `${years} year${years > 1 ? 's' : ''} ago`;
                                                        } else if (months >= 1) {
                                                            return `${months} month${months > 1 ? 's' : ''} ago`;
                                                        } else {
                                                            return `${days} day${days > 1 ? 's' : ''} ago`;
                                                        }
                                                    })()}
                                                </p>
                                                {/*<p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>*/}
                                            </div>
                                            <div>
                                                <p className="mt-2 text-gray-700">{review.review}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {currentPage < totalPages && !loading && (
                                        <div className=" mt-6">
                                            <button
                                                onClick={handleShowMore}
                                                className="px-4 py-[6px] text-[13px] bg-rose-600 text-white rounded-md hover:bg-rose-900"
                                            >
                                                Show More
                                            </button>
                                        </div>
                                    )}
                                </>
                                :
                                <p>loading ........</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/*
<div className="fixed inset-0 h-screen w-screen z-[999] bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white h-[80vh] w-[550px] overflow-y-auto rounded-lg p-6 shadow-lg">
                <button
                    type="button"
                    className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    onClick={onClose}
                >
                    Close
                </button>
                <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
                {reviews.map((review, index) => (
                    <div key={index} className="mb-6 p-4 bg-white shadow-md rounded-md">
                        <div className="flex items-center">
                            {review.user?.profilePicture ? (
                                <img
                                    src={review.user.profilePicture}
                                    alt={`${review.user.name}'s profile`}
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                            )}
                            <div>
                                <h4 className="text-lg font-medium">{review.user?.name || 'Anonymous'}</h4>
                                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-800">
                                <strong>Rating:</strong> {review.rating.toFixed(2)} / 5
                            </p>
                            <p className="mt-2 text-gray-700">{review.review}</p>
                        </div>
                    </div>
                ))}
                {loading && <div className="text-center mt-4">Loading...</div>}
                {currentPage < totalPages && !loading && (
                    <div className="text-center mt-6">
                        <button
                            onClick={handleShowMore}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
*/