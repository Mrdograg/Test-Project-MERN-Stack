const express = require('express');
const db = require('./database/db');
const app = express();
const Port = 5000;

app.listen(Port, ()=>
    console.log(`server is running at port ${Port}`));