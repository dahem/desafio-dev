import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload from 'express-fileupload';

import cnabRouter from "./router/cnab.js";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.get("/alive", (req, res) => {
  res.json({ data: true, status: "success" });
});

app.use("/cnab", cnabRouter);

const PORT = process.env.BACKEND_PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});