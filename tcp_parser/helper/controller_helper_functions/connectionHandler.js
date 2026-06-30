import net from "net";
import { parser } from "./parser.js";
import { operations } from "../../main/parserDataHelper.js";
export async function onData(socket, data, buffer){
    buffer += data.toString();
    let parts = buffer.split("$");
    buffer = parts.pop() ?? "";

    // let result: IngestedPacket<AckPacket>;
    for (const packet of parts) {
        const result = await parser(packet);
        try{
            operations(result);
            console.log(result.envelope);
            console.log(result.packet);
            console.log(result.errors);

        }
        catch (err){
            console.error(err);
        }

    }
    return { data, buffer: buffer };
}