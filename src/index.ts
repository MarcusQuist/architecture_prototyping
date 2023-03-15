import { Request, Response, NextFunction } from "express";
import { message } from "./database";
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 80;

const isNosql = true;

export interface Example extends Request {
  example: any;
}
app.use(bodyParser.json());
app.post("/saveMessage", (req: Request, res: any) => {
  let message: message = req.body;
  console.log("REQ", message);
  if (isNosql) {
  } else {
  }
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
