import express from "express";
import { getdrawel,createdrawel,updatedrawel,deletedrawel } from "../controller/drawelcontroller.js";

const drawelroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
drawelroute.get("/getdrawel", getdrawel);
drawelroute.post("/createdrawel", createdrawel);
drawelroute.put("/updatedrawel/:id/:id1", updatedrawel);
drawelroute.delete("/deletedrawel/:id", deletedrawel);


export default drawelroute;