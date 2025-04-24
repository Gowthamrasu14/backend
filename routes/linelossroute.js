import express from "express";
import { getlineloss,getupdatelineloss,createlineloss,updatelineloss,deletelineloss  } from "../controller/linelosscontroller.js";

const linelossroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
linelossroute.get("/getlineloss", getlineloss);
linelossroute.get("/getupdatelineloss", getupdatelineloss);
linelossroute.post("/createlineloss", createlineloss);
linelossroute.put("/updatelineloss/:id", updatelineloss);
linelossroute.delete("/deletelineloss/:id", deletelineloss);


export default linelossroute;