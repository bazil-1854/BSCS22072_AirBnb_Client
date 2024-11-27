import React, { useState } from 'react';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';

const Step1 = ({ formData, handleChange, setCurrentStep }) => (
    <div>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Enter Property's Info:</h2>
        <div>
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
            />
            <label>Summary</label>
            <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                className="w-full py-2 appearance-none border-b style-none border-gray-400 focus:outline-none mb-4"
            />
            <label>Property Type</label>
            <input
                type="text"
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
            />
        </div>
        <button
            onClick={() => setCurrentStep(2)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step2 = ({ formData, handleChange, setCurrentStep }) => (
    <div>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Enter Property Details:</h2>
        <label>Bedrooms</label>
        <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Bathrooms</label>
        <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Price</label>
        <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <button
            onClick={() => setCurrentStep(1)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={() => setCurrentStep(3)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step3 = ({ formData, handleChange, setCurrentStep }) => (
    <div>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Enter Property's Address:</h2>
        <label>Street</label>
        <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Suburb</label>
        <input
            type="text"
            name="address.suburb"
            value={formData.address.suburb}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Country</label>
        <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <button
            onClick={() => setCurrentStep(2)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={() => setCurrentStep(4)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step4 = ({ formData, setCurrentStep, handleAmenityChange, handleAmenityRemove, handleAmenityAdd }) => (
    <div className='lg:w-[750px] w-[350px] md:w-[450px]'>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Enter Customer Rules and Guidelines</h2>
        {formData.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center mb-2">
                <input
                    type="text"
                    value={amenity}
                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                    className="w-[80%] lg:w-[77%] p-2 border-b border-gray-400"
                />
                <button
                    onClick={() => handleAmenityRemove(index)}
                    className="text-red-700 text-[15px] lg:text-[22px] mb-[-20px] ml-[15px]"
                >
                    
                <RiDeleteBinLine />
                </button>
            </div>
        ))}
        <button
            onClick={handleAmenityAdd}
            className="bg-green-700 text-[14px] mb-[12px] text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Add Amenity
        </button>
        <br />
        <button
            onClick={() => setCurrentStep(3)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={() => setCurrentStep(5)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step5 = ({ formData, handleChange, setCurrentStep }) => (
    <div>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Place Link for Place and Cover Image:</h2>
        <label>Place Picture</label>
        <input
            type="text"
            name="images.placePicture"
            placeholder='Enter image URL for Place Picture'
            value={formData.images.placePicture}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4 placeholder:text-[14px]"
        />
        <label>Cover Picture</label>
        <input
            type="text"
            name="images.coverPicture"
            value={formData.images.coverPicture}
            onChange={handleChange}
            placeholder='Enter image URL for Cover Picture'
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4 placeholder:text-[14px]"
        />
        <button
            onClick={() => setCurrentStep(4)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={() => setCurrentStep(6)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step6 = ({ formData,setFormData, handleSubmit, setCurrentStep }) => (
    <div>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Place Links Property Images:</h2>
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
        <p className=' mt-[15px]'></p>
        {formData.images.additionalPictures.length < 5 && (
            <button
                onClick={() =>
                    setFormData((prevState) => ({
                        ...prevState,
                        images: {
                            ...prevState.images,
                            additionalPictures: [...prevState.images.additionalPictures, ''],
                        },
                    }))
                }
                className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
            >
                Add Picture
            </button>
        )}
        <button
            onClick={() => setCurrentStep(5)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={handleSubmit}
            className="bg-green-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Submit
        </button>
    </div>
);

const AddListing = () => {
    const [formData, setFormData] = useState({
        name: '',
        summary: '',
        property_type: '',
        bedrooms: 0,
        bathrooms: 0,
        price: 0,
        address: { street: '', suburb: '', country: '' },
        amenities: [''],
        images: { placePicture: '', coverPicture: '', additionalPictures: ['', '', '', '', ''] },
    });

    const [currentStep, setCurrentStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevState) => {
            if (name.includes('address.')) {
                const field = name.split('.')[1];
                return {
                    ...prevState,
                    address: { ...prevState.address, [field]: value },
                };
            } else if (name.includes('images.')) {
                const field = name.split('.')[1];
                return {
                    ...prevState,
                    images: { ...prevState.images, [field]: value },
                };
            } else {
                return { ...prevState, [name]: value };
            }
        });
    };
    

    const handleAmenityAdd = () => {
        setFormData((prevState) => {
            if (prevState.amenities.length >= 5) {
                alert('You can only add up to 5 amenities.');
                return prevState; // Return unchanged state
            }
            return {
                ...prevState,
                amenities: [...prevState.amenities, ''],
            };
        });
    };


    const handleAmenityChange = (index, value) => {
        const updatedAmenities = [...formData.amenities];
        updatedAmenities[index] = value;
        setFormData((prevState) => ({
            ...prevState,
            amenities: updatedAmenities,
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
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/add-listing`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Error adding listing');
        }
    };

    

    // Render the correct step
    return (
        <main className='bg-gray-100 p-4 min-h-screen flex flex-col justify-center items-center pt-[100px] w-full h-full'>
            <div className='max-w-2xl'>
                <h3 className='text-[38px] text-rose-600 font-[700] text-center'>Add Listing</h3>
                <p className="text-rose-900 mb-[20px] font-[600] px-[25px] lg:px-[85px]  text-center text-[13px]">
                    Create your property listing by providing all the necessary details with accurate information to attract potential guests, include captivating descriptions, amenities, and high-quality images to make your listing stand out.
                </p>

            </div>
            <div className="max-w-2xl overflow-hidden p-6 h-[420px] bg-white shadow border rounded-[25px]">
                {currentStep === 1 && <Step1 formData={formData} handleChange={handleChange} setCurrentStep={setCurrentStep} />}
                {currentStep === 2 && <Step2 formData={formData} handleChange={handleChange} setCurrentStep={setCurrentStep} />}
                {currentStep === 3 && <Step3 formData={formData} handleChange={handleChange} setCurrentStep={setCurrentStep} />}
                {currentStep === 4 && <Step4 formData={formData} setCurrentStep={setCurrentStep} handleAmenityChange={handleAmenityChange} handleAmenityRemove={handleAmenityRemove} handleAmenityAdd={handleAmenityAdd} />}
                {currentStep === 5 && <Step5 formData={formData} handleChange={handleChange} setCurrentStep={setCurrentStep} setFormData={setFormData}/>}
                {currentStep === 6 && <Step6 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} setCurrentStep={setCurrentStep} setFormData={setFormData}/>}
            </div>
        </main>
    );
};

export default AddListing;

/*import React, { useState } from 'react';
import axios from 'axios';

const AddListing = () => {
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

    const handleAmenityAdd = () => {
        setFormData((prevState) => ({
            ...prevState,
            amenities: [...prevState.amenities, ''], // Add an empty amenity field
        }));
    };

    const handleAmenityChange = (index, value) => {
        const updatedAmenities = [...formData.amenities];
        updatedAmenities[index] = value;
        setFormData((prevState) => ({
            ...prevState,
            amenities: updatedAmenities,
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
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/add-listing`,
                formData,
                { headers: { Authorization: `Bearer ${token}` }, }
            ); 
            alert(response.data.message); // Alert on success
        } catch (error) {
            console.error(error);
            alert('Error adding listing');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Listing</h2>
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
                <div>
                    <label className="block text-gray-600 mb-1">Additional Pictures (Up to 5 URLs)</label>
                    {formData.images.additionalPictures.map((url, index) => (
                        <input
                            key={index}
                            type="text"
                            value={url}
                            onChange={(e) =>
                                setFormData((prevState) => {
                                    const updatedPictures = [...prevState.images.additionalPictures];
                                    updatedPictures[index] = e.target.value; // Update the specific index
                                    return {
                                        ...prevState,
                                        images: {
                                            ...prevState.images,
                                            additionalPictures: updatedPictures,
                                        },
                                    };
                                })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                    {formData.images.additionalPictures.length < 5 && (
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    images: {
                                        ...prevState.images,
                                        additionalPictures: [...prevState.images.additionalPictures, ''], // Add a new empty input
                                    },
                                }))
                            }
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add Picture
                        </button>
                    )}
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Listing
                </button>
            </form>
        </div>
    );
};

export default AddListing;
*/