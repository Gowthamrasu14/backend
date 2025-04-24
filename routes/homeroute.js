// consumption
import express from "express";
import { consumption } from "../controller/homecontroller.js";

const consumptionroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
consumptionroute.get("/consumption", consumption);


export default consumptionroute;