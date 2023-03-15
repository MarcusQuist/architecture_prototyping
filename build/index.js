"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const noSql_1 = require("./noSql");
const express = require("express");
var bodyParser = require("body-parser");
const port = 80;
const isNosql = true;
const app = express();
app.use(bodyParser.json());
app.post("/saveMessage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body;
    if (isNosql) {
        const noSqlInstance = new noSql_1.noSql();
        noSqlInstance.saveMessage(message).then((res) => console.log(res));
    }
    else {
    }
    res.send("Express + TypeScript Server");
}));
app.get("/getMessages/:id", (req, res) => {
    const chatroomID = +req.params.id;
    if (isNosql) {
        const noSqlInstance = new noSql_1.noSql();
        noSqlInstance.getMessages(chatroomID).then();
    }
    else {
    }
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
