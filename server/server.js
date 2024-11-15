import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import planRoutes from "./routes/planRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGOURI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/plan", planRoutes);

app.get("*", (req, res) => {
  res.send(
    "Did you mean <a href='https://bailout.netlify.app'>bailout.netlify.app</a>? <br> Check out the repo at <a href='https://github.com/pranavkoirala/bailout'>GitHub</a>."
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
