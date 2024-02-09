import express from "express";
import cors from "cors";

import rootRouter from "./router/index";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Running at PORT ${PORT}`);
});
