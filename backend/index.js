import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import yieldRoutes from "./routes/yieldRoutes.js"
import leafRoute from "./routes/route.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use((req,res,next)=>{
    console.log(req.method, req.path)
    next()
})

app.use('/dashboard', dashboardRoutes )
app.use('/yield', yieldRoutes);
app.use("/api/",leafRoute);

app.listen(process.env.PORT,()=>{
    console.log("Backend server listening")
})
