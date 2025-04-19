import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());

app.get("/api/calls", async (req: any, res: any) => {
  const AUTH_ID = process.env.ID;
  const AUTH_TOKEN = process.env.TOKEN;

  try {
    const response = await axios.get(
      `https://zt.plivo.com/v1/Account/${AUTH_ID}/Call/`,
      {
        // auth: {
        //   username: AUTH_ID,
        //   password: AUTH_TOKEN,
        // },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error proxying to Zentrunk API:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
