import express from "express";
import { getSystemInfo } from "../controller/ipcontroler.js";

const iproute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
iproute.get("/getSystemInfo", getSystemInfo);


export default iproute;