import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HostedListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteListingId, setDeleteListingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchHostedListings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/hosted-listings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the request headers
          },
        }
      );
      setListings(response.data.listings);
    } 
    catch (err) {
      console.error('Error fetching hosted listings:', err);
      setError('Failed to fetch hosted listings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (listingId) => {
    setDeleteListingId(listingId);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/delete-listing/${deleteListingId}`,
        {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setListings(listings.filter((listing) => listing._id !== deleteListingId)); // Remove the deleted listing from the state
      setShowModal(false); // Close the modal after successful deletion
    } catch (err) {
      console.error('Error deleting listing:', err);
      setError('Failed to delete the listing.');
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false); // Close the modal without deleting
  };

  useEffect(() => {
    fetchHostedListings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Hosted Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div
            key={listing._id}
            onClick={() => navigate(`/update-listing/${listing._id}`)}
            className="border rounded-lg p-4 shadow-md bg-white relative"
          >
            <h3 className="text-lg font-semibold">{listing.name}</h3>
            <p className="text-sm text-gray-600">{listing.summary}</p>
            <p className="mt-2 text-blue-500 font-medium">${listing.price} / night</p>
            <button
              onClick={() => handleDeleteClick(listing._id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <p className="mt-6 text-center text-gray-500">You have no hosted listings.</p>
      )}

      {/* Modal for deletion confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold text-center mb-4">Are you sure?</h3>
            <p className="text-center mb-4">Are you sure you want to delete this listing?</p>
            <div className="flex justify-around">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostedListings;
