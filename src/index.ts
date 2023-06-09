import { Request, Response, NextFunction } from "express";
import { noSql } from "./noSql"
import { message } from "./database";
import { relational } from "./relational";
const express = require("express");
var bodyParser = require("body-parser");
const port = 80;

const isNosql = true;

const app = express();
const relationalInstance: relational = new relational();


app.use(bodyParser.json());
app.post("/saveMessage", async (req: any, res: any) => {
    const message: message = req.body;
    if (isNosql) {
        const noSqlInstance: noSql = new noSql();
        noSqlInstance.saveMessage(message).then((res: any) => console.log(res))
    }
    else {
        relationalInstance.saveMessage(message).then()
    }
    res.send("Express + TypeScript Server");
});

app.get("/getMessages/:id", (req: any, res: any) => {
    const chatroomID: number = +req.params.id;
    if (isNosql) {
        const noSqlInstance: noSql = new noSql();
        noSqlInstance.getMessages(chatroomID).then()
    } else {
        relationalInstance.getMessages(chatroomID).then()
    }
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
console.log(`[server]: Server is running at http://localhost:${port}`);
});

export interface Example extends Request {
  example: string;
}
