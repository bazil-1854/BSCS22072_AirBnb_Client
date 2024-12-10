import { useState, useEffect } from 'react';
import axios from 'axios';
import { TbBrandBooking } from 'react-icons/tb';
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaInfoCircle, FaArrowRight } from "react-icons/fa";
import { AiFillFacebook, AiFillTwitterCircle, AiFillLinkedin, AiOutlineCalendar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MdClose, MdOutlinePropane } from 'react-icons/md';
import { GrStatusInfo } from 'react-icons/gr';


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
        <div className='bg-gray-100 pt-[115px] p-6 min-h-screen justify-center items-center '>
            <div className="max-w-[1350px] mx-auto" >
                <h3 className='text-[20px] md:text-[24px] mb-[15px] text-rose-600 font-[700]'>Applied Bookings For Your Properties:</h3>
                <div className='h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]'></div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white flex flex-col border rounded-lg overflow-hidden pb-4 hover:shadow-md transition duration-300 ease-in-out"
                        >
                            <div className='flex px-4 pt-3 bg-rose-700 items-center md:mb-0 mb-[15px] space-x-2 pb-[8px] border-b-[2px] border-rose-700 '>
                                <div className='w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[28px] bg-rose-100 text-rose-600'>
                                    <TbBrandBooking />
                                </div>
                                <div className='flex w-[85%] pb-[4px] justify-between items-center'>
                                    <div className='font-[600] text-[15px] md:text-[22px] text-rose-50'><p>{`${booking.listingDetails.name.slice(0, 35)}..` || 'N/A'}</p></div>
                                    <p className='text-rose-50 hover:text-red-300 hover:underline cursor-pointer flex items-center '>
                                        See Listings <FaArrowRight className='pl-[5px] mt-[2px]' />
                                    </p>
                                </div>
                            </div>

                            <div className='ml-[53px] md:mt-[15px]'>
                                <div className='flex items-center space-x-2'>
                                    <AiOutlineCalendar className='text-rose-800' />
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check-In</p>
                                    <p className='font-[600] text-[14px] text-green-700'>{new Date(booking.checkIn).toDateString()}</p>
                                </div>

                                <div className='flex items-center space-x-2'>
                                    <AiOutlineCalendar className='text-rose-800' />
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check Out</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkOut).toDateString()}</p>
                                </div>

                                <div className='flex items-center space-x-2'>
                                    <MdOutlinePropane className='text-rose-800' />
                                    <p className='text-[13px] font-[600] text-gray-500 '>Property Type</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{booking.listingDetails.property_type}</p>
                                </div>

                                <div className='flex  mt-[8px] items-center space-x-2'>
                                    <GrStatusInfo className='text-rose-800 text-[18px]' />
                                    <p className='text-[15px] font-[600] text-gray-500 '>Status</p>
                                </div>

                            </div>

                            <p className="mt-[15px] ml-[53px] flex space-x-3 items-center text-rose-600 cursor-pointer underline" onClick={() => fetchGuestDetails(booking.userID)} >
                                <FaInfoCircle size={20} />
                                <span>User Contact/Info</span>
                            </p>


                            <div className="mt-5 md:mt-4 ml-auto mr-[8px]">
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
                                <div className='relative'>
                                    <button onClick={() => setShowModal(false)} className="absolute top-[-5px] right-4 text-gray-500 hover:text-gray-700" aria-label="Close Modal" >
                                        <MdClose size={24} />
                                    </button>
                                    <div className="flex items-center pt-[5px] mb-4">
                                        <div className="w-11 h-11 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                                            <FaUserCircle size={24} className="text-gray-500" />
                                        </div>
                                        <h2 className="text-xl font-semibold ml-4">{guestDetails.username}</h2>
                                    </div>

                                    {/* Guest Details */}
                                    <div className="space-y-[13px]">
                                        <p className="flex items-center gap-2">
                                            <label className='w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600'>
                                                <FaEnvelope />
                                            </label>
                                            {guestDetails.email}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <label className='w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600'>
                                                <FaMapMarkerAlt />
                                            </label>
                                            <strong>Lives In:</strong> {`${guestDetails.location.city}, ${guestDetails.location.country}`}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <label className='w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600'>
                                                <FaInfoCircle />
                                            </label>
                                            <strong>Bio:</strong> {guestDetails.bio}
                                        </p>
                                    </div>

                                    {/* Social Links */}
                                    <div className="mt-4">
                                        <p className="flex items-center gap-2">
                                            <FaUserCircle className="text-purple-500" />
                                            <strong>Social Links:</strong>
                                        </p>
                                        <ul className="list-none mt-2 flex gap-4">
                                            {guestDetails.socialLinks?.facebook && (
                                                <li>
                                                    <Link
                                                        to={guestDetails.socialLinks.facebook}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <AiFillFacebook size={24} />
                                                    </Link>
                                                </li>
                                            )}
                                            {guestDetails.socialLinks?.twitter && (
                                                <li>
                                                    <Link
                                                        to={guestDetails.socialLinks.twitter}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-600"
                                                    >
                                                        <AiFillTwitterCircle size={24} />
                                                    </Link>
                                                </li>
                                            )}
                                            {guestDetails.socialLinks?.linkedin && (
                                                <li>
                                                    <Link
                                                        to={guestDetails.socialLinks.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-700 hover:text-blue-900"
                                                    >
                                                        <AiFillLinkedin size={24} />
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <p>No details available.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HostBookings;
