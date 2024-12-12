import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaCheckCircle, FaCamera, FaPlusCircle } from "react-icons/fa";
import { RiDeleteBinLine } from 'react-icons/ri';
import MyLoader from '../../assets/MyLoader';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        window.scrollTo(0, 0);
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
        if (name === "city" || name === "country") {
            setUpdatedData({
                ...updatedData,
                location: {
                    ...userInfo.location,
                    ...updatedData.location,
                    [name]: value,
                },
            });
        } else {
            setUpdatedData({
                ...updatedData,
                [name]: value,
            });
        }
    };

    const handleArrayDelete = (attribute, value) => {
        setUpdatedData({
            ...updatedData,
            [attribute]: (updatedData[attribute] || userInfo[attribute] || []).filter((item) => item !== value),
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
        return <MyLoader/>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    const addNewField = (attribute) => {
        setUpdatedData({
            ...updatedData,
            [attribute]: [...(updatedData[attribute] || userInfo[attribute] || []), ''],
        });
    };

    const updateFieldValue = (attribute, index, value) => {
        const updatedArray = [...(updatedData[attribute] || userInfo[attribute] || [])];
        updatedArray[index] = value;
        setUpdatedData({
            ...updatedData,
            [attribute]: updatedArray,
        });
    };


    return (
        <main className='px-6 min-h-screen bg-gray-100 pt-[110px] lg:pt-[150px]'>
            {isEditing ?
                <div className="lg:flex lg:space-x-8 lg:items-start max-w-5xl mx-auto">
                    {/* Left wala Section */}
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                        <div className="flex justify-between py-6 p-[35px] bg-white rounded-[28px] shadow-sm ">
                            <div className='flex flex-col items-center justify-center'>
                                <div className="w-[100px] h-[100px] bg-gray-300 rounded-full flex items-center justify-center mx-auto text-4xl font-bold text-gray-700 mb-[3px]">
                                    {userInfo.username.charAt(0)}
                                </div>
                                <h2 className="text-[25px] font-semibold">{userInfo.username}</h2>
                                <p className="bg-gray-500 text-gray-100 text-center py-[1px] mt-[8px] text-[13px] rounded-[35px] w-[70px]">{userInfo.role}</p>

                            </div>
                            <div className="flex flex-col mr-[25px] items-center justify-center text-gray-500">
                                <p className='text-[18px]'> {(() => {
                                    const reviewDate = new Date(userInfo.createdAt);
                                    const now = new Date();
                                    const timeDiff = now - reviewDate; // Difference in milliseconds

                                    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                                    const months = Math.floor(days / 30);
                                    const years = Math.floor(days / 365);

                                    if (years >= 1) {
                                        return `${years} year${years > 1 ? 's' : ''} ago`;
                                    } else if (months >= 1) {
                                        return `${months} month${months > 1 ? 's' : ''} ago`;
                                    } else {
                                        return `${days} day${days > 1 ? 's' : ''} ago`;
                                    }
                                })()}
                                </p>
                                <p className='text-rose-700 font-[700]'>On AirBnb</p>
                            </div>
                        </div>

                        <div className="mt-8 p-6  border bg-white rounded-[24px]">
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
                    <div className='lg:flex-1'>
                        <div className=" bg-white p-6 rounded-[22px] border ">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[28px] font-semibold">About Bazil</h3>
                                <button onClick={handleSubmit} className="text-sm font-medium border-[2px]  text-gray-50 bg-gray-800 px-2 py-[4px] rounded-lg">Done</button>
                            </div>

                            <p className=''>
                                <span className='font-[700]  mr-[4px]'>Fullname:</span>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={updatedData.fullName || userInfo.fullName || ''}
                                    onChange={handleChange}
                                    className="p-[5px] border w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </p>
                            <p>
                                <span className='font-[700]  mr-[4px]'>About:</span>
                                <input
                                    type="text"
                                    id="about"
                                    name="about"
                                    value={updatedData.about || userInfo.about || ''}
                                    onChange={handleChange}
                                    className="p-[5px] border w-full my-[12px]border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </p>
                            <p>
                                <span className='font-[700]  mr-[4px]'>Occupation:</span>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    value={updatedData.occupation || userInfo.occupation || ''}
                                    onChange={handleChange}
                                    className="p-[5px] border w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </p>
                            <p>
                                <span className="font-[700] mr-[4px]">Location:</span>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={(updatedData.location?.city) || userInfo.location.city || ''}
                                    onChange={handleChange}
                                    placeholder="Enter City"
                                    className="p-[5px] placeholder:text-gray-800 border w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={(updatedData.location?.country) || userInfo.location.country || ''}
                                    onChange={handleChange}
                                    placeholder="Enter Country"
                                    className="p-[5px] border placeholder:text-gray-800 w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </p>
                        </div>
                        <div className="lg:flex lg:space-x-8 lg:items-start max-w-5xl mx-auto">
                            {/* Edit Right Section */}
                            <div className="lg:flex-1">
                                <div className="mt-8 bg-white p-6 rounded-[22px] border ">
                                    <h3 className="text-[20px] font-semibold">Ask Me In</h3>
                                    <div className="mt-8">
                                        <h3 className="text-[17px] font-semibold">Languages</h3>
                                        {(updatedData.languages || userInfo.languages || []).map((language, index) => (
                                            <div key={index} className="flex items-center my-2">
                                                <input
                                                    type="text"
                                                    value={language}
                                                    onChange={(e) => updateFieldValue('languages', index, e.target.value)}
                                                    className="p-2 border rounded-md w-full"
                                                />
                                                <button
                                                    onClick={() => handleArrayDelete('languages', language)}
                                                    className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-md"
                                                >
                                                    <RiDeleteBinLine />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addNewField('languages')} className="bg-green-700 flex items-center mt-[15px] text-white px-3 py-1 rounded-xl hover:bg-green-600 focus:outline-none">
                                            <FaPlusCircle className="mr-2" />
                                            Add Language
                                        </button>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-[17px] font-semibold">Interests</h3>
                                        {(updatedData.interests || userInfo.interests || []).map((interest, index) => (
                                            <div key={index} className="flex items-center my-2">
                                                <input
                                                    type="text"
                                                    value={interest}
                                                    onChange={(e) => updateFieldValue('interests', index, e.target.value)}
                                                    className="px-2 py-[3px] border rounded-md w-full"
                                                />
                                                <button
                                                    onClick={() => handleArrayDelete('interests', interest)}
                                                    className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-md"
                                                >
                                                    <RiDeleteBinLine />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addNewField('interests')} className="bg-blue-500 flex items-center mt-[15px] text-white px-3 py-1 rounded-xl hover:bg-green-600 focus:outline-none">
                                            <FaPlusCircle className="mr-2" />
                                            Add Amenity
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 bg-white p-6 rounded-[22px] border ">
                            <h3 className="text-[20px] font-semibold">Ask Me In</h3>
                            <div className="list-disc list-inside space-y-2">
                                {userInfo.languages && userInfo.languages.length > 0 ? (
                                    userInfo.languages.map((language, index) => (
                                        <p key={index} className="inline-block px-[15px] text-sm mr-[4px] bg-gray-600 text-white rounded-[25px]">
                                            {language}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No languages available.</p>
                                )}
                            </div>
                            <h3 className="text-[20px] mt-[35px] font-semibold">Interest</h3>
                            <div className="list-disc list-inside space-y-2">
                                {userInfo.interests && userInfo.interests.length > 0 ? (
                                    userInfo.interests.map((interests, index) => (
                                        <p key={index} className="inline-block px-[15px] text-sm mr-[4px] bg-gray-200 text-gray-600 rounded-[25px]">
                                            {interests}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No interests Added.</p>
                                )}
                            </div>

                            <div className='flex mt-[40px] items-center'>
                                <p className='text-rose-900 font-[500] mr-[15px]'>Found Me at:</p>
                                {/*<p className='bg-blue-600 text-white'>{userInfo.socialLinks.facebook}</p>*/}
                                <p className='bg-blue-600 ml-[6px] text-sm px-[12px] rounded-lg text-white'>Facebook</p>
                                <p className='bg-rose-600 ml-[6px] text-sm px-[12px] rounded-lg text-white'>Instagram</p>
                                <p className='bg-blue-300 ml-[6px] text-sm px-[12px] rounded-lg text-white'>linkdin</p>
                            </div>
                        </div>

                    </div>
                </div>
                :
                <div className="lg:flex lg:space-x-8 lg:items-start max-w-5xl mx-auto">
                    {/* Left Section */}
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                        <div className="flex justify-between py-6 p-[35px] bg-white rounded-[28px] shadow-sm ">
                            <div className='flex flex-col items-center justify-center'>
                                <div className="w-[100px] h-[100px] bg-gray-300 rounded-full flex items-center justify-center mx-auto text-4xl font-bold text-gray-700 mb-[3px]">
                                    {userInfo.username.charAt(0)}
                                </div>
                                <h2 className="text-[25px] font-semibold">{userInfo.username}</h2>
                                <p className="bg-gray-500 text-gray-100 text-center py-[1px] mt-[8px] text-[13px] rounded-[35px] w-[70px]">{userInfo.role}</p>

                            </div>
                            <div className="flex flex-col mr-[25px] items-center justify-center text-gray-500">
                                <p className='text-[18px]'> {(() => {
                                    const reviewDate = new Date(userInfo.createdAt);
                                    const now = new Date();
                                    const timeDiff = now - reviewDate; // Difference in milliseconds

                                    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                                    const months = Math.floor(days / 30);
                                    const years = Math.floor(days / 365);

                                    if (years >= 1) {
                                        return `${years} year${years > 1 ? 's' : ''} ago`;
                                    } else if (months >= 1) {
                                        return `${months} month${months > 1 ? 's' : ''} ago`;
                                    } else {
                                        return `${days} day${days > 1 ? 's' : ''} ago`;
                                    }
                                })()}
                                </p>
                                <p className='text-rose-700 font-[700]'>On AirBnb</p>
                            </div>
                        </div>

                        <div className="mt-8 p-6  border bg-white rounded-[24px]">
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
                    <div className='lg:flex-1'>
                        <div className=" bg-white p-6 rounded-[22px] border ">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[28px] font-semibold">About Bazil</h3>
                                <button onClick={() => setIsEditing(true)} className="text-sm font-medium border-[2px] border-gray-700 text-gray-800 px-2 py-[4px] rounded-lg">Edit profile</button>
                            </div>

                            <p><span className='font-[700]  mr-[4px]'>Fullname:</span> {userInfo.fullName}</p>
                            <p><span className='font-[700]  mr-[4px]'>About:</span> {userInfo.about}</p>
                            <p><span className='font-[700]  mr-[4px]'>Occupation:</span> {userInfo.occupation}</p>
                            <p><span className='font-[700]  mr-[4px]'>Location:</span> {userInfo.location.city}, {userInfo.location.country}</p>

                        </div>

                        <div className="mt-8 bg-white p-6 rounded-[22px] border ">
                            <h3 className="text-[20px] font-semibold">Ask Me In</h3>
                            <div className="list-disc list-inside space-y-2">
                                {userInfo.languages && userInfo.languages.length > 0 ? (
                                    userInfo.languages.map((language, index) => (
                                        <p key={index} className="inline-block px-[15px] text-sm mr-[4px] bg-gray-600 text-white rounded-[25px]">
                                            {language}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No languages available.</p>
                                )}
                            </div>
                            <h3 className="text-[20px] mt-[35px] font-semibold">Interest</h3>
                            <div className="list-disc list-inside space-y-2">
                                {userInfo.interests && userInfo.interests.length > 0 ? (
                                    userInfo.interests.map((interests, index) => (
                                        <p key={index} className="inline-block px-[15px] text-sm mr-[4px] bg-gray-200 text-gray-600 rounded-[25px]">
                                            {interests}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No interests Added.</p>
                                )}
                            </div>

                            <div className='flex mt-[40px] items-center'>
                                <p className='text-rose-900 font-[500] mr-[15px]'>Found Me at:</p>
                                {/*<p className='bg-blue-600 text-white'>{userInfo.socialLinks.facebook}</p>*/}
                                <p className='bg-blue-600 ml-[6px] text-sm px-[12px] rounded-lg text-white'>Facebook</p>
                                <p className='bg-rose-600 ml-[6px] text-sm px-[12px] rounded-lg text-white'>Instagram</p>
                                <p className='bg-blue-300 ml-[6px] text-sm px-[12px] rounded-lg text-white'>linkdin</p>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </main >
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