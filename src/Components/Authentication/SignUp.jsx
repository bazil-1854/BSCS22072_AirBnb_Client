import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Guest',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked ? value : 'Guest' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/auth/register`, formData);
      alert('Registration successful!');
    }
    catch (error) {
      console.error(error);
      alert('Registration failed!' + error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-2">
            How would you like to continue?
          </p>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="guestRole"
              name="role"
              value="Guest"
              checked={formData.role === 'Guest'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="guestRole" className="text-sm text-gray-600">
              As a Guest
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hostRole"
              name="role"
              value="Host"
              checked={formData.role === 'Host'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="hostRole" className="text-sm text-gray-600">
              As a Host
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
