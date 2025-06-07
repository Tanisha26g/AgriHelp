import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FaRegCalendar } from "react-icons/fa";
import React from 'react'

export default function CalendarIcon({date}) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center">
      <FaRegCalendar className="h-8 w-8 text-gray-500" color='#f0efeb'/>
        <span className="absolute text-xs font-semibold text-white mt-1">
          {date.slice(-2)}
        </span>
      </div>
    </div>
  )
}
