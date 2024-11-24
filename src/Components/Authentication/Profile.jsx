import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaCheckCircle, FaCamera } from "react-icons/fa"; 

const Profile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/user-info`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching profile data');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value,
        });
    };

    const handleArrayChange = (attribute, value) => {
        setUpdatedData({
            ...updatedData,
            [attribute]: [...(updatedData[attribute] || userInfo[attribute]), value],
        });
    };

    const handleArrayDelete = (attribute, value) => {
        setUpdatedData({
            ...updatedData,
            [attribute]: (updatedData[attribute] || userInfo[attribute]).filter((item) => item !== value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/update-info`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserInfo(response.data);
            setIsEditing(false);
        } catch (err) {
            setError('Error updating profile data');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    const placeholderText = (attribute) => userInfo[attribute] || `Enter ${attribute}`;

    return (
        <main className='px-6 min-h-screen pt-[150px]'>
            {isEditing ?
                <div className="p-6 max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8">
                        {/* Profile Picture */}
                        <div className="relative w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 lg:mb-0">
                            B
                            <button className="absolute bottom-1 right-1 bg-white rounded-full shadow-md p-2">
                                <FaCamera className="text-gray-700 text-sm" />
                                <span className="sr-only">Add Profile Picture</span>
                            </button>
                        </div>

                        {/* About Section */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">About you</h3>
                            <div className="border border-gray-300 p-3 rounded-md text-gray-500">
                                Write something fun and punchy.{" "}
                                <button className="text-blue-500 text-sm font-medium hover:underline">
                                    Add intro
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="my-6" />

                    {/* Where You've Been Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Where you’ve been</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Choose whether other people can see all the places you’ve been on
                            Airbnb.
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-4">
                                {/* Destination Cards */}
                                {Array(5)
                                    .fill(null)
                                    .map((_, idx) => (
                                        <div
                                            key={idx}
                                            className="w-16 h-16 bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 text-sm rounded-lg"
                                        >
                                            Next destination
                                        </div>
                                    ))}
                            </div>
                            {/* Toggle Button */}
                            <div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 transition-all"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="my-6" />

                    {/* What You're Into Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">What you’re into</h3>
                        <div className="flex flex-wrap gap-4 mb-4">
                            {/* Interests Tags */}
                            {["Anime", "Chess", "Outdoors"].map((interest, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                        <button className="text-blue-500 text-sm font-medium hover:underline">
                            Edit interests
                        </button>
                    </div>

                    {/* Done Button */}
                    <div className="mt-6 text-center">
                        <button onClick={handleSubmit} className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                            Done
                        </button>
                    </div>
                </div>
                :
                <div className="lg:flex lg:space-x-8 lg:items-start max-w-5xl mx-auto">
                    {/* Left Section */}
                    <div className="bg-white shadow-md p-6 rounded-md lg:w-1/3 mb-6 lg:mb-0">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto text-3xl font-bold text-gray-700 mb-4">
                                B
                            </div>
                            <h2 className="text-xl font-semibold">Bazil</h2>
                            <p className="text-gray-500">{userInfo.role}</p>
                            <p className="text-sm text-gray-500 mt-1">1 Month on Airbnb</p>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Bazil's confirmed information</h3>
                            <div className="flex items-center space-x-2 mb-2">
                                <FaCheckCircle className="text-green-500" />
                                <p className="text-sm text-gray-600">Phone number</p>
                            </div>
                            <hr className="my-4" />
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Verify your identity</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Before you book or host on Airbnb, you’ll need to complete this step.
                                </p>
                                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
                                    Get verified
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[28px] font-semibold">About Bazil</h3>
                            <button onClick={() => setIsEditing(true)} className="text-sm font-medium border-[2px] border-gray-700 text-gray-800 px-2 py-[4px] rounded-lg">Edit profile</button>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-gray-600">📍</p>
                                <p className="text-sm text-gray-600">Born in the 00s</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-gray-600">🎓</p>
                                <p className="text-sm text-gray-600">Where I went to school: Junior Campus High School</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-gray-600">🗣️</p>
                                <p className="text-sm text-gray-600">Speaks English and Urdu</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Ask Bazil about</h3>
                            <div className="flex flex-wrap gap-4">
                                <span className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                    <FaUserAlt className="mr-2" /> Anime
                                </span>
                                <span className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                    <FaUserAlt className="mr-2" /> Chess
                                </span>
                                <span className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                    <FaUserAlt className="mr-2" /> Outdoors
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
    );
};

export default Profile;
/*
 <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
            {userInfo && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <img
                            src={userInfo.profilePicture || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border border-gray-300"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                {userInfo.fullName || 'Enter Full Name'}
                            </h2>
                            <p className="text-gray-500">{userInfo.role}</p>
                        </div>
                    </div>
                    {userInfo.role === 'Host' ?
                        <>
                            <button className='text-blue-600 underline mb-[15px]' onClick={() => { navigate('/add-listing') }}>Add Listing</button>
                            <button className='text-blue-600 underline mb-[15px] ml-[25px]' onClick={() => { navigate('/host-listing') }}>See Listing</button>
                            <button className='text-blue-600 underline mb-[15px] ml-[25px]' onClick={() => { navigate('/host-dashboard') }}>Manage Boolings</button>
                        </> :
                        <>
                            <button className='text-blue-600 underline mb-[15px]' onClick={() => { navigate('/reserved-bookings') }}>See Made Bookings</button>
                            <button className='text-blue-600 underline mb-[15px]' onClick={() => { navigate('/favourite-listings') }}>See Fav Listings</button>
                        </>
                    }
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={updatedData.fullName || userInfo.fullName || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userInfo.email || ''}
                                        onChange={handleChange}
                                        disabled
                                        className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                        Bio
                                    </label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={updatedData.bio || userInfo.bio || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="languages" className="block text-sm font-medium text-gray-700">
                                        Languages
                                    </label>
                                    <div className="space-y-2">
                                        {(updatedData.languages || userInfo.languages || []).map((language, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between border border-gray-300 p-2 rounded-md"
                                            >
                                                <span className="text-gray-700">{language}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleArrayDelete('languages', language)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            placeholder="Add a language"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleArrayChange('languages', e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <p>
                                <strong>Email:</strong> {userInfo.email || 'Enter Email'}
                            </p>
                            <p>
                                <strong>Bio:</strong> {userInfo.bio || 'Enter Bio'}
                            </p>
                            <p>
                                <strong>Languages:</strong>{' '}
                                {(userInfo.languages && userInfo.languages.length > 0
                                    ? userInfo.languages.join(', ')
                                    : 'Enter Languages')}
                            </p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
*/