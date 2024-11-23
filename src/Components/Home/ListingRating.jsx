import React, { useState } from 'react';
import axios from 'axios';

const AddRating = ({ listingId }) => {
  const [rating, setRating] = useState(0);
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
      setRating(0);
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

export default AddRating;
