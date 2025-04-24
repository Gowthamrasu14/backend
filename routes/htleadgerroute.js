import express from "express";
import {
  gethtleadger,
  createhtleadger,
  updatehtleadger,
  deletehtleadger,
  getdatehtleadger,
  deletemonthhtleadger
} from "../controller/htleadgercontroller.js";

const htleadgerroute = express.Router();

htleadgerroute.get("/gethtleadger", gethtleadger);
htleadgerroute.get("/getdatehtleadger/:startDate/:endDate", getdatehtleadger); // Match parameter names
htleadgerroute.post("/createhtleadger", createhtleadger);
htleadgerroute.put("/updatehtleadger/:id", updatehtleadger);
htleadgerroute.delete("/deletehtleadger/:id", deletehtleadger);
htleadgerroute.delete("/deletemonthhtleadger/:id/:id1", deletemonthhtleadger);

export default htleadgerroute;
