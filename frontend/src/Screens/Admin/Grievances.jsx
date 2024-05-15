import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";

const GrievanceTable = () => {
  const [grievances, setGrievances] = useState([]);
  const [addressedGrievanceIndex, setAddressedGrievanceIndex] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseApiURL()}/grievances/getGrievances`);
        setGrievances(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle addressing grievance
  const handleAddressGrievance = async (grievance, index) => {
    console.log("Inside handleAddressGrievance function");
    console.log("Addressing Grievance:", grievance);
    const grievanceId = grievance._id;
    // console.log("Grievance ID:", grievanceId);

    //To send email notification

    console.log(`${baseApiURL}/grievances/sendEmailNotifications`);
    try {
      await axios.post(`${baseApiURL()}/grievances/sendEmailNotifications`, grievance);
    } catch (error) {
      console.error("Error sending email notification:", error);
    }

    try {
      await axios.delete(`${baseApiURL()}/grievances/deleteGrievance/${grievanceId}`);
      console.log("Grievance Addressed Successfully");
      setShowSuccessMessage(true);
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error filing grievance:", error);
    }

    //Refetch the data
    try {
      const response = await axios.get(`${baseApiURL()}/grievances/getGrievances`);
      setGrievances(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto my-6">
      <h2 className="text-xl font-semibold mb-4 ml-5">Grievances List</h2>
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Grievance addressed successfully.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setShowSuccessMessage(false)}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path fillRule="evenodd" d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.358 5.652a.5.5 0 00-.707.707L9.293 10l-3.64 3.642a.5.5 0 00.707.707L10 10.707l3.643 3.64a.5.5 0 00.707-.707L10.707 10l3.64-3.648a.5.5 0 000-.707z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      )}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-2 py-2">ID</th>
            <th className="border border-gray-200 px-2 py-2">ScholarID</th>
            <th className="border border-gray-200 px-2 py-2">Email</th>
            <th className="border border-gray-200 px-2 py-2">Category</th>
            <th className="border border-gray-200 px- py-2">Description</th>
            <th className="border border-gray-200 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {grievances.map((grievance, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="border border-gray-200 px-2 py-2">{grievance._id}</td>
              <td className="border border-gray-200 px-2 py-2">{grievance.scholarID}</td>
              <td className="border border-gray-200 px-2 py-2">{grievance.email}</td>
              <td className="border border-gray-200 px-2 py-2">{grievance.category}</td>
              <td className="border border-gray-200 w-3/4 px-2 py-2 max-w-[200px] truncate">{grievance.description}</td>
              {/* <td className="border border-gray-200 px-4 py-2">
                <button onClick={() => handleAddressGrievance()} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">Address Grievance</button>
              </td>  */}
              <td className="border border-gray-200 px-4 py-2">
                {addressedGrievanceIndex === index && showSuccessMessage ? (
                  <span className="text-green-600">Grievance Addressed Successfully</span>
                ) : (
                  <button onClick={() => handleAddressGrievance(grievance, index)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                    Address Grievance
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrievanceTable;
