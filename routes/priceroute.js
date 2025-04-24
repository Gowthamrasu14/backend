import express from "express";
import { getplantunitprice,getoneplantunitprice,createplantunitprice,updateplantunitprice,deleteplantunitprice  } from "../controller/pricecontroller.js";

const plantunitpriceroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
plantunitpriceroute.get("/getplantunitprice", getplantunitprice);
plantunitpriceroute.get("/getoneplantunitprice", getoneplantunitprice);
plantunitpriceroute.post("/createplantunitprice", createplantunitprice);
plantunitpriceroute.put("/updateplantunitprice/:id", updateplantunitprice);
plantunitpriceroute.delete("/deleteplantunitprice/:id", deleteplantunitprice);


export default plantunitpriceroute;