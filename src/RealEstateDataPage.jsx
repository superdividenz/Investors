import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Import Supabase client

const RealEstateDataPage = () => {
  const [realEstateData, setRealEstateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [neighborhood, setNeighborhood] = useState("");
  const [averageHomePrice, setAverageHomePrice] = useState("");
  const [schoolRating, setSchoolRating] = useState("");
  const [crimeRate, setCrimeRate] = useState("");
  const [amenities, setAmenities] = useState("");

  // Fetch St. Louis real estate data
  const fetchStLouisRealEstateData = async () => {
    try {
      console.log("Fetching data from Supabase...");

      const { data, error } = await supabase
        .from("st_louis_real_estate")
        .select("*");

      if (error) {
        console.error("Supabase Error:", error);
        throw error;
      }

      console.log("Fetched Data:", data); // Log fetched data for debugging

      if (data.length === 0) {
        setError("No data found in the database.");
      } else {
        setRealEstateData(data);
      }
    } catch (error) {
      console.error("Error fetching St. Louis real estate data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Add new real estate data
  const addRealEstateData = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("st_louis_real_estate")
        .insert([
          {
            neighborhood,
            average_home_price: parseFloat(averageHomePrice),
            school_rating: parseFloat(schoolRating),
            crime_rate: crimeRate,
            amenities: amenities.split(",").map((item) => item.trim()),
          },
        ]);

      if (error) {
        console.error("Supabase Error:", error);
        throw error;
      }

      console.log("Added Data:", data);

      // Refresh the table
      fetchStLouisRealEstateData();

      // Clear the form
      setNeighborhood("");
      setAverageHomePrice("");
      setSchoolRating("");
      setCrimeRate("");
      setAmenities("");
    } catch (error) {
      console.error("Error adding data:", error);
      setError("Failed to add data. Please try again.");
    }
  };

  useEffect(() => {
    fetchStLouisRealEstateData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          St. Louis Real Estate Data
        </h1>

        {/* Add Data Form */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Data
          </h2>
          <form onSubmit={addRealEstateData} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Neighborhood
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Average Home Price
              </label>
              <input
                type="number"
                value={averageHomePrice}
                onChange={(e) => setAverageHomePrice(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                School Rating (out of 10)
              </label>
              <input
                type="number"
                value={schoolRating}
                onChange={(e) => setSchoolRating(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Crime Rate
              </label>
              <input
                type="text"
                value={crimeRate}
                onChange={(e) => setCrimeRate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amenities (comma-separated)
              </label>
              <input
                type="text"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Add Data
            </button>
          </form>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Neighborhood
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Home Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crime Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amenities
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {realEstateData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.neighborhood}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${item.average_home_price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.school_rating}/10
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.crime_rate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.amenities.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RealEstateDataPage;
