import { generateError } from "../error_handling/generate_error.js";
function protocolDestructure(protocol){
    const regex = /^([A-Z]{2})([0-9A-F]{4})$/;

    const match = protocol.match(regex);

    if (!match) {
        return {hardwareType: "", version: "", validProtocol: false};

    }

    const hardwareType = match[1]; 
    const hexVersion = match[2];

    const value = parseInt(hexVersion, 16);

    const major = value >> 8;
    const minor = value & 0xff;

    const result = `${major}.${minor.toString().padStart(2, "0")}`;

    switch(hardwareType){
        case "EF":
            return {hardwareType: "ZK102", version: result, validProtocol: true};
        default:
            return {hardwareType: null, version: null, validProtocol: false};
    } 


}

export function parseProtocolMain(protocol){
    const { hardwareType, version, validProtocol } = protocolDestructure(protocol);
    const error = validProtocol ? [] : 
    [generateError("warning", "protocol", "protocol type", "invalid protocol", protocol)];
    const protocolInfo = {
        versionRaw: protocol,
        hardwareType: hardwareType,
        version: version
    }
    return {
        success: true,
        data: protocolInfo,
        errors: error
    };
    
}