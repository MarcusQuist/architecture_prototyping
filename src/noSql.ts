import { database, message } from "./database"
import { MongoClient } from "mongodb";
const mongoose = require("mongoose");
const mongooseServer = "mongodb://localhost:27017"

export class noSql implements database{

    client: any;
    constructor() {
        this.client = new MongoClient(mongooseServer);
        mongoose
        .connect(mongooseServer, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err: any) => console.error(err))
        .then(() => console.log("Connected to mongoose server at " + mongooseServer))
        mongoose.Promise = global.Promise
    }
    async saveMessage(message: message): Promise<string> {
        const text = message.text
        const chatRoomID = message.chatroomID;
         try {
            const database = this.client.db("messages");
            const messages = database.collection("messages");
            // create a document to insert
            const doc = {
                text: text,
                chatroomID: chatRoomID
            }
            const result = await messages.insertOne(doc);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            return result;
         } finally {
             await this.client.close();
            }
    }
    async getMessages(chatroomID: number): Promise<Array<message>> {
        try {
            const database = this.client.db("messages");
            const messages = database.collection("messages");
            console.log(typeof chatroomID)
            const query = { chatroomID: chatroomID };
            const cursor = messages.find(
                query,
                {
                    sort: { chatroomID: 1 },
                    projection: { _id: 0, text: 1, chatroomID: 1 },
                }
            );
            if ((await messages.countDocuments(query)) === 0) {
                console.warn("No documents found!");
            }
            const messageArray: any = [];
            await cursor.forEach((x: any) => {
                messageArray.push(x)
            });
            return messageArray;
        } finally {
            await this.client.close();
        }
    }
}