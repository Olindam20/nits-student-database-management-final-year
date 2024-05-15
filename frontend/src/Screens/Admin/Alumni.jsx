import React, { useState } from 'react';
import axios from 'axios';
import { baseApiURL } from '../../baseUrl';


const AddAlumniForm = () => {
  const [alumniData, setAlumniData] = useState({
    name: '',
    linkedinURL: '',
    phoneNumber: '',
    currentCompany: ''
  });

  const handleChange = (e) => {
    setAlumniData({ ...alumniData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApiURL()}/alumni/addAlumni`, alumniData);
      console.log('Alumni added:', response.data);
      // You can perform any actions here after successful addition of alumni data
    } catch (error) {
      console.error('Error adding alumni:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Alumni</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input type="text" name="name" value={alumniData.name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL:</label>
          <input type="text" name="linkedinURL" value={alumniData.linkedinURL} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input type="number" name="phoneNumber" value={alumniData.phoneNumber} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Company:</label>
          <input type="text" name="currentCompany" value={alumniData.currentCompany} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Alumni</button>
      </form>
    </div>
  );
};

export default AddAlumniForm;