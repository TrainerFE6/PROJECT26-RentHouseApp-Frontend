import express from "express";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import db from "./config/database.js";
import router from "./routes/index.js";
import cors from 'cors';
import fileUpload from "express-fileupload";
import RoomRoute from './routes/RoomRoute.js'
dotenv.config()
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected')
} catch (error) {
    console.error(error)
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(express.json())
app.use(fileUpload())
app.use(router)
app.use(express.static('public'))
app.use(RoomRoute)

app.listen(5000, ()=> console.log('Server running at port 5000'))