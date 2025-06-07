"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Papa from 'papaparse';

const CropsPage = () => {
    const [formData, setFormData] = useState({
      crop: '',
      season: '',
      state: '',
      area: '',
      annualRainfall: '',
      fertilizer: '',
      pesticide: '',
  });

  const [crops, setCrops] = useState([]);
  const [states, setStates] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [error, setError] = useState(null)
  const router = useRouter();

  useEffect(() => {
      Papa.parse('/archive/crop_yield.csv', {
          download: true,
          header: true,
          complete: (result) => {
              const data = result.data.map(item => {
                  // Trim trailing spaces from each value in the item object
                  const trimmedItem = {};
                  Object.keys(item).forEach(key => {
                      trimmedItem[key] = item[key].trim();
                  });
                  return trimmedItem;
              });
              const uniqueCrops = [...new Set(data.map(item => item.Crop))];
              const uniqueStates = [...new Set(data.map(item => item.State))];
              const uniqueSeasons = [...new Set(data.map(item => item.Season))];
              setCrops(uniqueCrops);
              setStates(uniqueStates);
              setSeasons(uniqueSeasons);
          },
          error: (error) => {
              console.error('Error parsing CSV:', error);
          }
      });
  }, []);

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:4005/yield/submit-crop', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
          if (response.ok){
              const result = await response.json();
              const data = { pred : result.prediction };
              const queryString = new URLSearchParams(data).toString();
              router.push(`/yield-prediction/result?${queryString}`)
          }
          else{
              const result = await response.json()
              setError(result.error)
          }
          console.log('Result:', result);
      } catch (error) {
          console.error('Error submitting data', error);
      }
  };

  if (error){
      alert("Error Occured : ", error)

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="max-w-4xl w-full p-8 bg-gray-800 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Crop Data Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
                <label htmlFor="crop" className="text-lg font-medium mb-2">Crop:</label>
                <select
                    name="crop"
                    value={formData.crop}
                    onChange={handleChange}
                    className="border border-gray-600 bg-gray-700 p-2 rounded-md text-white"
                    required
                >
                    <option value="">Select Crop</option>
                    {crops.map((crop, index) => (
                        <option key={index} value={crop}>{crop}</option>
                    ))}
                </select>
            </div>
            {/* <div className="flex flex-col">
                <label htmlFor="cropYear" className="text-lg font-medium mb-2">Crop Year:</label>
                <input
                    type="number"
                    name="cropYear"
                    value={formData.cropYear}
                    onChange={handleChange}
                    className="border border-gray-600 bg-gray-700 p-2 rounded-md text-white"
                    required
                />
            </div> */}
            <div className="flex flex-col">
                <label htmlFor="season" className="text-lg font-medium mb-2">Season:</label>
                <select
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    className="border border-gray-600 bg-gray-700 p-2 rounded-md text-white"
                    required
                >
                    <option value="">Select Season</option>
                    {seasons.map((season, index) => (
                        <option key={index} value={season}>{season}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="state" className="text-lg font-medium mb-2">State:</label>
                <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="border border-gray-600 bg-gray-700 p-2 rounded-md text-white"
                    required
                >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="area" className="text-lg font-medium mb-2">Area (in hectares):</label>
                <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="border border-gray-600 bg-gray-700 p-2 rounded-md text-white"
                    required
                />
            </div>
            {/* <div className="flex flex-col">
                <label htmlFor="production" className="text-lg font-medium mb-2">Production (in metric tons):</label>
                <input
                    type="number"
                    name="production"
                    value={formData.production}
                    onChange={handleChange}
                    className="border border-gray-600 bg-gray-700 p-2 rounded-md text-white"
                    required
                />
            </div> */}
            <div className="flex flex-col">
                <label htmlFor="annualRainfall" className="text-lg font-medium mb-2">Annual Rainfall (in mm):</label>
                <input
                    type="number"
                    name="annualRainfall"
                    value={formData.annualRainfall}
                    onChange={handleChange}
                    className="border border-gray-600 bg-gray-700 p-2 rounded-md text-white"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="fertilizer" className="text-lg font-medium mb-2">Fertilizer (in kilograms):</label>
                <input
                    type="number"
                    name="fertilizer"
                    value={formData.fertilizer}
                    onChange={handleChange}
                    className="border border-gray-600 bg-gray-700 p-2 rounded-md text-white"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="pesticide" className="text-lg font-medium mb-2">Pesticide (in kilograms):</label>
                <input
                    type="number"
                    name="pesticide"
                    value={formData.pesticide}
                    onChange={handleChange}
                    className="border border-gray-600 bg-gray-700 p-2 rounded-md text-white"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-all duration-300"
            >
                Submit
            </button>
        </form>
    </div>
</div>

  );
  };

export default CropsPage;
