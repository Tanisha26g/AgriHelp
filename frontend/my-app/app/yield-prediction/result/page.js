"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function ResultPage() {
    const router = useRouter();
    
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pred = params.get('pred');
        console.log(pred)
        
        if (pred) {
            setPrediction(pred);
        } else {
            console.error('No prediction data found');
        }
    }, [router]);

    const handleGoBack = () => {
        router.push('/yield-prediction');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="max-w-6xl w-full p-8 bg-gray-800 text-white rounded-lg shadow-lg">
        <div className="flex items-center space-x-8 justify-center">
            <div className="flex-shrink-0">
                <Image 
                    src="/images/yield.jpeg" 
                    alt="Yield Prediction" 
                    width={550} 
                    height={400}
                    className="object-cover rounded-md"
                />
            </div>
            <div className="flex-grow flex flex-col items-center">
                <h1 className="text-4xl font-bold text-center mb-6">Prediction Result</h1>
                <div className="text-xl font-medium mb-4 text-center">
                    {prediction ? (
                        <p>The predicted yield is: <strong>{parseFloat(prediction).toFixed(3)}</strong></p>
                    ) : (
                        <p>No prediction result available.</p>
                    )}
                </div>
                <div className="flex justify-center w-full">
                    <button
                        onClick={handleGoBack}
                        className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-all duration-300"
                    >
                        Go Back to Crop Data Form
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

    );
}
