import express from "express";
import { getcharges,getupdatecharges,createcharges,updatecharges,deletecharges  } from "../controller/chargescontroller.js";

const chargesroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
chargesroute.get("/getcharges", getcharges);
chargesroute.get("/getupdatecharges", getupdatecharges);
chargesroute.post("/createcharges", createcharges);
chargesroute.put("/updatecharges/:id", updatecharges);
chargesroute.delete("/deletecharges/:id", deletecharges);


export default chargesroute;