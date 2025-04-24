import express from "express";
import { getinj,createinj,updateinj,deleteinj } from "../controller/injcontroller.js";

const injroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
injroute.get("/getinj", getinj);
injroute.post("/createinj", createinj);
injroute.put("/updateinj/:id/:id2", updateinj);
injroute.delete("/deleteinj/:id", deleteinj);


export default injroute;