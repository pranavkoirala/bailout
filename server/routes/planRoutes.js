import express from "express";
import Plan from "../models/Plan.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

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
  const plan = await Plan.findOne({ planId: req.params.id }).select(
    "-people.hasCancelled"
  );

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  console.log(plan.password);
  if (plan.password.length > 1) {
    return res.json({ passwordProtected: true });
  }

  return res.json({ plan: plan });
});

router.post("/verify/:id", async (req, res) => {
  const plan = await Plan.findOne({ planId: req.params.id }).select(
    "-people.hasCancelled"
  );

  if (bcrypt.compareSync(req.body.password, plan.password)) {
    res.json({ plan });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
});

router.post("/cancel/:id", async (req, res) => {
  const { personId } = req.body;
  const plan = await Plan.findOne({ planId: req.params.id });
  plan.updateOne(
    { "people._id": personId },
    { $set: { "people.$.hasCancelled": true } },
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error cancelling" });
      }
      return res.status(200).json({ message: "success" });
    }
  );
});

export default router;
