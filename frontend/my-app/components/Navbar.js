"use client"
import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-semibold">KhetiSathi</div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="hover:text-gray-300 transition duration-300">Home</a>
          <a href="/govt_schemes" className="hover:text-gray-300 transition duration-300">Govt Schemes</a>
          <a href="/yield-prediction" className="hover:text-gray-300 transition duration-300">Yield Prediction</a>
          <a href="/disease-prediction" className="hover:text-gray-300 transition duration-300">Disease Prediction</a>
        </div>
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-gray-100 hover:text-gray-300 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-900 text-gray-100 p-4`}>
        <a href="/" className="block py-2 px-4 hover:bg-gray-800">Home</a>
        <a href="/govt_schemes" className="block py-2 px-4 hover:bg-gray-800">Govt Schemes</a>
        <a href="/yield-prediction" className="block py-2 px-4 hover:bg-gray-800">Yield Prediction</a>
        <a href="/disease-prediction" className="block py-2 px-4 hover:bg-gray-800">Disease Prediction</a>
      </div>
    </nav>
  );
}
