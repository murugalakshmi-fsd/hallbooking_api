import express from "express";
import connectToDatabase from "./config/dbconfig.js";
import { logger } from "./middleware/logger.js";
import router from "./routes/routes.js";
import dotenv from 'dotenv';

dotenv.config();

const app=express();


app.use(express.json());
app.use(logger);



const mongoURL=process.env.MONGO_URL;
connectToDatabase(mongoURL);

app.get('/', (req, res) => {
    res.send('Hello World');
  });
app.use("/booking",router);

const PORT = process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});