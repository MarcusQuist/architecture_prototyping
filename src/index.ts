import { Request, Response, NextFunction } from "express"
const express = require('express');

const app = express();
const port = 80;

const isNosql = true;

export interface Example extends Request {
  example: any
}

app.post('/saveMessage', (req: Example, res: any) => {
    console.log("REQ", req.example)
    if (isNosql) {
        
    }
    else {
        
    }
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});