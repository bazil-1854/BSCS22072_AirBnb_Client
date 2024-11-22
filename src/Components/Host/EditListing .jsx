import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditListing = () => {
  const { id } = useParams(); // Extract listing ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    property_type: '',
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    address: { street: '', suburb: '', country: '' },
    amenities: [],
    images: { placePicture: '', coverPicture: '', additionalPictures: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch listing details
  const fetchListingDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData(response.data); // Populate form with listing data
    } catch (err) {
      console.error('Error fetching listing details:', err);
      setError('Failed to fetch listing details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListingDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [field]: value },
      }));
    } else if (name.includes('images.')) {
      const field = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        images: { ...prevState.images, [field]: value },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAmenityChange = (index, value) => {
    const updatedAmenities = [...formData.amenities];
    updatedAmenities[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      amenities: updatedAmenities,
    }));
  };

  const handleAmenityAdd = () => {
    setFormData((prevState) => ({
      ...prevState,
      amenities: [...prevState.amenities, ''],
    }));
  };

  const handleAmenityRemove = (index) => {
    const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      amenities: updatedAmenities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/update-listing/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message); // Alert success
      navigate('/hosted-listings'); // Redirect to hosted listings
    } catch (err) {
      console.error('Error updating listing:', err);
      alert('Error updating listing');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Property Type</label>
            <input
              type="text"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Street</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Suburb</label>
          <input
            type="text"
            name="address.suburb"
            value={formData.address.suburb}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Country</label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Amenities</label>
          {formData.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={amenity}
                onChange={(e) => handleAmenityChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleAmenityRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAmenityAdd}
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none"
          >
            Add Amenity
          </button>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Place Picture URL</label>
          <input
            type="text"
            name="images.placePicture"
            value={formData.images.placePicture}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Cover Picture URL</label>
          <input
            type="text"
            name="images.coverPicture"
            value={formData.images.coverPicture}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditListing;