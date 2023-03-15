import express from "express";
import { Client } from "../entities/Client";
import { createQueryBuilder } from "typeorm";

const clientsRouter = express.Router();

clientsRouter.get("/api/clients", async (req, res) => {
  const client = await createQueryBuilder("clients")
    .select("clients.first_name")
    .addSelect("clients.balance")
    .from(Client, "clients")
    .leftJoinAndSelect("clients.transactions", "transactions")
    .where(
      "clients.balance >= :minBalance AND clients.balance <= :maxBalance",
      { minBalance: 500, maxBalance: 7000 }
    )
    .getMany();

  return res.json(client);
});

clientsRouter.post("/api/clients", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    card_number: cardNumber,
    balance: balance,
  });

  await client.save();

  return res.json(client);
});

clientsRouter.delete("/api/clients/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const response = await Client.delete(parseInt(clientId));

  return res.json(response);
});

export default clientsRouter;
