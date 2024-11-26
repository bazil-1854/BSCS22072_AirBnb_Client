import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';

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
        {
          headers: {
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
    <div className='bg-gray-100 pt-[90px] min-h-screen justify-center items-center '>
      <div className="max-w-[950px] mx-auto" >
        <h3 className='text-[24px] mb-[15px] text-rose-600 font-[700] xl:mb-[55px] text-center'>Your Property Listings</h3>
        <div className=" xl:scale-[1.1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {listings.map((listing) => (
            <div
              key={listing._id}
              onClick={() => navigate(`/update-listing/${listing._id}`)}
              className="border rounded-lg px-[25px] py-8 shadow-sm bg-white relative"
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <img src={listing.images.placePicture} alt="Connection Error" className='h-[50px] w-[50px] rounded-xl' />
                  <p className="ml-[8px]">
                    <span className="text-lg font-semibold">{listing.name}</span> <br />
                    <span className="text-[12px] mt-[-4px] text-gray-500">{listing.address.suburb}, {listing.address.country}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteClick(listing._id)}
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
    </div>
  );
};

export default HostedListings;
