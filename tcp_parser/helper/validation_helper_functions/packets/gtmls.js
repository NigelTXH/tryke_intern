import { generateError } from "../error_handling/generatePacket.js";
import { checkInputIsNumber } from "../../utils.js";
export function parseGTMLS(fields){
    const [,protocol,
        imei, 
        deviceName,
        vin,
        qrCode,
        ,
        lockType,
        lockState,
        generatedTime,
        countNumber
    ] = fields;

    const errorForLockType = generateError("warning", "gtmls lock", "lock type", "lock type input is not a number", lockType);
    const errorForLockState = generateError("warning", "gtmls lock", "lock state", "lock state input is not a number", lockType);

    // const { data: protocolInfo, errors: protocolError } = parseProtocolMain(protocol!)
    const { data: lockTypeInfo, errors: lockTypeError } = checkInputIsNumber(lockType, errorForLockType)
    const { data: lockStateInfo, errors: lockStateError } = checkInputIsNumber(lockState, errorForLockState)

    const error = generateError("warning", "packet","generated time", "invalid date format", generatedTime)
    const { data: dateData, errors: dateError, success: successDate } = dateParseMain(generatedTime, error)
    
    const errors = [...lockTypeError,...lockStateError,...dateError];
    const finalPacket = {
        protocol: protocol,
        imei: imei,
        deviceName: deviceName,
        lockState: lockStateInfo,
        lockType: lockTypeInfo,
        generatedTime: dateData,
        countNumber: countNumber

    }
    return {
        data: finalPacket,
        errors: errors,
        success: true
    };
}