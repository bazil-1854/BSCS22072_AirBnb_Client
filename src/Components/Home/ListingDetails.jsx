
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaMedal, FaHome, FaDoorOpen, FaToilet } from 'react-icons/fa';
import { AddRating, FavoriteButton, Reviews } from './ListingRating';

const ListingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isInitiallyFavorited, setIsInitiallyFavorited] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        setListing(response.data.listing);
        setIsInitiallyFavorited(response.data.isLiked);
        setLoading(false);
      }
      catch (err) {
        console.error(err);
        setError('Failed to fetch listing details');
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  const handleBooking = (id) => {
    navigate(`/booking/${listing.hostID}/${id}`);
  };

  return (
    <div className="w-full overflow-x-hidden xl:px-[180px] min-h-screen p-6 bg-white">
      <div className='mt-[150px] grid w-full overflow-hidden gap-[6px] grid-cols-5 rounded-[25px]'>
        <div className="col-span-5 h-[430px] md:col-span-3">
          <img
            src={listing.images.coverPicture}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className='hidden h-[430px] col-span-2 md:grid grid-cols-2 grid-rows-2 gap-[6px]'>
          {listing.images.additionalPictures.map((url, index) => (
            <div key={index} className="flex items-center justify-center h-full">
              <img src={url} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
            </div>

          ))}
        </div>
      </div>
      <div className="container mx-auto p-4 space-y-6 md:space-y-8 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
        <div className="lg:col-span-2 space-y-4">
          <div className='flex justify-between items-center'>
            <div>
              <h2 className="text-2xl font-semibold">{listing.name}</h2>
              <p className="text-gray-600">1 bed · Shared bathroom</p>
            </div>
            <FavoriteButton listingId={id} isInitiallyFavorited={isInitiallyFavorited} />
          </div>

          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-yellow-500">🏆</span>
              <p>Guest favorite</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-yellow-500">🏅</span>
              <p>One of the most loved homes on Airbnb, according to guests</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <p className="font-semibold">4.96</p>
              <span>⭐</span>
              <p className="text-gray-600">(124 Reviews)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200">
              <div className='h-full w-full rounded-full bg-gray-600'></div>
            </div>
            <div>
              <p className="font-semibold">Host</p>
              <p className="text-gray-500 text-sm">Superhost · 3 years hosting</p>
            </div>
          </div>

          <div className="">
            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaMedal className="text-yellow-500 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Top 5% of homes</p>
                <p className="text-gray-700">This home is highly ranked based on ratings, reviews, and reliability.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaHome className="text-gray-700 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Room in a casa particular</p>
                <p className="text-gray-700">Your own room in a home, plus access to shared spaces.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaDoorOpen className="text-gray-700 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Shared common spaces</p>
                <p className="text-gray-700">You'll share parts of the home with the Host.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaToilet className="text-gray-700 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Shared bathroom</p>
                <p className="text-gray-700">You'll share the bathroom with others.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg">About this place</h3>
            <p className="text-sm text-gray-600">
              {listing.summary}
            </p>

          </div>


          <AddRating listingId={id} />
          <button onClick={() => setShowModal(true)} className="bg-green-500 px-4 py-2 text-white">
            See Review
          </button>
          {showModal && <Reviews listingId={id} onClose={() => setShowModal(false)} />}

        </div>

        <div className="space-y-4">
          <div className="border bg-white shadow-lg rounded-lg py-[30px] px-4 border-[#e7e7e7] space-y-[18px]">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold">$111</p>
              <p className="text-sm text-gray-600 font-[600]">/ night</p>
            </div>

            <div className="border border-[#818181] rounded-lg py-4 w-full max-w-sm">
              <div className="grid grid-cols-2 px-[15px] border-b border-[#818181] pb-4 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">CHECK-IN</p>
                  <p className="text-sm font-medium text-gray-800">6/25/2025</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">CHECKOUT</p>
                  <p className="text-sm font-medium text-gray-800">7/4/2025</p>
                </div>
              </div>
              <div className="px-4 pt-4 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">GUESTS</p>
                  <p className="text-sm font-medium text-gray-800">2 guests</p>
                </div>
                <span className="text-gray-500">▼</span>
              </div>
            </div>


            <button onClick={() => handleBooking(id)} className="w-full py-2 bg-gradient-to-r from-pink-600 to-pink-800 text-white font-semibold rounded-lg">
              Reserve
            </button>

            <p className="text-center text-gray-600 font-[500] text-[15px]">You won't be charged yet</p>

            <div className="space-y-1 text-gray-600 font-[500] underline text-[15px]">
              <div className="flex justify-between">
                <p>$111 x 5 nights</p>
                <p>$554</p>
              </div>
              <div className="flex justify-between">
                <p>Cleaning fee</p>
                <p>$29</p>
              </div>
              <div className="flex justify-between">
                <p>Airbnb service fee</p>
                <p>$89</p>
              </div>
            </div>
            <div className='mx-auto h-[2px] bg-gray-300'></div>
            <div className="flex justify-between font-semibold">
              <p>Total before taxes</p>
              <p>$672</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 shadow-sm">
            <p className="text-pink-800 font-semibold">This is a rare find</p>
            <p className="text-sm text-gray-600">Bo's place is usually fully booked.</p>
          </div>

          <div className="text-center">
            <button className="text-sm text-gray-500 underline">Report this listing</button>
          </div>
        </div>
      </div>

      {/*
    
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
        <p className="text-gray-700 mb-4">{listing.type}</p>
        <p className="text-lg font-semibold text-blue-600 mb-4">${listing.price} per night</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 mr-2">★</span>
          <span className="text-gray-700">{listing.rating}</span>
        </div>
        <p className="text-gray-700">Guests: {listing.guests}</p>
        <p className="text-gray-700">Category: {listing.category}</p>
      </div>*/}
    </div>
  );
};

