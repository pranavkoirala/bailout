import express from "express";
import Plan from "../models/Plan.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const router = express.Router();

const generateRandomId = () => {
  return crypto.randomBytes(16).toString("hex");
};

router.post("/create", async (req, res) => {
  const { planName, description, password, people, date } = req.body;
  let hashedPass = "";
  const planId = generateRandomId();
  if (password.length > 0) {
    hashedPass = bcrypt.hashSync(password, 10);
  }
  const newPlan = new Plan({
    planName,
    description,
    password: hashedPass,
    people,
    date,
    planId,
  });
  await newPlan.save();
  res.json({ planId: newPlan.planId });
});

router.get("/id/:id", async (req, res) => {
  const plan = await Plan.findOne({ planId: req.params.id });

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  const allCancelled = plan.people.every((person) => person.hasCancelled);

  if (allCancelled) {
    return res.json({ bothCancelled: true });
  }

  plan.people.forEach((person) => {
    delete person.hasCancelled;
  });

  if (plan.password.length > 1) {
    return res.json({ passwordProtected: true });
  }

  return res.json({ plan });
});

router.post("/verify/:id", async (req, res) => {
  const plan = await Plan.findOne({ planId: req.params.id });

  if (bcrypt.compareSync(req.body.password, plan.password)) {
    const allCancelled = plan.people.every((person) => person.hasCancelled);

    if (allCancelled) {
      return res.json({ bothCancelled: true });
    }

    plan.people.forEach((person) => {
      delete person.hasCancelled;
    });

    res.json({ plan });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
});

router.post("/cancel/:id", async (req, res) => {
  const { personName } = req.body;

  if (!personName) {
    return res.status(400).json({ message: "Person name is missing" });
  }

  try {
    const plan = await Plan.findOne({ planId: req.params.id });
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Use findOneAndUpdate to modify the correct array element
    const updatedPlan = await Plan.findOneAndUpdate(
      { "people.name": personName.name }, // Match by name
      { $set: { "people.$.hasCancelled": true } },
      { new: true } // Option to return the updated document
    );

    if (!updatedPlan) {
      return res.status(400).json({ message: "No changes made" });
    }

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.error("Error cancelling plan:", err);
    return res.status(500).json({ message: "Error cancelling plan" });
  }
});

export default router;
