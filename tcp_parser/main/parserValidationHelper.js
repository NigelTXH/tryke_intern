import { generateError } from "../helper/validation_helper_functions/error_handling/generatePacket.js";
import { normaliseFields } from "../helper/utils.js";
import { GTHBD_FIELD_NAMES, GTNCN_FIELD_NAMES, STANDARD_FIELD_NAMES, GTFRI_FIELD_NAMES, GTMLS_FIELD_NAMES } from "../helper/validation_helper_functions/packets/packetFieldNames.js";
import { parseGTFRI } from "../helper/validation_helper_functions/packets/gtfri.js";
import { parseGTNCN } from "../helper/validation_helper_functions/packets/gtncn.js";
import { parseGTHBD } from "../helper/validation_helper_functions/packets/gthbd.js";
import { parseGTMLS } from "../helper/validation_helper_functions/packets/gtmls.js";
import { parseStandardPacket } from "../helper/validation_helper_functions/packets/standardPacket.js";

export function parseEnvelope(header){
    const match = header.match(/^(\+BUFF|\+RESP|\+ACK):([A-Z]+)/);

        if (!match) {
            return {
                success: false,
                data: null,
                errors: [
                    generateError(
                        "fatal",
                        "envelope",
                        "header",
                        "invalid header format",
                        header
                    )
                ]
            };
        }


        const envelope = {
            rawHeader: match[1],
            messageType: match[2]
        };

        return {
            success: true,
            data: envelope,
            errors: []
        };
}

function parseMessageType(correctFieldLength, fields, parseFunction){
    const fieldLength = fields.length;
    const check = fieldLength == correctFieldLength;
    if(check){
        const outputPacket = parseFunction(fields);
        return {
            success: true,
            data: outputPacket.data,
            errors: outputPacket.errors
        }
    }   
    return {
        success: false,
        data: null,
        errors: [generateError("fatal","packet", "packet length", "invalid packet format", fieldLength.toString())]
    }
}

export function checkPacketLength(fields, messageType){ //Since AckPacket is the most basic one
    const fieldLength = fields.length;
    const fieldModified = fields.map((x) => x === "" ? null : x);
    switch(messageType){
        case "GTHBD":{
            const result = parseMessageType(7, fieldModified, parseGTHBD)
            const fieldErrors = normaliseFields(fieldModified,GTHBD_FIELD_NAMES)
            return {
                ...result,
                errors: [...result.errors, ...fieldErrors]
            };
            
        }
        case "GTNCN":{
            const result = parseMessageType(37, fieldModified, parseGTNCN)
            const fieldErrors = normaliseFields(fieldModified,GTNCN_FIELD_NAMES)
            return {
                ...result,
                errors: [...result.errors, ...fieldErrors]
            };
            
        }
        case "GTLOC":
        case "GTLOF":
        case "GTLOF":
        case "GTULF": 
        case "GTSTT":
        case "GTALM":
        case "GTBOV":
        case "GTBRN":
        case "GTULS":{
            const result = parseMessageType(37, fieldModified, parseStandardPacket);
            const fieldErrors = normaliseFields(fieldModified,STANDARD_FIELD_NAMES)
            return {
                ...result,
                errors: [...result.errors, ...fieldErrors]
            };
        }
        case "GTFRI":{
            const result = parseMessageType(37, fieldModified, parseGTFRI);
            const fieldErrors = normaliseFields(fieldModified,GTFRI_FIELD_NAMES)
            return {
                ...result,
                errors: [...result.errors, ...fieldErrors]
            };
        }

        case "GTMLS":{
            const result = parseMessageType(11, fieldModified, parseGTMLS)
            const fieldErrors = normaliseFields(fieldModified,GTMLS_FIELD_NAMES)
            return {
                ...result,
                errors: [...result.errors, ...fieldErrors]
            };
        }
        default:
            return {
                success: false,
                data: null,
                errors: [generateError("fatal","packet", "unknown packet", "packet not recognised", messageType)]
            }
    }
}