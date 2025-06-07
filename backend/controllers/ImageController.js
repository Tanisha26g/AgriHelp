import axios from "axios";

const getLeafImagePrediction = async(req,res) => {
    const {plant,image} = req.body;
   
    try{
        const result = await axios({
            method:"POST",
            url:`${process.env.ML_SERVER}/predict-disease`,
            data:{
                plant: plant,
                base64_image:image,
            },
            headers:{
                "Content-Type": "application/json"
            }
        });
        console.log(result)
        res.status(200).json({class: result.data.class, confidence: result.data.confidence});
    }catch(e){
        console.log(e)
    }
    
   
}

export {
    getLeafImagePrediction,
}