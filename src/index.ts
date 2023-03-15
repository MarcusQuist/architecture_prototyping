import { Request, Response, NextFunction } from "express";
import { message } from "./database";
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 80;

const isNosql = true;

export interface Example extends Request {
  example: string;
}
app.use(bodyParser.json());
app.post("/saveMessage", (req: any, res: any) => {
  const message: message = req.body;
  console.log("REQ", message);
  if (isNosql) {
  } else {
  }
  res.send("Express + TypeScript Server");
});

app.get("/getMessages/:id", (req: any, res: any) => {
  const chatroomID = req.params.id;
  console.log("REQ", chatroomID);
  if (isNosql) {
  } else {
  }
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
