import express from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionTypes } from "../entities/Transaction";

const transactionsRouter = express.Router();

transactionsRouter.post(
  "/api/client/:clientId/transactions",
  async (req, res) => {
    const { clientId } = req.params;
    const { type, amount } = req.body;

    const client = await Client.findOne({ where: { id: parseInt(clientId) } });
    if (!client) return res.json({ msg: "Client not found" });

    const transaction = Transaction.create({
      amount,
      type,
      client,
    });

    await transaction.save();

    if (type === TransactionTypes.DEPOSIT) {
      client.balance += amount;
    } else if (type === TransactionTypes.WITHDRAW) {
      client.balance -= amount;
    }

    await client.save();
    return res.json(transaction);
  }
);

export default transactionsRouter;
