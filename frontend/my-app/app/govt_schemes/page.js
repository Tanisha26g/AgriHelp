"use client"
import React, { useEffect, useState } from 'react';
import schemes from '../../govt_schemes.json';

export default function GovtSchemes() {
  const [state, setState] = useState(null);
  const [stateSchemes, setStateSchemes] = useState([]);
  const [error, setError] = useState(null);
  const IndiaSchemes = schemes['India'];

  useEffect(() => {
    const getState = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          
          const res = await fetch(
            `https://apis.mappls.com/advancedmaps/v1/${process.env.GEOCODE_KEY}/rev_geocode?lat=${lat}&lng=${long}`
          );
          
          if (res.ok) {
            const result = await res.json();
            const detectedState = result.results[0].state;
            setState(detectedState);
            setStateSchemes(schemes[detectedState] || []); // Safely handle non-existing state
          } else {
            const e = await res.json();
            setError(e.message || "Failed to fetch state information");
          }
        });
      } catch (e) {
        console.log(e);
        setError("Geolocation is not supported or user denied the request.");
      }
    };
    
    getState();
  }, []);

  if (error) {
    return <div className="text-red-500 font-semibold text-center mt-6">{error}</div>;
  }

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      {state ? (
        <>
          <h2 className="text-3xl font-semibold mb-6">Schemes in {state}</h2>
          {stateSchemes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateSchemes.map((scheme, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-blue-400 mb-2">{scheme.name_of_scheme}</h3>
                  <p className="text-gray-300 mb-4">{scheme.description}</p>
                  <p className="font-medium text-gray-400 mb-4">Eligibility: {scheme.eligibility}</p>
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-300 underline"
                  >
                    More Information
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p>No specific schemes found for {state}.</p>
          )}
        </>
      ) : (
        <p>Loading location...</p>
      )}

      {IndiaSchemes ? (
        <>
          <h2 className="text-3xl font-semibold mb-6 mt-12">Schemes in India</h2>
          {IndiaSchemes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {IndiaSchemes.map((scheme, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-blue-400 mb-2">{scheme.name_of_scheme}</h3>
                  <p className="text-gray-300 mb-4">{scheme.description}</p>
                  <p className="font-medium text-gray-400 mb-4">Eligibility: {scheme.eligibility}</p>
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-300 underline"
                  >
                    More Information
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p>No specific schemes found for India.</p>
          )}
        </>
      ) : (
        <p>Loading schemes...</p>
      )}
    </div>
  );
}
