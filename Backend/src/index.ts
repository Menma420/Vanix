import express from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Enable CORS for your frontend's Vercel domain
app.use(
  cors({
    origin: "https://vanix.vercel.app", // Allow frontend to access the backend
    credentials: true, // Allow cookies if needed
    methods: "GET,POST,PUT,DELETE", // Allowed request methods
  })
);

app.use(express.json());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
