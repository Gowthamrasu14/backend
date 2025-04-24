// import express from "express";
// import os from "os";
// import cors from "cors";

const express = require("express");
const os = require("os");

const app = express();
const PORT = 8000;

// Function to get system info
const getSystemInfo = () => {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuCores: os.cpus().length,
    networkInterfaces: os.networkInterfaces(),
  };
};

app.get("/system-info", (req, res) => {
  res.json(getSystemInfo());
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
