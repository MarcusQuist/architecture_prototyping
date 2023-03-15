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
exports.noSql = void 0;
const mongodb_1 = require("mongodb");
const mongoose = require("mongoose");
const mongooseServer = "mongodb://localhost:27017";
class noSql {
    constructor() {
        this.client = new mongodb_1.MongoClient(mongooseServer);
        mongoose
            .connect(mongooseServer, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .catch((err) => console.error(err))
            .then(() => console.log("Connected to mongoose server at " + mongooseServer));
        mongoose.Promise = global.Promise;
    }
    saveMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = message.text;
            const chatRoomID = message.chatroomID;
            try {
                const database = this.client.db("messages");
                const messages = database.collection("messages");
                // create a document to insert
                const doc = {
                    text: text,
                    chatroomID: chatRoomID
                };
                const result = yield messages.insertOne(doc);
                console.log(`A document was inserted with the _id: ${result.insertedId}`);
                return result;
            }
            finally {
                yield this.client.close();
            }
        });
    }
    getMessages(chatroomID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = this.client.db("messages");
                const messages = database.collection("messages");
                console.log(typeof chatroomID);
                const query = { chatroomID: chatroomID };
                const cursor = messages.find(query, {
                    sort: { chatroomID: 1 },
                    projection: { _id: 0, text: 1, chatroomID: 1 },
                });
                if ((yield messages.countDocuments(query)) === 0) {
                    console.warn("No documents found!");
                }
                const messageArray = [];
                yield cursor.forEach((x) => {
                    messageArray.push(x);
                });
                return messageArray;
            }
            finally {
                yield this.client.close();
            }
        });
    }
}
exports.noSql = noSql;
