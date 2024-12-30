import "dotenv/config";
import express from 'express'
import cors from 'cors'


const app = express();

const corsOption = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOption))


export default app;