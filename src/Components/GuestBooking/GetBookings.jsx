import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuestBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token for authentication
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/made-reservations`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setBookings(response.data.bookings);
            } 
            catch (err) {
                setError('Failed to fetch bookings. Please try again.');
                console.error('Error fetching bookings:', err.response?.data || err.message);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Your Bookings</h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-300 ease-in-out"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Listing: {booking.listingID}
                        </h2>
                        <p className="text-sm text-gray-600">
                            Check-In: {new Date(booking.checkIn).toDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                            Check-Out: {new Date(booking.checkOut).toDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                            Payment Sttaus: {booking.paymentStatus}
                        </p>
                        <p className="text-sm text-gray-600">
                            Status: {booking.status}
                        </p>
                        <p className="text-sm text-gray-600">Guests: {booking.guests.adults} Adults</p>
                        <p className="text-sm text-gray-600">
                            {booking.guests.children} Children, {booking.guests.infants} Infants
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Total: ${booking.totalAmount}</p>
                        {booking.specialRequests && (
                            <p className="text-xs text-gray-500 italic mt-2">
                                Special Requests: {booking.specialRequests}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuestBookings;
