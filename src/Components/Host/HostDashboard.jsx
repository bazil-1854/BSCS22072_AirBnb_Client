import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HostBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [guestDetails, setGuestDetails] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    // Fetch bookings for host listings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token for authentication
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/host-listings-bookings`,
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

    // Update booking status
    const updateStatus = async (bookingID, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/update-booking-status`,
                { bookingID, status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Booking status updated successfully!');
        } catch (err) {
            console.error('Error updating booking status:', err.response?.data || err.message);
            alert('Failed to update booking status.');
        }
    };

    // Fetch guest details
    const fetchGuestDetails = async (userId) => {
        setModalLoading(true);
        console.log(userId);
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/get-reservers-details/${userId}`);
            setGuestDetails(response.data.user);
            setShowModal(true);
        } catch (err) {
            console.error('Error fetching guest details:', err.response?.data || err.message);
            alert('Failed to fetch guest details.');
        } finally {
            setModalLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="max-w-6xl mt-[150px] mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Bookings for Your Listings</h1>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-300 ease-in-out"
                    >
                        <p
                            className="text-sm text-blue-600 cursor-pointer underline"
                            onClick={() => fetchGuestDetails(booking.userID)}
                        >
                            Guest: {booking.userID || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">Listing ID: {booking.listingId}</p>
                        <p className="text-sm text-gray-600">Name: {booking.listingDetails.name || 'N/A'}</p>
                        <p className="text-sm text-gray-600">
                            Type: {booking.listingDetails.property_type}
                        </p>
                        <p className="text-sm text-gray-600">
                            Check-In: {new Date(booking.checkIn).toDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                            Check-Out: {new Date(booking.checkOut).toDateString()}
                        </p>
                        <p className="text-sm text-gray-600">Status: {booking.status}</p>

                        <div className="mt-4">
                            <button
                                onClick={() => updateStatus(booking._id, 'approved')}
                                className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => updateStatus(booking._id, 'rejected')}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Guest Details */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        {modalLoading ? (
                            <p>Loading...</p>
                        ) : guestDetails ? (
                            <>
                                <h2 className="text-xl font-semibold mb-4">{guestDetails.username}</h2>
                                <p><strong>Email:</strong> {guestDetails.email}</p>
                                <p><strong>Location:</strong> {`${guestDetails.location.city}, ${guestDetails.location.country}`}</p>
                                <p><strong>Bio:</strong> {guestDetails.bio}</p>
                                <p><strong>Social Links:</strong></p>
                                <ul className="list-disc pl-5">
                                    {guestDetails.socialLinks &&
                                        Object.entries(guestDetails.socialLinks).map(([platform, link]) => (
                                            <li key={platform}>
                                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                    {platform}
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </>
                        ) : (
                            <p>No details available.</p>
                        )}
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HostBookings;
