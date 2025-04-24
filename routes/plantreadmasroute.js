import express from "express";
import { getplantreadmas,getmaxplantreadmas,getOneplantreadmas,createplantreadmas,updateplantreadmas,deleteplantreadmas  } from "../controller/plantreadmascontroller.js";

const plantreadmasroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
plantreadmasroute.get("/getplantreadmas", getplantreadmas);
plantreadmasroute.get("/getmaxplantreadmas", getmaxplantreadmas);
plantreadmasroute.get("/getOneplantreadmas/:id", getOneplantreadmas);
plantreadmasroute.post("/createplantreadmas", createplantreadmas);
plantreadmasroute.put("/updateplantreadmas/:id", updateplantreadmas);
plantreadmasroute.delete("/deleteplantreadmas/:id", deleteplantreadmas);


export default plantreadmasroute;