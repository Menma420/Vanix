import express from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors())

app.use("/auth", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})