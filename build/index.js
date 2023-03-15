"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 80;
const isNosql = true;
app.post('/saveMessage', (req, res) => {
    console.log("REQ", req.example);
    if (isNosql) {
    }
    else {
    }
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
