import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './react-theme.css';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { FaStar, FaShieldAlt, FaInfoCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { BsCircle, BsCheckCircle } from "react-icons/bs";

const Booking = () => {
    const { listingId, hostId } = useParams();
    const location = useLocation();
    const { listing, ratingReviews } = location.state || {};
    const [blockedDates, setBlockedDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState({ checkIn: null, checkOut: null });
    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
    //const [totalAmount, setTotalAmount] = useState(0);

    const [specialRequests, setSpecialRequests] = useState('');
    const [message, setMessage] = useState('');
    const totalAmount = listing.price;

    const [numberOfDays, setNumberOfDays] = useState(null);

    useEffect(() => {
        const fetchBlockedDates = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/get-reserved-bookings/${listingId}`);
                const dates = response.data.blockedDates.map((date) => new Date(date));
                setBlockedDates(dates);
            }
            catch (err) {
                console.error('Error fetching blocked dates:', err.response?.data || err.message);
            }
        };

        fetchBlockedDates();
    }, [listingId]);

    useEffect(() => {
        if (selectedDates.checkIn && selectedDates.checkOut) {
            const checkInDate = new Date(selectedDates.checkIn);
            const checkOutDate = new Date(selectedDates.checkOut);
            const timeDifference = checkOutDate - checkInDate;

            if (timeDifference >= 0) {
                const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                setNumberOfDays(daysDifference);
            }
            else {
                setNumberOfDays(0);
            }
        }
        else {
            setNumberOfDays(null);
        }
    }, [selectedDates]);

    const handleDateChange = (date) => {
        if (!selectedDates.checkIn || (selectedDates.checkIn && selectedDates.checkOut)) {
            setSelectedDates({ checkIn: date, checkOut: null });
        }
        else {
            if (date > selectedDates.checkIn) {
                setSelectedDates({ ...selectedDates, checkOut: date });
            }
            else {
                alert('Check-Out date must be after Check-In date.');
            }
        }
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            return blockedDates.some(
                (blockedDate) => blockedDate.toDateString() === date.toDateString()
            );
        }
        return false;
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            return blockedDates.some(
                (blockedDate) => blockedDate.toDateString() === date.toDateString()
            ) ? 'reserved-date' : '';
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!selectedDates.checkIn || !selectedDates.checkOut) {
            alert('Please select both Check-In and Check-Out dates.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/create-booking`,
                {
                    listingId,
                    checkIn: selectedDates.checkIn,
                    checkOut: selectedDates.checkOut,
                    guests,
                    totalAmount,
                    hostId,
                    specialRequests,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage('Booking created successfully!');
            console.log(response.data);
        }
        catch (err) {
            console.error('Error creating booking:', err.response?.data || err.message);
            setMessage('Failed to create booking. Please try again.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row my-[120px] justify-between max-w-6xl mx-auto p-4 space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 space-y-6">
                <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                    <h2 className="text-lg font-semibold">Request to book</h2>
                    <p className="text-pink-600 flex items-center space-x-2">
                        <FaShieldAlt />
                        <span>This is a rare find. Bo's place is usually booked.</span>
                    </p>
                </div>
                <Calendar
                    onChange={handleDateChange}
                    value={[selectedDates.checkIn, selectedDates.checkOut]}
                    tileDisabled={tileDisabled}
                    tileClassName={tileClassName}
                    selectRange={false}
                />
                <div className="space-y-4">

                    <div className='p-[15px] bg-gray-50 border border-gray-300 rounded-lg'>
                        <div className="flex justify-between items-center border-b pb-2">
                            <p className="text-sm text-gray-500">Date</p>
                            <MdEdit className="text-gray-500 cursor-pointer" />
                        </div>

                        <div>
                            <div className='flex items-center font-[600] text-rose-800 px-[8px] border-b-[3px] border-gray-200 pb-[7px] justify-between'>
                                <p>Check-In</p>
                                <p>Check-Out</p>
                            </div>

                            <div className='flex mt-[15px] items-center font-[600] text-gray-900 px-[8px] pb-[7px] justify-between'>
                                {selectedDates.checkIn && <p>{selectedDates.checkIn.toDateString()}</p>}
                                {selectedDates.checkOut && <p>{selectedDates.checkOut.toDateString()}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Guests</p>
                            <p className='text-rose-700 font-[600]'>{(guests.adults + guests.children + guests.infants) || '0'} guests</p>
                        </div>
                        <MdEdit className="text-gray-500 cursor-pointer" />
                    </div>

                    <div className="border rounded-lg p-4 space-y-2">

                        <label className="text-sm text-gray-500">Enter Number of Adults:</label>
                        <input
                            type="number"
                            placeholder="Enter Number of Adults"
                            value={guests.adults}
                            onChange={(e) => setGuests({ ...guests, adults: parseInt(e.target.value, 10) })}
                            className="w-full border rounded-md p-2"
                        />
                        <label className="text-sm text-gray-500">Enter Number of Children:</label>

                        <input
                            type="number"
                            placeholder="Enter Number of children"
                            value={guests.children}
                            onChange={(e) => setGuests({ ...guests, children: parseInt(e.target.value, 10) })}
                            className="w-full border rounded-md p-2"
                        />
                        <label className="text-sm text-gray-500">Enter Number of Infant:</label>

                        <input
                            type="number"
                            placeholder="Enter your phone number"
                            value={guests.infants}
                            onChange={(e) => setGuests({ ...guests, infants: parseInt(e.target.value, 10) })}
                            className="w-full border rounded-md p-2"
                        />
                    </div>

                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Choose how to pay</h3>
                    <div className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-start space-x-2">
                            <BsCheckCircle className="text-black mt-1 cursor-pointer" />
                            <div>
                                <p>Pay $1,208.81 now</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-2">
                            <BsCircle className="text-gray-500 mt-1 cursor-pointer" />
                            <div>
                                <p>Pay part now, part later</p>
                                <p className="text-gray-500 text-sm">$604.41 due today, $604.40 on Jun 16, 2025. No extra fees. <FaInfoCircle className="inline text-gray-500 cursor-pointer" /></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="border rounded-lg p-4 space-y-2">
                        <label className="text-sm text-gray-500">Special Requests</label>
                        <textarea
                            type="text"
                            placeholder="Enter Your Request ..."
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full border focus:border-none no-scrollbar rounded-md px-2 pt-2 pb-[150px]"
                        />
                    </div>
                    <h3 className="text-lg font-semibold">Log in or sign up to book</h3>
                    <div className="border rounded-lg p-4 space-y-2">
                        <label className="text-sm text-gray-500">Country code</label>
                        <select className="w-full border rounded-md p-2">
                            <option>Pakistan (+92)</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Enter your phone number"
                            value={guests.children}
                            onChange={(e) => setGuests({ ...guests, adults: parseInt(e.target.value, 10) })}
                            className="w-full border rounded-md p-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">We’ll call or text you to confirm your number. Standard message and data rates apply. <p className="text-blue-500 underline">Privacy Policy</p></p>
                    </div>
                    {numberOfDays !== null ?
                        <button onClick={handleBooking} className="w-full py-3 bg-gradient-to-r from-pink-700 to-pink-900 text-white font-semibold rounded-lg" >
                            Continue
                        </button> :
                        <button onClick={handleBooking} disabled className="w-full py-3 bg-rose-400 text-white font-semibold rounded-lg" >
                            Continue
                        </button>}
                </div>
            </div>

            <div className="flex-1 md:max-w-md space-y-4 ">
                {listing && (
                    <>
                        <div className='flex items-center border rounded-lg p-4 bg-gray-50'>
                            <img
                                src={listing.images.coverPicture}
                                alt={listing.name}
                                className="w-[75px] h-[75px] rounded-lg mr-[15px]"
                            />
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">{listing.name}</h3>
                                <div className="flex items-center space-x-2">
                                    <FaStar className="text-yellow-500" />
                                    <p>{ratingReviews.averageRating || ''} <FaShieldAlt className="inline" /> {listing.property_type}</p>
                                </div>
                                <div className="text-sm text-gray-500">{listing.address.suburb}, {listing.address.country} </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                            <h3 className="text-lg font-semibold">Price details</h3>
                            <div className="flex justify-between">
                                <p>${listing.price} x 9 nights</p>
                                <p>${listing.price * 9}</p>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <p>Weekly stay discount</p>
                                <p>-$113.28</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Cleaning fee</p>
                                <p>$29.16</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Airbnb service fee</p>
                                <p>$160.03</p>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold">
                                <p>Total (USD)</p>
                                <p>${(listing.price * 9) + 160 + 29 - 113}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Booking;
/*
  <div className='mt-[250px]'>
            <h3>Select Booking Dates</h3>
            <Calendar
                onChange={handleDateChange}
                value={[selectedDates.checkIn, selectedDates.checkOut]}
                tileDisabled={tileDisabled}
                tileClassName={tileClassName}
                selectRange={false}
            />
            <p>{listing.price}</p>
            <p>{listing.property_type}</p>
            <div>
                {selectedDates.checkIn && <p>Check-In: {selectedDates.checkIn.toDateString()}</p>}
                {selectedDates.checkOut && <p>Check-Out: {selectedDates.checkOut.toDateString()}</p>}
            </div>
            <form onSubmit={handleBooking}>
                <div>
                    <label>Adults:</label>
                    <input
                        type="number"
                        value={guests.adults}
                        onChange={(e) => setGuests({ ...guests, adults: parseInt(e.target.value, 10) })}
                        required
                    />
                </div>
                <div>
                    <label>Children:</label>
                    <input
                        type="number"
                        value={guests.children}
                        onChange={(e) => setGuests({ ...guests, children: parseInt(e.target.value, 10) })}
                    />
                </div>
                <div>
                    <label>Infants:</label>
                    <input
                        type="number"
                        value={guests.infants}
                        onChange={(e) => setGuests({ ...guests, infants: parseInt(e.target.value, 10) })}
                    />
                </div>
                <div>
                    <label>Total Amount:</label>
                    <input
                        type="number"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Special Requests:</label>
                    <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                </div>
                <button type="submit">Create Booking</button>
            </form>
            {message && <p>{message}</p>}
        </div>
*/

/*import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import BookingDatePicker from './BookingDatePicker';


const Booking = () => {
    //const [listingId, setListingID] = useState('');
    const { listingId } = useParams();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
    const [totalAmount, setTotalAmount] = useState(0);
    const [specialRequests, setSpecialRequests] = useState('');
    const [message, setMessage] = useState('');

    const handleBooking = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            //`${import.meta.env.VITE_REACT_APP_API_BASE_URL}'/air-bnb/reservation/create-booking`, {

            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/create-booking`, {
                listingId,
                checkIn,
                checkOut,
                guests,
                totalAmount,
                specialRequests,
            }, {
                headers: { Authorization: `Bearer ${token}`, },
            }
            );

            setMessage('Booking created successfully!');
            console.log(response.data);
        } catch (err) {
            console.error('Error creating booking:', err.response?.data || err.message);
            setMessage('Failed to create booking. Please try again.');
        }
    };

    return (
        <div className='mt-[335px]'>
            <BookingDatePicker listingID={listingId}/>
            <h1>Create Booking</h1>
            <form onSubmit={handleBooking}>
                <div>
                    <label>Check-In Date:</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Check-Out Date:</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Adults:</label>
                    <input
                        type="number"
                        value={guests.adults}
                        onChange={(e) => setGuests({ ...guests, adults: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Children:</label>
                    <input
                        type="number"
                        value={guests.children}
                        onChange={(e) => setGuests({ ...guests, children: e.target.value })}
                    />
                </div>
                <div>
                    <label>Infants:</label>
                    <input
                        type="number"
                        value={guests.infants}
                        onChange={(e) => setGuests({ ...guests, infants: e.target.value })}
                    />
                </div>
                <div>
                    <label>Total Amount:</label>
                    <input
                        type="number"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Special Requests:</label>
                    <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                </div>
                <button type="submit">Create Booking</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Booking;
*/

/*import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaShieldAlt, FaInfoCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";

const Booking = () => {

    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/listings/${id}`);
                setListing(response.data);
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        };
        fetchListing();
    }, [id]);

    const handleBooking = async () => {
        try {
            const data = {
                name,
                phoneNumber,
                title: listing.title,
                category: listing.category,
            };
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/bookings`, data);
            alert('Booking information submitted successfully');
            setName('');
            setPhoneNumber('');
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row my-[120px] justify-between max-w-6xl mx-auto p-4 space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 space-y-6">
                <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                    <h2 className="text-lg font-semibold">Request to book</h2>
                    <p className="text-pink-600 flex items-center space-x-2">
                        <FaShieldAlt />
                        <span>This is a rare find. Bo's place is usually booked.</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Your trip</h3>
                    <div className="flex justify-between items-center border-b pb-2">
                        <div>
                            <p className="text-sm text-gray-500">Dates</p>
                            <p>Jun 25 – Jul 4, 2025</p>
                        </div>
                        <MdEdit className="text-gray-500 cursor-pointer" />
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Guests</p>
                            <p>2 guests</p>
                        </div>
                        <MdEdit className="text-gray-500 cursor-pointer" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Choose how to pay</h3>
                    <div className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-start space-x-2">
                            <BsCheckCircle className="text-black mt-1 cursor-pointer" />
                            <div>
                                <p>Pay $1,208.81 now</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-2">
                            <BsCircle className="text-gray-500 mt-1 cursor-pointer" />
                            <div>
                                <p>Pay part now, part later</p>
                                <p className="text-gray-500 text-sm">$604.41 due today, $604.40 on Jun 16, 2025. No extra fees. <FaInfoCircle className="inline text-gray-500 cursor-pointer" /></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Log in or sign up to book</h3>
                    <div className="border rounded-lg p-4 space-y-2">
                        <label className="text-sm text-gray-500">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div className="border rounded-lg p-4 space-y-2">
                        <label className="text-sm text-gray-500">Country code</label>
                        <select className="w-full border rounded-md p-2">
                            <option>Pakistan (+92)</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">We’ll call or text you to confirm your number. Standard message and data rates apply. <p className="text-blue-500 underline">Privacy Policy</p></p>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="w-full py-3 bg-gradient-to-r from-pink-700 to-pink-900 text-white font-semibold rounded-lg"
                    >
                        Continue
                    </button>
                </div>
            </div>

            <div className="flex-1 md:max-w-md space-y-4 ">
                {listing && (
                    <>
                        <div className='flex items-center border rounded-lg p-4 bg-gray-50'>
                            <img
                                src={listing.image}
                                alt={listing.title}
                                className="w-[75px] h-[75px] rounded-lg mr-[15px]"
                            />
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">{listing.title}</h3>
                                <div className="flex items-center space-x-2">
                                    <FaStar className="text-yellow-500" />
                                    <p>4.96 (124 reviews) • <FaShieldAlt className="inline" /> {listing.category}</p>
                                </div>
                                <div className="text-sm text-gray-500">Room in casa particular</div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                            <h3 className="text-lg font-semibold">Price details</h3>
                            <div className="flex justify-between">
                                <p>$125.88 x 9 nights</p>
                                <p>$1,132.90</p>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <p>Weekly stay discount</p>
                                <p>-$113.28</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Cleaning fee</p>
                                <p>$29.16</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Airbnb service fee</p>
                                <p>$160.03</p>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold">
                                <p>Total (USD)</p>
                                <p>$1,208.81</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Booking;
*/