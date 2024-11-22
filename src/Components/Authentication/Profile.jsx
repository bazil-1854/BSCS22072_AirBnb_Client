import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                        </> :
                        <>
                            <button className='text-blue-600 underline mb-[15px]' onClick={() => { navigate('/reserved-bookings') }}>Add Listing</button>
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
    );
};

export default Profile;
