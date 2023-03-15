"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relational = void 0;
const { Client, Pool } = require("pg");
class relational {
    constructor() {
        this.pool = new Pool({
            user: "postgres",
            host: "localhost",
            database: "postgres",
            password: "postgrespw",
            port: 49153,
        });
    }
    saveMessage(message) {
        console.log("saving message", message);
        return this.pool
            .query("INSERT INTO message (chatroom_id, text) VALUES ($1, $2)", [
            message.chatroomID,
            message.text,
        ])
            .then((res) => {
            return "success";
        })
            .catch((e) => console.error(e.stack));
    }
    getMessages(chatroomID) {
        return this.pool
            .query("SELECT chatroom_id as id, text as text FROM message WHERE chatroom_id = $1", [chatroomID])
            .then((res) => {
            let result = [];
            res.rows.forEach((row) => {
                let message = { chatroomID: row.id, text: row.text };
                result.push(message);
            });
            console.log(result);
            return result;
        });
    }
}
exports.relational = relational;
