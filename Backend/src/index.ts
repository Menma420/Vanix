import express from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allow multiple frontend URLs dynamically
const allowedOrigins = [
  "https://vanix.vercel.app",
  "https://vanix-menma420s-projects.vercel.app",
  "https://vanix-git-main-menma420s-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(express.json());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
