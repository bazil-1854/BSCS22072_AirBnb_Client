import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [listings, setListings] = useState([]); // Store fetched listings
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Check if more listings are available
  const limit = 10; // Number of listings per page

  const fetchListings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings`,
        {
          params: { page, limit },
        }
      );

      const { listings: newListings, totalPages } = response.data;

      // Update state with new listings
      setListings((prevListings) => [...prevListings, ...newListings]);
      setHasMore(page < totalPages); // Disable "Show More" if no more pages
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchListings(); // Fetch listings on initial render
  }, [page]); // Re-fetch listings when `page` changes

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold">{listing.name}</h3>
            <p className="text-sm text-gray-600">{listing.summary}</p>
            <p className="mt-2 text-blue-500 font-medium">
              ${listing.price} / night
            </p>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={handleShowMore}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Show More
        </button>
      )}

      {!hasMore && (
        <p className="mt-6 text-center text-gray-500">No more listings to show</p>
      )}
    </div>
  );
};

export default Home;



/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import HorizontalScrollList from './HorizontalScrollList';
import SearchBar from './SearchBar';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/listings`);
      setListings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/listing/${id}`);
  };
  const handleSearch = () => {
    navigate('/search');
  };
  const filteredListings = selectedCategory
    ? listings.filter(listing => listing.category === selectedCategory)
    : listings;


  return (
    <div className='mt-[150px] min-h-screen md:mt-[95px]'>
      <SearchBar />

      <div className='top-[60px] w-full bg-white sticky'>
        <HorizontalScrollList setCategory={setSelectedCategory} />
      </div>

      <div className='w-full xl:px-[75px] px-4'>
        <button
          onClick={() => handleSearch()}
          className="bg-white border border-[351515] w-full flex items-center mx-auto space-x-4 text-gray-600 px-4 py-[12px] text-[18px] rounded-[28px] mb-4"
        >
          <FaSearch className='mr-[15px]' /> Search Listings
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4 xl:px-[75px] px-4">
        {filteredListings.map(listing => (
          <div
            key={listing.id}
            onClick={() => handleCardClick(listing.id)}
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

export default Home;
*/