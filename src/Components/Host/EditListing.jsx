import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaBath, FaDollarSign, FaHome, FaImage, FaPlusCircle } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

const EditListing = () => {
  const { id } = useParams();

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

  const fetchListingDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData(response.data.listing);
      //console.log(response.data.listing)
    }
    catch (err) {
      console.error('Error fetching listing details:', err);
      setError('Failed to fetch listing details');
    }
    finally {
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
    }
    else if (name.includes('images.')) {
      const field = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        images: { ...prevState.images, [field]: value },
      }));
    }
    else {
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

      alert(response.data.message);
      navigate('/hosted-listings');
    }
    catch (err) {
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
    <div className='bg-gray-50 flex px-4 flex-col justify-center pt-[110px] min-h-screen items-center'>

      <div className="max-w-[950px] p-6 bg-white border rounded-lg shadow-md">
      <h3 className='text-[24px] mb-[15px] text-rose-600 font-[700] text-center'>Edit Property Details Listing</h3>
        <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Column */}
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <FaHome className="mr-2" />
                Name
              </label>
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
              <label className="text-gray-600 mb-1 flex items-center">
                <FaImage className="mr-2" />
                Summary
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <FaHome className="mr-2" />
                Property Type
              </label>
              <input
                type="text"
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>
          {/* Second Column */}
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <FaDollarSign className="mr-2" />
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <FaBed className="mr-2" />
                Bedrooms
              </label>
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
              <label className="text-gray-600 mb-1 flex items-center">
                <FaBath className="mr-2" />
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Tjird Column */}
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <MdLocationOn className="mr-2" />
                Street
              </label>
              <input
                type="text"
                name="Street"
                value={formData.address.street}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <MdLocationOn className="mr-2" />
                Suburb
              </label>
              <input
                type="text"
                name="Suburb"
                value={formData.address.suburb}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <MdLocationOn className="mr-2" />
                Country
              </label>
              <input
                type="text"
                name="Country"
                value={formData.address.country}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* 4th column */}
          <div className="col-span-3 space-y-4">
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <FaPlusCircle className="mr-2" />
                Amenities
              </label>
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
                    <RiDeleteBinLine />
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAmenityAdd} className="bg-green-700 flex items-center mt-[15px] text-white px-3 py-1 rounded-xl hover:bg-green-600 focus:outline-none">
                <FaPlusCircle className="mr-2" />
                Add Amenity
              </button>
            </div>
          </div>
          {/* Pictures */}
          <div className="col-span-3 space-y-4">
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <FaImage className="mr-2" />
                Place Picture URL
              </label>
              <input
                type="text"
                name="images.placePicture"
                value={formData.images.placePicture}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 mb-1 flex items-center">
                <FaImage className="mr-2" />
                Cover Picture URL
              </label>
              <input
                type="text"
                name="images.coverPicture"
                value={formData.images.coverPicture}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className=' mt-[25px]'></p>
            <label className="text-gray-600 mb-1 flex items-center">
              <FaImage className="mr-2" />
              Place Other IMages
            </label>
            {formData.images.additionalPictures.map((url, index) => (
              <input
                key={index}
                type="text"
                value={url}
                placeholder={`Enter image URL for Image ${index + 1}`}
                onChange={(e) =>
                  setFormData((prevState) => {
                    const updatedPictures = [...prevState.images.additionalPictures];
                    updatedPictures[index] = e.target.value;
                    return {
                      ...prevState,
                      images: { ...prevState.images, additionalPictures: updatedPictures },
                    };
                  })
                }
                className="w-full p-2 border rounded mb-2 placeholder:text-[14px]"
              />
            ))}
          </div>

          <div className="col-span-3 space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
          <aside className="col-span-3 space-y-4 space-x-[35px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Preview</h3> 
            <div className='flex flex-wrap'>
              {/* Preview of Place Picture */}
            {formData.images.placePicture && (
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Place Picture Preview</label>
                <img
                  src={formData.images.placePicture}
                  alt="Place Picture"
                  className="w-[150px] h-[100px] object-cover rounded-md"
                />
              </div>
            )}
            

            {/* Preview of Cover Picture */}
            {formData.images.coverPicture && (
              <div className="mb-4 ml-[45px]">
                <label className="block text-gray-600 mb-1">Cover Picture Preview</label>
                <img
                  src={formData.images.coverPicture}
                  alt="Cover Picture"
                  className="w-[150px] h-[100px] object-cover rounded-md"
                />
              </div>
            )} 
            </div>
            <div className='grid grid-cols-3'>
              {/* Preview of Additional Pictures */}
            {formData.images.additionalPictures.map((url, index) =>
              url ? (
                <div key={index} className="mb-4">
                  <label className="block text-gray-600 mb-1">Property Image {index + 1}'s' Preview</label>
                  <img
                    src={url}
                    alt={`Additional Picture ${index + 1}`}
                    className="w-[150px] h-[100px] object-cover rounded-md"
                  />
                </div>
              ) : null
            )}
            </div>
          </aside>
        </form>

      </div>


    </div>
  );
};

export default EditListing;