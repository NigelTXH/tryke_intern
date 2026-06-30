import { onData } from "../helper/controller_helper_functions/connectionHandler.js";
import net from "net";

const server = net.createServer((socket) => {
    console.log("Device connected");
    let buffer = "";
    socket.on("data", async (data) => {
        const result = await onData(socket, data, buffer);
        buffer = result.buffer;

    });

    socket.on("close", () => {
        console.log(`Client Disconnected`);
    });

    socket.on("error", (err) => {
        console.error(err);
    });
});

server.listen(9000, () => {
    console.log("TCP server listening on port 9000");
});