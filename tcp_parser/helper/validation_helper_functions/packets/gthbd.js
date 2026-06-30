import { generateError } from "../error_handling/generatePacket.js";
import { dateParseMain } from "../../utils.js";
export function parseGTHBD(fields){
    const [,protocol,
        imei, 
        deviceName,
        ble,
        generatedTime,
        countNumber
    ] = fields;

    const error = generateError("warning", "packet","generated time", "invalid date format", generatedTime)
    const { data, errors, success } = dateParseMain(generatedTime, error)
    const finalData = {
        protocol: protocol,
        imei: imei,
        deviceName: deviceName,
        ble: ble,
        generatedTime: data,
        countNumber: countNumber

    }

    return {
        data: finalData,
        success: true,
        errors: errors
    }
}