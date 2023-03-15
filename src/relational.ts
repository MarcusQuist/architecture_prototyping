import { database, message } from "./database";
const { Client, Pool } = require("pg");

export class relational implements database {
  pool: any;
  constructor() {
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "postgrespw",
      port: 49153,
    });
  }

  saveMessage(message: message): Promise<string> {
    console.log("saving message", message);
    return this.pool
      .query("INSERT INTO message (chatroom_id, text) VALUES ($1, $2)", [
        message.chatroomID,
        message.text,
      ])
      .then((res: any) => {
        return "success";
      })
      .catch((e: any) => console.error(e.stack));
  }

  getMessages(chatroomID: number): Promise<Array<message>> {
    return this.pool
      .query(
        "SELECT chatroom_id as id, text as text FROM message WHERE chatroom_id = $1",
        [chatroomID]
      )
      .then((res: any) => {
        let result: Array<message> = [];
        res.rows.forEach((row: any) => {
          let message: message = { chatroomID: row.id, text: row.text };
          result.push(message);
        });
        console.log(result);
        return result;
      });
  }
}
