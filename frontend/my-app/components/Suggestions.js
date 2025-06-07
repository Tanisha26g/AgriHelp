import React from 'react'
import suggestions from '../disease_recs.json'
import { RiShoppingCart2Fill } from "react-icons/ri";
import Link from 'next/link';

export default function Suggestions({disease}) {
    const data = suggestions[disease] || {};
    console.log(data)

    return (
        <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-4">Suggestions for {disease}</h2>
        <p className="text-white text-lg mb-2"><strong className='text-xl underline underline-offset-4'>Description:</strong> {data.description}</p>
        <p className="text-white text-lg mb-4"><strong className='text-xl underline underline-offset-4'>Cure:</strong> {data.cure}</p>
        {data.links.length!=0?<>
        <h3 className="text-white text-xl underline underline-offset-4 font-semibold mb-2">Purchase Links:</h3>
        <ul className=" text-white flex flex-row gap-2">
          {data.links && data.links.map((link, index) => (
            <li key={index} className="mb-2">
              <Link
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:underline"
              >
                <RiShoppingCart2Fill size={30}/>
              </Link>
            </li>
          ))}
        </ul>
        </>:null}
      </div>
    );
}
