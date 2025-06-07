"use client"
import React,{useState,useRef} from "react"
import Logo from "../public/plant.png"
import Webcam from "react-webcam";
import Suggestions from "./Suggestions";


const PhotoUploader = () => {
    const cameraRef = useRef(null);
    const [filename, setFilename] = useState("")
    const [plant, setPlant] = useState()
    const [resp, setResp] = useState(null)
    const [Img,setImg] = useState("")
    const [camOn,setCamOn] = useState(false)
    const videoConstraints = {
        facingMode: "environment"
    };     
    const handleSubmit = async() => {
        console.log('clicked')
        console.log(Img)
        
        try{
            const base64StartIndex = Img.indexOf('/9j');

            const base64ImageData = Img.substring(base64StartIndex);
            const response = await fetch(`${process.env.SERVER_URI}/api/leaf`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    plant: plant,
                    image: base64ImageData
                })
            })
            if (response.ok){
                const result = await response.json()
                console.log(result.result)
                setResp(result);
            }
        }catch(err){
            console.log(err);
        }
    } 
    const capture = React.useCallback(() => {
        const imageSrc = cameraRef.current.getScreenshot();
        setImg(imageSrc);
        setCamOn(false)
        console.log(imageSrc)
    }, [cameraRef, setImg, setCamOn]);
    const handleChange = (event) => {
        try{
            // if(event.target.files)
            //     setPicture(event.target.files[0])
            if(event.target.files)
                setFilename(event.target.files[0].name)
            if (event.target.files){
                var reader = new FileReader();
                reader.onloadend = () => {
                    setImg(reader.result)
                    console.log(reader.result)
                }
                if(event.target.files[0]){
                    reader.readAsDataURL(event.target.files[0]);
                }
            }
        } catch(err){
            console.log(err)
        }
       }
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-800">
        {   !resp?
            <div className=" absolute h-[80vh] md:h-[60vh] w-[95vw] md:w-[80vw] bg-white rounded-lg grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1">
                <div className=" col-span-1 h-full w-full bg-transparent flex justify-center items-center ">
                    <div className='absolute'>
                    {       camOn?
                            <Webcam 
                                audio={false}
                                ref={cameraRef}
                                screenshotFormat="image/jpg"
                                videoConstraints={videoConstraints}
                            />
                            :
                            <></>
                    }
                    </div>
                    <img src={(Img=="")?Logo.src:Img} alt='Plant Pic'  className={`h-auto w-auto p-4 max-w-full max-h-full ${!camOn?'visible':'invisible'}`}/>     
                </div>
                <div className="col-span-1 h-full w-full bg-gray-900 flex flex-col justify-center items-center p-8 rounded-lg gap-2 md:gap-5">
                    <div className="relative w-full">
                        <input onChange={(e)=>setPlant(e.target.value)} placeholder="Enter plant name" className="w-full bg-white rounded-lg text-gray-900 px-8 py-4"/>
                    </div>
                    <div className="relative w-full">
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <label className="w-full bg-white rounded-lg text-gray-900 px-8 py-4">{(filename=="")?"No Picture chosen yet":filename}</label>
                            <label htmlFor='picture' className='border border-white px-8 py-2 text-white text-center w-full rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200'>
                                Upload Picture
                            </label>  
                        </div>
                        <input
                        onChange={handleChange}
                        name='picture'
                        type="file"
                        placeholder="Choose Profile Picture"
                        id='picture'
                        className=" opacity-0 absolute"
                        />
                    </div>
                    <div className=" text-white text-2xl font-thin">
                        OR
                    </div>
                    <div className="relative w-full">
                        <button onClick={!camOn?()=>setCamOn(true):capture} className="w-full bg-white rounded-lg text-gray-900 px-8 py-4"> {!camOn?'Capture Image':'Click'} </button>
                    </div>
                    <div className="relative flex flex-col justify-center items-center">
                        <button id="submitBtn" disabled={!Img} onClick={handleSubmit} className="w-full bg-white disabled:bg-slate-800 disabled:text-white rounded-lg text-gray-900 px-8 py-4 disabled:animate-pulse"> Find Health!</button>
                        <label htmlFor="submitBtn" className={`text-white transition-opacity duration-200 ${Img ? 'opacity-0' : 'opacity-100'}`}> Select an image to activate submit!</label>
                    </div>
                </div>
            </div>
            :
            <div className="flex flex-col md:flex-row items-center justify-center bg-gray-900 rounded-lg p-8 w-2/3">
   
                <div className="flex-1 flex flex-col items-center justify-center ">
                    <img
                        src={Img}
                        alt='Plant Pic'
                        className={`h-80 w-80 p-4 max-w-full max-h-full ${!camOn ? 'visible' : 'invisible'}`}
                    />
                    <label className="text-white text-2xl mb-2">Disease: {resp.class}</label>
                    <label className="text-white text-2xl mb-4">Confidence in prediction: {resp.confidence}</label>
                    <button
                        onClick={() => setResp(null)}
                        className="w-full md:w-1/2 bg-white text-gray-900 rounded-lg px-8 py-4 hover:bg-gray-200"
                    >
                        Check Again!
                    </button>
                </div>
                <div className="flex-1 bg-gray-800 p-6 rounded-lg">
                    <Suggestions disease={resp.class} />
                </div>
            </div>

        }
        </div>
    );
}

export default PhotoUploader;