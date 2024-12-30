import "dotenv/config";
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


import connect from "./db/connection.js";
import userRouter from "./routes/users.routes.js";


connect()
const app = express();

const corsOption = {
    origin: ["http://localhost:5173"]
}

app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())

app.use("/api/user", userRouter)


export default app;