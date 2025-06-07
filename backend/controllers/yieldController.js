// controllers/yieldController.js
import { states, crops, seasons } from "../inputMap.js";

export const submitCrop = async(req, res) => {
    if (req.method === 'POST') {
      const {
        crop,
        cropYear,
        season,
        state,
        area,
        annualRainfall,
        fertilizer,
        pesticide,
      } = req.body;
      console.log(req.body)

      const parsedData = {
        Crop: crops[crop],
        Crop_Year: parseInt(cropYear, 10),
        Season: seasons[season],
        State: states[state],
        Area: parseFloat(area),
        Annual_Rainfall: parseFloat(annualRainfall),
        Fertilizer: parseFloat(fertilizer),
        Pesticide: parseFloat(pesticide),
      };
  
      console.log('Parsed Data:', parsedData);
      try{
        const response = await fetch(`${process.env.ML_SERVER}/yield_prediction`, {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(parsedData)
        })
        if (response.ok){
          const prediction = await response.json()
          console.log(prediction)
          res.status(200).json({prediction: prediction})
        }
        else{
          res.status(400).json({error: "Incorrect Data"})
        }
        
      }catch(e){
        console.log(e)
        res.status(500).json({error: "Server Error"})
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  };
  

