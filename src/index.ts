import express from "express";
import { createConnection } from "typeorm";

import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import bankerClientRouter from "./routes/bankerClients.routes";

import bankersRouter from "./routes/bankers.route";
import clientsRouter from "./routes/clients.routes";
import transactionsRouter from "./routes/transactions.routes";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "5738",
      database: "typeorm",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });

    app.use(express.json());
    app.use(clientsRouter);
    app.use(bankersRouter);
    app.use(transactionsRouter);
    app.use(bankerClientRouter);

    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to Postgres");
  }
};

main();
