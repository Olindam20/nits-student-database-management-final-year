import React, { useState } from 'react';
import axios from 'axios';
import { baseApiURL } from "../../baseUrl";

const Grievances = () => {
  const [formData, setFormData] = useState({
    scholarID: '',
    email: '',
    category: '',
    description: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseApiURL()}/grievances/addGrievances`, formData);
      console.log('Grievance filed successfully');
      setShowPopup(true);
      // Reset form fields after submission
      setFormData({
        scholarID: '',
        email: '',
        category: '',
        description: ''
      });
    } catch (error) {
      console.error('Error filing grievance:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">File a Grievance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">ScholarID:</label>
        <input
          type="number"
          name="scholarID"
          value={formData.scholarID}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-1">Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Select category</option>
          <option value="Technical">Technical</option>
          <option value="Facilities">Facilities</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>

        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">Submit</button>
      </form>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-2">Grievances added successfully!</p>
            <button onClick={handleClosePopup} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grievances;