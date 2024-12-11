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
  //const [errorStatus, setErrorSttaus] = useState('');
  const [category, setCategory] = useState('All');
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchListings = async (page, category) => {
    setLoading(true);
    try {
      let url = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings`;
      let params = { page, limit: 10, category };

      if (searchParams) {
        const tempLocation = searchParams.location || 'invalid'
        url = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listing-searched/${searchParams.guests}/${tempLocation}`;
        //console.log(searchParams)
      }
      const response = await axios.get(url, { params });
      const newListings = response.data.listings;

      //console.log(newListings)
      if (page === 1) {
        setListings(newListings);
      }
      else {
        setListings((prev) => [...prev, ...newListings]);
      }
      setHasMore(page < response.data.totalPages);
    }
    catch (err) {
      setError(err)
      //setError('Failed to fetch listings. Please try again later.');
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchListings(1, category);
  }, [category]);

  useEffect(() => {
    fetchListings(currentPage);
  }, [currentPage]);

  const handleSearch = (location, guests) => {
    // Prepare search parameters and reset current page
    //console.log(location)
    //console.log(guests)

    setSearchParams({ location, guests });
    setCurrentPage(1);
    fetchListings(1, category, { location, guests });
  };


  /*const loadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };*/

  const loadMore = () => {
    if (hasMore && !searchParams) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  //if (error.status === 404) return <p className="h-screen bg-green-800 -center text-lg text-red-500">{error}</p>;
  if (error) {
    return (
      <div className='mt-[85px] min-h-screen md:mt-[95px]'>
        <SearchBar handleSearch={handleSearch} />

        <div className='top-[60px] w-full bg-white sticky'>
          <HorizontalScrollList setCategory={setCategory} />
        </div>
        {error.message} {/*error.statusCode && `(Status Code: ${error.statusCode})`*/}
        {error.statusCode &&
          <div>
            No Listings Found with this filter
          </div>
        }
      </div>
    );
  }


  return (
    <div className='mt-[85px] min-h-screen md:mt-[95px]'>
      <SearchBar handleSearch={handleSearch} />

      <div className='top-[60px] w-full bg-white sticky'>
        <HorizontalScrollList setCategory={setCategory} />
      </div>

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
              <div className='w-full flex justify-between'>
                <h2 className="font-semibold text-lg">{listing.address.suburb.substring(0, 8)}, {listing.address.country.substring(0, 8)}</h2>
                {listing.rating > 0 && <p className='flex items-center'>{listing.rating} <FaStar size={18} className="text-yellow-500" /></p>}
              </div>
              <p className="text-rose-600 font-[700] text-[12px]">{listing.property_type}</p>
              <p className="text-gray-500">{listing.category}</p>
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