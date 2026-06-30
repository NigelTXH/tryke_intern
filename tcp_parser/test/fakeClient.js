import fs from "fs";
import readline from "readline";
import net from "net";

const CLIENTS_COUNT = 15;
const LINE_READ = 100;
async function simulateDevice(file, port, clientNum) {
    const client = net.createConnection({ port });
    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
    });
    console.log(`Simulating client: ${clientNum}`);
    let lineCount = 0;
    for await (const line of rl) {
        if (lineCount >= LINE_READ) {
            rl.close();
            break;
        }
        lineCount++;
        const logLine = JSON.parse(line.toString());
        const packet = logLine?.etc?.[0];
        if (typeof packet !== "string" || logLine?.function !== "okaiProcessor@10") {
            continue;
        }

        client.write(packet);

        await new Promise(res => setTimeout(res, 200)); // simulate delay
    }

    client.on("close", () => {
        console.log("Server disconnected from client:", clientNum);
    });

    client.end();
}

function allClients(){
    // console.log("Connected to server");
    const files = fs.readdirSync('logs/input');
    for(let i = 0; i < CLIENTS_COUNT; i++){
        const logPath = `logs/input/${files[i]}`;
        simulateDevice(logPath, 9000, i);
    }
}

allClients();