import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TbBrandBooking } from 'react-icons/tb';

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
        <div className='bg-gray-50 pt-[90px] min-h-screen pb-[65px] justify-center items-center '>
            <div className="max-w-[950px] mx-auto px-6" >
                <h3 className='text-[24px]  text-rose-600 font-[700]  text-start'>My Reserved bookings</h3>
                <div className='h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]'></div>
                <div className="flex flex-col space-y-[15px]">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white rounded-xl flex md:flex-row flex-col justify-between border py-4 px-6 md:px-[45px] lg:px-[55px] hover:bg-gray-100 hover:border-[2px] hover:border-gray-300 transition duration-300 ease-in-out"
                        >
                            <div className='flex items-center'>
                                <div className='w-[45px] h-[45px] rounded-full flex items-center justify-center text-[28px] text-rose-100 bg-rose-600'>
                                    <TbBrandBooking />
                                </div>
                                <div className='ml-[20px] hidden md:flex flex-col items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Listing Title</p>
                                    <p className='font-[600] w-[110px] text-[19px] text-rose-800'><p>{`${booking.listing.name.slice(0, 11)}...`}</p></p>
                                </div>
                                <div className='md:hidden flex ml-[15px] items-center justify-center'>
                                    <p className='text-[15px] font-[600] text-gray-500 '>Property Name:</p>
                                    <p className='font-[600] w-[110px] text-[18px] ml-[10px] text-rose-800'><p>{`${booking.listing.name.slice(0, 11)}...`}</p></p>
                                </div>
                            </div>

                            <div className='hidden md:flex items-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check-In</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkIn).toDateString()}</p>
                                </div>

                                <div className='ml-[20px] xl:ml-[50px] flex flex-col items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check Out</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkOut).toDateString()}</p>
                                </div>
                            </div>

                            <div className='md:hidden justify-between mt-[15px] flex items-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check-In</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkIn).toDateString()}</p>
                                </div>

                                <div className='ml-[20px] xl:ml-[50px] flex flex-col items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check Out</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkOut).toDateString()}</p>
                                </div>
                            </div>

                            <div className='hidden md:flex items-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Status</p>
                                    <p className={`font-[600] px-[12px] py-[3px] mt-[5px] text-white rounded-[30px] text-[12px] ${booking.status === 'paid' ? 'bg-green-800' : booking.status === 'pending' ? 'bg-yellow-600' : booking.status === 'confirmed' ? 'bg-blue-800' : booking.status === 'canceled' ? 'bg-red-800' : booking.status === 'completed' ? 'text-gray-800' : ''}`}>{booking.status}</p>

                                </div>
                                <div>
                                    <button onClick={() => openModal(booking)}
                                        className="ml-[20px] mt-[12px] bg-gradient-to-r from-rose-600 to-rose-900 hover:bg-rose-600 text-white rounded-[25px] px-[10px] whitespace-nowrap py-[4px] text-[13px]"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>

                            <div className='md:hidden mt-[15px] flex justify-between items-center'>
                                <div className='flex flex-col'>
                                    <p className='text-[16px] font-[600] text-gray-500 '>Status</p>
                                    <p className={`font-[600] px-[12px] py-[2px] mt-[5px] text-white rounded-[30px] text-[12px] ${booking.status === 'paid' ? 'bg-green-800' : booking.status === 'pending' ? 'bg-yellow-600' : booking.status === 'confirmed' ? 'bg-blue-800' : booking.status === 'canceled' ? 'bg-red-800' : booking.status === 'completed' ? 'text-gray-800' : ''}`}>{booking.status}</p>

                                </div>
                                <button onClick={() => openModal(booking)}
                                        className="mt-[15px] bg-gradient-to-r from-rose-600 to-rose-900 hover:bg-rose-600 text-white rounded-[18px] px-[15px] py-[8px] text-[13px]"
                                    >
                                        View Details
                                    </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && selectedBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
                            <h2 className="text-xl font-semibold mb-4 text-center">
                                Booking Details
                            </h2>
                            <p className="text-gray-600">Listing ID: {selectedBooking.listingId}</p>
                            <p className="text-gray-600">Listing ID: {selectedBooking.listing.name}</p>
                            <p className="text-gray-600">Listing ID: {selectedBooking.listing.property_type}</p>
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
        </div>
    );
};

export default GuestBookings;