export default ListingDetails;

/*
<div className="max-w-4xl mx-auto p-6 bg-yellow rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{listing.name}</h1>
        <p className="text-gray-600">{listing.summary}</p>
        <div className="mt-4">
          <strong>Property Type:</strong> {listing.property_type}
        </div>
        <div className="mt-4">
          <strong>Price:</strong> ${listing.price} per night
        </div>
        <div className="mt-4">
          <strong>Bedrooms:</strong> {listing.bedrooms}, <strong>Bathrooms:</strong> {listing.bathrooms}
        </div>
        <div className="mt-4">
          <strong>Address:</strong> {listing.address.street}, {listing.address.suburb}, {listing.address.country}
        </div>
        <div className="mt-4">
          <strong>Amenities:</strong>
          <ul className="list-disc pl-5">
            {listing.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <strong>Images:</strong>
          <div className="flex space-x-4 mt-2">
            {listing.images.placePicture && (
              <img src={listing.images.placePicture} alt="Place" className="w-32 h-32 object-cover" />
            )}
            {listing.images.coverPicture && (
              <img src={listing.images.coverPicture} alt="Cover" className="w-32 h-32 object-cover" />
            )}
            {listing.images.additionalPictures.map((url, index) => (
              <img key={index} src={url} alt={`Additional ${index + 1}`} className="w-32 h-32 object-cover" />
            ))}
          </div>
        </div>
      </div>
*/

