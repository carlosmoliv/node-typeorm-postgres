import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const bankerClientRouter = express.Router();

bankerClientRouter.put(
  "/api/banker/:bankerId/client/:clientId",
  async (req, res) => {
    const { bankerId, clientId } = req.params;

    const client = await Client.findOne({ where: { id: parseInt(clientId) } });
    const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } });

    if (!client || !banker) {
      return res.status(404).json({ message: "Client or Banker not found" });
    }

    banker.clients = [client];

    await banker.save();

    return res.status(200).json({ message: "Banker connected to Client" });
  }
);

export default bankerClientRouter;
