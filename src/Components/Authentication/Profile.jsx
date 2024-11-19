import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
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
                    headers: { Authorization: `Bearer ${token}` }
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

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value,
        });
    };

    // Submit updated profile data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/update-info`, { params: updatedData }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserInfo(response.data);
            setIsEditing(false);
        } catch (err) {
            setError('Error updating profile data');
        }
    };

    if (loading) {
        return <div className='pt-[250px]'>Loading...</div>;
    }

    if (error) {
        return <div className='pt-[250px]'>{error}</div>;
    }

    return (
        <div className="pt-[150px]">
            <h1>Profile</h1>
            {userInfo && (
                <>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={updatedData.fullName || userInfo.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={updatedData.email || userInfo.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={updatedData.bio || userInfo.bio}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="occupation">Occupation</label>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    value={updatedData.occupation || userInfo.occupation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={updatedData.location || `${userInfo.location.city}, ${userInfo.location.country}`}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <div className="profile-details">
                            <img src={userInfo.profilePicture} alt="Profile" className="profile-picture" />
                            <h2>{userInfo.fullName}</h2>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                            <p><strong>Bio:</strong> {userInfo.bio}</p>
                            <p><strong>Occupation:</strong> {userInfo.occupation}</p>
                            <p><strong>Location:</strong> {userInfo.location.city}, {userInfo.location.country}</p>
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;
