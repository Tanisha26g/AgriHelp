"use client";
import React, { useEffect, useState } from 'react';
import Weather from '@/components/Weather'
import Forecast from '@/components/Forecast';

const setLocalStorage = (key, data) => {
    const now = new Date();
    const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours later
    localStorage.setItem(key, JSON.stringify({ data, expiry }));
  };

const getLocalStorage = (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    const { data, expiry } = JSON.parse(item);
    if (new Date(expiry) > new Date()) return data;
    localStorage.removeItem(key); // Remove expired data
    return null;
  };

export default function Dashboard() {
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null);
  

  const parseMarkdown = (text) => {
    const lines = text.split('\n').map((line, index) => {
        if (line.trim()!=''){
      const parsedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
        .replace(/\*(.*?)\*/g, '<em>$1</em>').replace('-',''); 
      return <p key={index} dangerouslySetInnerHTML={{ __html: parsedLine.trim() }} className="text-base mb-2" />;
    }});
    return lines;
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const localData = getLocalStorage('weatherData');
        if (localData) {
          const { result, weatherData: w, forecast: f } = localData;
          setSuggestions(parseMarkdown(result));
          setWeatherData(w);
          setForecast(f);
          return;
        }
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          const response = await fetch(`${process.env.SERVER_URI}/dashboard/today`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ lat, long })
          });

          if (response.ok) {
            const { result: s, weatherData: w , forecast: f} = await response.json();
            setSuggestions(parseMarkdown(s));
            setWeatherData(w);
            setForecast(f)
            setLocalStorage('weatherData', { result: s, weatherData: w, forecast: f });

          } else {
            const e = await response.json();
            setError(e.error);
          }
        }, (geoError) => {
          console.error("Geolocation error:", geoError);
          setError("Failed to get your location.");
        });
      } catch (e) {
        console.error(e);
        setError("An error occurred while fetching suggestions.");
      }
    }
    fetchSuggestions();
    
  }, []);

  if (error) {
    return <div className="text-red-500 font-semibold text-center mt-6">{error}</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6'>
  {/* Suggestions section */}
  <div className='col-span-1 bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-lg p-4'>
    <h3 className="text-2xl font-bold mb-4 text-gray-200">Today's Suggestions:</h3>
    <ul className="space-y-3">
      {suggestions.map((suggestion, index) => (
        <li key={index} className="text-lg text-gray-100 border-b pb-2 last:border-none">{suggestion}</li>
      ))}
    </ul>
  </div>

  <div className='col-span-1 md:col-span-2 flex flex-col space-y-6'>
    {weatherData && (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-4">
        <Weather weatherData={weatherData} />
      </div>
    )}
    {forecast && (
      <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-lg p-4">
        <Forecast forecast={forecast} />
      </div>
    )}
  </div>
</div>

)};
