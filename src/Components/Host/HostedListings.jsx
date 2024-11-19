import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HostedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    } catch (err) {
      console.error('Error fetching hosted listings:', err);
      setError('Failed to fetch hosted listings.');
    } finally {
      setLoading(false);
    }
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
          <div key={listing._id} className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-lg font-semibold">{listing.name}</h3>
            <p className="text-sm text-gray-600">{listing.summary}</p>
            <p className="mt-2 text-blue-500 font-medium">
              ${listing.price} / night
            </p>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <p className="mt-6 text-center text-gray-500">You have no hosted listings.</p>
      )}
    </div>
  );
};

export default HostedListings;
