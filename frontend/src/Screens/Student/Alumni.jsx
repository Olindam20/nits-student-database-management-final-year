import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseApiURL } from '../../baseUrl';

const ViewAlumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlumni, setFilteredAlumni] = useState([]);

  useEffect(() => {
    fetchAlumniData();
  }, []);

  const fetchAlumniData = async () => {
    try {
      const response = await axios.get(`${baseApiURL()}/alumni/getAlumni`);
      setAlumniList(response.data);
    } catch (error) {
      console.error('Error fetching alumni data:', error);
    }
  };

  const handleSearch = () => {
    const searchTerm = searchQuery.toLowerCase();
    const filteredData = alumniList.filter(
      (alumni) =>
        alumni.currentCompany.toLowerCase().includes(searchTerm) ||
        alumni.currentCompany.charAt(0).toLowerCase() === searchTerm
    );
    setFilteredAlumni(filteredData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Alumni List</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by current company..."
          className="border border-gray-300 rounded-md px-3 py-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Serial No.</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">LinkedIn URL</th>
            <th className="border border-gray-200 px-4 py-2">Phone Number</th>
            <th className="border border-gray-200 px-4 py-2">Current Company</th>
          </tr>
        </thead>
        <tbody>
          {(filteredAlumni.length > 0 ? filteredAlumni : alumniList).map((alumni, index) => (
            <tr key={alumni._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-200 px-4 py-2">{alumni.name}</td>
              <td className="border border-gray-200 px-4 py-2">
                <a href={alumni.linkedinURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {alumni.linkedinURL}
                </a>
              </td>
              <td className="border border-gray-200 px-4 py-2">{alumni.phoneNumber}</td>
              <td className="border border-gray-200 px-4 py-2">{alumni.currentCompany}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAlumni;
