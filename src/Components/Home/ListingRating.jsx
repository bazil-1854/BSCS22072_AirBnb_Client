import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const FavoriteButton = ({ listingId, isInitiallyFavorited }) => {
    const [isFavorited, setIsFavorited] = useState(isInitiallyFavorited);
    const [error, setError] = useState('');
  
    const toggleFavorite = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings/${listingId}/toggle-favorite`,{}, {
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
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded-md ${
            isFavorited ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
          } hover:opacity-80`}
        >
          {isFavorited ? 'Unfavorite' : 'Favorite'}
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

    return (
        <div className="w-full">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
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
                        <div
                            type="button"
                            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                        >
                            Cancel
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export const Reviews = ({ listingId, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchReviews = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/listing-rating/get-reviews/${listingId}`, {
                params: { page, limit: 5 },
            }
            );

            if (page === 1) {
                setReviews(response.data.reviews);
            }
            else {
                setReviews((prevReviews) => [...prevReviews, ...response.data.reviews]);
            }

            //setReviews((prevReviews) => [...prevReviews, ...response.data.reviews]);
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
        fetchReviews(1); // Fetch the first page of reviews on component mount
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
    );
};
