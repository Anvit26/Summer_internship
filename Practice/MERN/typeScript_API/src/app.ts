import express,{Request,Response} from "express";
import dotenv from "dotenv";
import { router } from "./routes/routes";
import mongoose from "mongoose";

dotenv.config();
const app = express();

mongoose.connect(
    process.env.MONGODB_URL as string,
    {
        useUnifiedTopology:true,
        useNewUrlParser: true
    },()=>{console.log("DB Connected")}
);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/",router)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
});