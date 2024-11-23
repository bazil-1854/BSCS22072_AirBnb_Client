import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuestBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null); // Selected booking details
    const [showModal, setShowModal] = useState(false); // Modal visibility

    // Fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token for authentication
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/made-reservations`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setBookings(response.data.bookings);
            } catch (err) {
                setError('Failed to fetch bookings. Please try again.');
                console.error('Error fetching bookings:', err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const finalizeBooking = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/finalize-booking`,
                { bookingId: selectedBooking._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Thanyou For choosing Us ...');

            setSelectedBooking(null);
            setShowModal(false);
        } catch (err) {
            console.error('Error finalizing booking:', err.response?.data || err.message);
            alert('Failed to finalize booking. Please try again.');
        }
    };

    const openModal = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedBooking(null);
        setShowModal(false);
    };

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
                            Payment Status: {booking.paymentStatus}
                        </p>
                        <p className="text-sm text-gray-600">Status: {booking.status}</p>
                        <button
                            onClick={() => openModal(booking)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {showModal && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Booking Details
                        </h2>
                        <p className="text-gray-600">Listing ID: {selectedBooking.listingID}</p>
                        <p className="text-gray-600">
                            Check-In: {new Date(selectedBooking.checkIn).toDateString()}
                        </p>
                        <p className="text-gray-600">
                            Check-Out: {new Date(selectedBooking.checkOut).toDateString()}
                        </p>
                        <p className="text-gray-600">Guests:</p>
                        <ul className="list-disc list-inside">
                            <li>Adults: {selectedBooking.guests.adults}</li>
                            <li>Children: {selectedBooking.guests.children}</li>
                            <li>Infants: {selectedBooking.guests.infants}</li>
                        </ul>
                        <p className="text-gray-600">Total Amount: ${selectedBooking.totalAmount}</p>
                        {selectedBooking.specialRequests && (
                            <p className="text-sm text-gray-500 italic">
                                Special Requests: {selectedBooking.specialRequests}
                            </p>
                        )}
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Close
                            </button>
                            <button
                                onClick={finalizeBooking} // Replace with any specific action
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Finalize Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuestBookings;
