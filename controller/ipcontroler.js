import os from "os";

export const getSystemInfo = async(req,res) => {
  const interfaces = os.networkInterfaces();
  const ipv4Addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        ipv4Addresses.push(net.address);
      }
    }
  }
  res.send(ipv4Addresses);
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuCores: os.cpus().length,
    ipv4Addresses,
     // Return only IPv4 addresses

  };
 
};

export default getSystemInfo;
