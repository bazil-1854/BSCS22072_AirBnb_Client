import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import HorizontalScrollList from './HorizontalScrollList';

const Home = () => {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchListings = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings`, { params: { page, limit: 10 } });
      const newListings = response.data.listings;

      if (page === 1) {
        setListings(newListings);
      } else {
        setListings((prev) => [...prev, ...newListings]);
      }
      setHasMore(page < response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch listings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(currentPage);
  }, [currentPage]);

  const loadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className='mt-[150px] min-h-screen md:mt-[95px]'>
      <SearchBar />
      <HorizontalScrollList />
      {
        /*
        <div className='top-[60px] w-full bg-white sticky'>
        <HorizontalScrollList setCategory={setSelectedCategory} />
      </div>
        */
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4 xl:px-[75px] pb-[45px] px-4">
        {listings.map(listing => (
          <div
            key={listing._id}
            onClick={() => navigate(`/listing/${listing._id}`)}
            className="overflow-hidden mt-[15px] cursor-pointer"
          >
            <img
              src={listing.images.placePicture || 'https://via.placeholder.com/300'}
              alt={listing.name}
              loading='lazy'
              className="m-2 h-[290px] lg:h-[230px] xl:h-[240px] w-[95%] border rounded-xl hover:shadow-xl transition duration-200"
            />
            <div className="px-4">
              <h2 className="font-semibold text-lg">{listing.address.suburb}, {listing.address.country}</h2>
              <p className="text-rose-600 font-[700] text-[12px]">{listing.property_type}</p>              <p className="text-gray-500">{listing.category}</p> 
              <p className="font-bold text-[14px] mt-[6px]">${listing.price} / night</p>
             {
              /*
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
              */
             }
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="text-rose-500 font-[600] py-2 px-4 rounded hover:bg-text-600 underline mb-[25px] transition"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
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