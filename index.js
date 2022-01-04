const express = require("express");
var http = require("http");
// const cors = require("cors");
//const exp = require("constants");
//const { Socket } = require("socket.io");
 const app = express();
 const port = process.env.PORT || 5000;
 var server = http.createServer(app);
 var io = require("socket.io")(server);

//middleware
 app.use(express.json());
 var clients = {};

 io.on("connection", (Socket)=>{
     console.log("connected");
     console.log(Socket.id , "has joined");
     Socket.on("signin", (id)=>{
         console.log(id);
         clients[id]=Socket;
         console.log(clients);
     })
     Socket.on("message",(msg)=>{
         console.log(msg);
         let targetId = msg.targetId;
         if(clients[targetId]) clients[targetId].emit("message",msg);
     })
 });
 app.route("/check").get((req,res)=>{
     return res.json("Your app is working fine");
 })

 server.listen(port, "0.0.0.0", () => {
     console.log("server started");
 });