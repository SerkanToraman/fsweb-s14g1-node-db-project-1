const express = require("express");
const accountRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

// // check if "Serkan" is sent to check in postman
//  server.get('/',(req,res)=>{
//     res.send("Serkan")
//   })

server.use("/api/accounts",accountRouter);

module.exports = server;
