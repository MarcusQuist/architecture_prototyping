"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 80;
const isNosql = true;
app.use(bodyParser.json());
app.post("/saveMessage", (req, res) => {
    const message = req.body;
    console.log("REQ", message);
    if (isNosql) {
    }
    else {
    }
    res.send("Express + TypeScript Server");
});
app.get("/getMessage/:id", (req, res) => {
    const chatroomID = req.params.id;
    console.log("REQ", chatroomID);
    if (isNosql) {
    }
    else {
    }
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
