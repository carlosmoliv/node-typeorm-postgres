import express from "express";
import { Banker } from "../entities/Banker";

const bankersRouter = express.Router();

bankersRouter.post("/api/bankers", async (req, res) => {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });

  await banker.save();

  return res.json(banker);
});

export default bankersRouter;
