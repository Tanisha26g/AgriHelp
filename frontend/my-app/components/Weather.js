import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faSmog, faSnowflake, faCloudShowersHeavy, faCloudRain, faBolt, faTint, faWind, faThermometerHalf } from '@fortawesome/free-solid-svg-icons'
library.add(faCloud, faSun, faSmog, faSnowflake, faCloudShowersHeavy, faCloudRain, faBolt);


const Styles = {
  'Clouds': {
    icon: <FontAwesomeIcon icon={faCloud} style={{ color: 'white', fontSize: '100px'}} />,
    gradient: 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-500', 
  },
  'Clear': {
    icon: <FontAwesomeIcon icon={faSun} style={{ color: 'orange',fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400', 
  },
  'Atmosphere': {
    icon: <FontAwesomeIcon icon={faSmog} style={{ color: 'gray',fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500', 
  },
  'Snow': {
    icon: <FontAwesomeIcon icon={faSnowflake} style={{ color: 'white', fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-br from-grey-100 via-blue-50 to-blue-150', 
  },
  'Rain': {
    icon: <FontAwesomeIcon icon={faCloudShowersHeavy} style={{ color: 'lightblue',fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-br from-white via-blue-50 to-blue-200', 
  },
  'Drizzle': {
    icon: <FontAwesomeIcon icon={faCloudRain} style={{ color: 'lightgray',fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500', 
  },
  'Thunderstorm': {
    icon: <FontAwesomeIcon icon={faBolt} style={{ color: 'yellow',fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black', 
  }
  }

export default function Weather({weatherData}) {
  
  const dominantWeather = weatherData.weather[0].main
  const weatherDescription = weatherData.weather[0].description;
  const temperature = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const precipitation = weatherData.weather[0].description;
  const windSpeed = weatherData.wind.speed;
  const weatherStyle = Styles[dominantWeather] || Styles['Clear']



  console.log(weatherData)
  return (
    <div className={`relative flex flex-col justify-end items-start p-6 ${weatherStyle.gradient}`} style={{ height: '300px' }}>
      <div className="absolute top-0 right-0 p-4 text-6xl mr-4">
        {weatherStyle.icon}
      </div>
      <div className="absolute bottom-0 left-0 p-4">
        <div className="text-3xl font-bold mb-2">
          {weatherData.weather[0].description}
        </div>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faThermometerHalf} className="mr-2" />
          <span>{(temperature-273.15).toFixed(2)}°C</span>
        </div>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faTint} className="mr-2" />
          <span>{humidity}% Humidity</span>
        </div>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faCloudShowersHeavy} className="mr-2" />
          <span>{precipitation}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faWind} className="mr-2" />
          <span>{windSpeed} m/s</span>
        </div>
      </div>
    </div>
  )
}
