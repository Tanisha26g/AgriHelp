import { GoogleGenerativeAI } from "@google/generative-ai";




const get_suggestions = async(weatherData)=>{
    const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  
    const prompt = `
    Given the following weather data and season information:
    - Temperature: ${weatherData.main.temp}
    - Weather: ${weatherData.weather[0].description}
    - Humidity: ${weatherData.main.humidity}
    - Wind Speed: ${weatherData.wind.speed}
    - Rain in 1h : ${weatherData.rain?weatherData.rain['1h'] : "no available data"}
    - Country : ${weatherData.sys.country}
    - Region ; ${weatherData.name}
   
    Provide general agricultural suggestions and warnings for optimal crop management. Also give recommendations regarding which plants to grow. (in 110 words, give it in points, without formatting)
    `;

    const result = await model.generateContent(prompt);
    return result.response.text()
}


export const today_details=async(req,res)=>{
    const {lat,long}=req.body
    
    console.log(lat,long)
    try{
        const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}`)
        const weatherData = await r.json()
        console.log(weatherData)
        const result = await get_suggestions(weatherData)
        console.log(result)
        const f = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}`)
        const forecast = await f.json()
        const dailyData = {};

   
        forecast.list.forEach(entry => {
            const date = new Date(entry.dt * 1000).toISOString().split('T')[0]; 
            if (!dailyData[date]) {
                dailyData[date] = {
                    tempSum: 0,
                    humiditySum: 0,
                    weatherConditions: {},
                    count: 0,
                    precipitationSum: 0
                };
            }
            dailyData[date].tempSum += entry.main.temp;
            dailyData[date].humiditySum += entry.main.humidity;
            dailyData[date].precipitationSum += entry.rain ? entry.rain['3h'] : 0;
            dailyData[date].count += 1;

        
            const weather = entry.weather[0].main;
            if (!dailyData[date].weatherConditions[weather]) {
                dailyData[date].weatherConditions[weather] = 0;
            }
            dailyData[date].weatherConditions[weather] += 1;
        });

        
        const dailyAverages = Object.keys(dailyData).map(date => {
            const dayData = dailyData[date];
            const weather = Object.keys(dayData.weatherConditions).reduce((a, b) => dayData.weatherConditions[a] > dayData.weatherConditions[b] ? a : b);
            return {
                date,
                avgTemp: (dayData.tempSum / dayData.count).toFixed(2),
                avgHumidity: (dayData.humiditySum / dayData.count).toFixed(2),
                totalPrecipitation: dayData.precipitationSum.toFixed(2),
                dominantWeather: weather
            };
        });

        console.log(dailyAverages);
        return res.status(200).json({result, weatherData, forecast: dailyAverages})
    }
    catch(e){
        return res.status(400).json(e)
    }
}