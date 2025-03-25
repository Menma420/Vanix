import { Router, Request, Response } from "express";
import { client } from "../stream-client";

const router = Router();

router.post("/createUser", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, name, image } = req.body;

    if (!username || !name || !image) {
      res.status(400).json({ message: "Username, name, and image are required" });
      return;
    }

    const newUser = {
      id: username,
      role: "user",
      name,
      image,
    };

    // Upsert a single user
    await client.upsertUser(newUser);

    const token = client.createToken(username);

    res.status(200).json({ token, username, name });
    return;
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
    return;
  }
});

export default router;