/*import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaMedal, FaHome, FaDoorOpen, FaToilet } from 'react-icons/fa';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };
    fetchListing();
  }, [id]);

  const handleBooking = (id) => {
    navigate(`/booking/${id}`);
  };

  if (!listing) return <div className="mt-[150px] xl:px-[180px] min-h-screen mx-auto p-6 bg-white">Loading...</div>;

  return (
    <div className="mt-[150px] xl:px-[180px] min-h-screen mx-auto p-6 bg-white">
      <div className='grid w-full overflow-hidden gap-[6px] grid-cols-5 rounded-[25px]'>
        <div className="col-span-5 h-[430px] md:col-span-3">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className='hidden h-[430px] col-span-2 md:grid grid-cols-2 grid-rows-2 gap-[6px]'>
          <div className="flex items-center justify-center h-full">
            <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center justify-center h-full">
            <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center justify-center h-full">
            <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center justify-center h-full">
            <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 space-y-6 md:space-y-8 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{listing.title}</h2>
            <p className="text-gray-600">1 bed · Shared bathroom</p>
          </div>

          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-yellow-500">🏆</span>
              <p>Guest favorite</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-yellow-500">🏅</span>
              <p>One of the most loved homes on Airbnb, according to guests</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <p className="font-semibold">4.96</p>
              <span>⭐</span>
              <p className="text-gray-600">(124 Reviews)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200">
              <div className='h-full w-full rounded-full bg-gray-600'></div>
            </div>
            <div>
              <p className="font-semibold">Host</p>
              <p className="text-gray-500 text-sm">Superhost · 3 years hosting</p>
            </div>
          </div>

          <div className="">
            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaMedal className="text-yellow-500 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Top 5% of homes</p>
                <p className="text-gray-700">This home is highly ranked based on ratings, reviews, and reliability.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaHome className="text-gray-700 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Room in a casa particular</p>
                <p className="text-gray-700">Your own room in a home, plus access to shared spaces.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaDoorOpen className="text-gray-700 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Shared common spaces</p>
                <p className="text-gray-700">You'll share parts of the home with the Host.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaToilet className="text-gray-700 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Shared bathroom</p>
                <p className="text-gray-700">You'll share the bathroom with others.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg">About this place</h3>
            <p className="text-sm text-gray-600">
              Inner City - Private room in a prestigious area with double bed and double closet in spacious apartment in Store Kongesgade.
              2 mins away from Queens Palace, Nyhavn and Konges Nytorv. Metro 2 mins away (Marmorkirken). The apartment is close to all
              top restaurants and high-street shops. Perfect for 1 or 2 people. Flat is 170 SQM and you have access to all areas including
              1 toilet...
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border bg-white shadow-lg rounded-lg py-[30px] px-4 border-[#e7e7e7] space-y-[18px]">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold">$111</p>
              <p className="text-sm text-gray-600 font-[600]">/ night</p>
            </div>

            <div className="border border-[#818181] rounded-lg py-4 w-full max-w-sm">
              <div className="grid grid-cols-2 px-[15px] border-b border-[#818181] pb-4 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">CHECK-IN</p>
                  <p className="text-sm font-medium text-gray-800">6/25/2025</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">CHECKOUT</p>
                  <p className="text-sm font-medium text-gray-800">7/4/2025</p>
                </div>
              </div>
              <div className="px-4 pt-4 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">GUESTS</p>
                  <p className="text-sm font-medium text-gray-800">2 guests</p>
                </div>
                <span className="text-gray-500">▼</span>
              </div>
            </div>


            <button onClick={() => handleBooking(id)} className="w-full py-2 bg-gradient-to-r from-pink-600 to-pink-800 text-white font-semibold rounded-lg">
              Reserve
            </button>

            <p className="text-center text-gray-600 font-[500] text-[15px]">You won't be charged yet</p>

            <div className="space-y-1 text-gray-600 font-[500] underline text-[15px]">
              <div className="flex justify-between">
                <p>$111 x 5 nights</p>
                <p>$554</p>
              </div>
              <div className="flex justify-between">
                <p>Cleaning fee</p>
                <p>$29</p>
              </div>
              <div className="flex justify-between">
                <p>Airbnb service fee</p>
                <p>$89</p>
              </div>
            </div>
            <div className='mx-auto h-[2px] bg-gray-300'></div>
            <div className="flex justify-between font-semibold">
              <p>Total before taxes</p>
              <p>$672</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 shadow-sm">
            <p className="text-pink-800 font-semibold">This is a rare find</p>
            <p className="text-sm text-gray-600">Bo's place is usually fully booked.</p>
          </div>

          <div className="text-center">
            <button className="text-sm text-gray-500 underline">Report this listing</button>
          </div>
        </div>
      </div>

      
      // idhr wala commented he 
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
        <p className="text-gray-700 mb-4">{listing.type}</p>
        <p className="text-lg font-semibold text-blue-600 mb-4">${listing.price} per night</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 mr-2">★</span>
          <span className="text-gray-700">{listing.rating}</span>
        </div>
        <p className="text-gray-700">Guests: {listing.guests}</p>
        <p className="text-gray-700">Category: {listing.category}</p>
      </div>
    </div>
  );
};

export default ListingDetails;
*/