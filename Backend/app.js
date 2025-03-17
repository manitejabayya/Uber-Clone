const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieparser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

connectToDb();

app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies
app.use(cookieparser());

app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.use('/users',userRoutes);

module.exports = app;
