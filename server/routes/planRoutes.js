import express from "express";
import Plan from "../models/Plan.js";
import crypto from "crypto";

const router = express.Router();

const generateRandomId = () => {
  return crypto.randomBytes(16).toString("hex");
};

router.post("/create", async (req, res) => {
  const { planName, description, password, people, dateUnix } = req.body;
  const planId = generateRandomId();
  const newPlan = new Plan({
    planName,
    description,
    password,
    people,
    date: dateUnix,
    planId,
  });
  await newPlan.save();
  res.json({ planId });
});

export default router;
