import { parseEnvelope, checkPacketLength } from "../../main/parserValidationHelper.js";
export function parser(response){
    const fields = response.split(",");
    const { data: envelope, errors: errors } = parseEnvelope(fields[0])
    //now we can check for null fields properly somewhere else separately
    if(envelope !== null){
        const packetData = checkPacketLength(fields, envelope.messageType);

        const ingestedPacket = {
            envelope: envelope,
            packet: packetData !== null ? packetData.data : null,
            errors: packetData.errors
        }   

        return ingestedPacket;
    }

    const ingestedPacket = {
        envelope: null,
        packet: null,
        errors: errors
    }

    return ingestedPacket;
};