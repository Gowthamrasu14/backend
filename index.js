import express from "express";
//import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
// import customerroute from "./routes/customerroute.js";
import chargesroute from "./routes/chargesroute.js";
import  linelossroute  from "./routes/linelossroute.js";
import conreadroute from "./routes/conreadroute.js";
import injroute from "./routes/injroute.js";
import drawelroute from "./routes/drawelroute.js";
import planttyperoute from "./routes/planttyperoute.js";
import consumption from "./routes/homeroute.js";
import htdetailroute from "./routes/htdetailroute.js";
import plantroute from "./routes/plantroute.js";
import htleadgerroute from "./routes/htleadgerroute.js";
import plantreadroute from "./routes/plantreadroute.js";
import plantreadmasroute from "./routes/plantreadmasroute.js";
import plantunitpriceroute from "./routes/priceroute.js";
import ip from "./routes/iproute.js";
import userroute from "./routes/userroute.js";





// import mysql from 'mysql'
// import db from './db.js'

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

// mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {

//     console.log("DB connected successfully");

//     app.listen(PORT, () => {
//         console.log(`Server is running on port: ${PORT}`);
//     })

// }).catch(error => console.log(error));

app.listen(PORT, () => {
             console.log(`Server is running on port: ${PORT}`);
         })




// app.use("/api", customerroute);
app.use("/api", chargesroute);
app.use("/api", linelossroute);
app.use("/api",conreadroute);
app.use("/api",injroute);
app.use("/api",drawelroute);
app.use("/api",planttyperoute);
app.use("/api",plantroute);
app.use("/api",htdetailroute);
app.use("/api",htleadgerroute);
app.use("/api",plantreadroute);
app.use("/api",plantreadmasroute);
app.use("/api",plantunitpriceroute);
app.use("/api",ip);
app.use("/api",userroute);

app.use("/api",consumption);



