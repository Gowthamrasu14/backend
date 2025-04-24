import express from "express";
import { gethtdetail,getonehtdetail,createhtdetail,updatehtdetail,deletehtdetail  } from "../controller/htdetailcontroller.js";

const htdetailroute = express.Router();

// adminuserroute.post("/createchrgs", createadminuser);
htdetailroute.get("/gethtdetail", gethtdetail);
htdetailroute.get("/getonehtdetail", getonehtdetail);
htdetailroute.post("/createhtdetail", createhtdetail);
htdetailroute.put("/updatehtdetail/:id", updatehtdetail);
htdetailroute.delete("/deletehtdetail/:id", deletehtdetail);


export default htdetailroute;