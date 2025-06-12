const http = require("http");
const app = require("./app");
require('dotenv').config();

const port = parseInt(process.env.SERVER_PORT);

const server = http.createServer(app);

server.on("error",(e) => {
    console.log(e);
    process.exit(1);
});

server.on("listening",() => {
    console.log("Serveur en écoute sur le port:" + port);
});

server.listen(port);