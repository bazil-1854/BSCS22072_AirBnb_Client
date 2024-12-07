import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaInfoCircle, FaTimesCircle, FaUserCircle } from "react-icons/fa";
import { TbBrandBooking } from 'react-icons/tb';


const HostBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [guestDetails, setGuestDetails] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/host-listings-bookings`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setBookings(response.data.bookings);
            }
            catch (err) {
                //setError('Failed to fetch bookings. Please try again.');
                setError(err);
                console.error('Error fetching bookings:', err.response?.data || err.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

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
        return (
            <div className='bg-gray-50 pt-[115px] p-6 min-h-screen justify-center items-center '>
                <div className="max-w-[1350px] mx-auto" >
                    <h3 className='text-[20px] md:text-[24px] mb-[15px] text-rose-600 font-[700]'>Applied Bookings For Your Properties:</h3>
                    <div className='h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]'></div>
                    asd  {error.statusCode} {error.message}
                    {/*error.message*/} {/*error.statusCode && `(Status Code: ${error.statusCode})`*/}
                    {error.statusCode &&
                        <div>
                            No Listings Found with this filter
                        </div>
                    }
                </div>
            </div>
        );
    }
    return (
        <div className='bg-gray-50 pt-[115px] p-6 min-h-screen justify-center items-center '>
            <div className="max-w-[1350px] mx-auto" >
                <h3 className='text-[20px] md:text-[24px] mb-[15px] text-rose-600 font-[700]'>Applied Bookings For Your Properties:</h3>
                <div className='h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]'></div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white flex flex-col border rounded-lg p-4 hover:shadow-md transition duration-300 ease-in-out"
                        >
                            <div className='flex items-center md:mb-0 mb-[15px] space-x-2'>
                                <div className='w-[35px] h-[35px] md:w-[45px] md:h-[45px] rounded-full flex items-center justify-center text-[28px] text-rose-100 bg-rose-600'>
                                    <TbBrandBooking />
                                </div>
                                <div className='flex md:flex-row flex-col ml-[15px] md:items-center justify-center'>
                                    <p className='text-[12px] md:text-[15px] font-[600] text-gray-500 '>Property Name:</p>
                                    <div className='font-[600] text-[15px] md:text-[18px] md:ml-[10px] text-rose-800'><p>{`${booking.listingDetails.name.slice(0, 35)}...` || 'N/A'}</p></div>
                                </div>
                            </div>

                            <div className='ml-[53px] flex items-center space-x-2'>
                                <p className='text-[13px] font-[600] text-gray-500 '>Check-In</p>
                                <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkIn).toDateString()}</p>
                            </div>

                            <div className='ml-[53px] flex items-center space-x-2'>
                                <p className='text-[13px] font-[600] text-gray-500 '>Check Out</p>
                                <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkOut).toDateString()}</p>
                            </div>

                            <div className='ml-[53px] flex items-center space-x-2'>
                                <p className='text-[13px] font-[600] text-gray-500 '>Status</p>
                                <span className={`font-[600] px-[12px] pb-[1.8px] mt-[5px] text-white rounded-[30px] text-[11px] ${booking.status === 'paid' ? 'bg-green-800' : booking.status === 'pending' ? 'bg-yellow-600' : booking.status === 'confirmed' ? 'bg-blue-800' : booking.status === 'canceled' ? 'bg-red-800' : booking.status === 'completed' ? 'text-gray-800' : ''}`}>{booking.status}</span>
                            </div>

                            <div className='ml-[53px] flex items-center space-x-2'>
                                <p className='text-[13px] font-[600] text-gray-500 '>Property Type</p>
                                <p className='font-[600] text-[14px] text-rose-800'>{booking.listingDetails.property_type}</p>
                            </div>

                            <p className="mt-[15px] ml-[53px] flex space-x-3 items-center text-rose-600 cursor-pointer underline" onClick={() => fetchGuestDetails(booking.userID)} >
                                <FaInfoCircle size={20} />
                                <span>User Contact/Info</span>
                            </p>


                            <div className="mt-5 md:mt-4 ml-auto">
                                <button
                                    onClick={() => updateStatus(booking._id, 'rejected')}
                                    className="px-4 py-[4px] mr-2 bg-red-700 text-[13px] text-white rounded-md hover:bg-red-600"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={() => updateStatus(booking._id, 'approved')}
                                    className=" px-4 py-[4px] bg-green-700 text-[13px] text-white rounded-md hover:bg-green-600"
                                >
                                    Approve
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
        </div>
    );
};

export default HostBookings;
