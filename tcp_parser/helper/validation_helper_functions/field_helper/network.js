import { generateError } from "../error_handling/generatePacket.js";
import { checkInputIsNumber } from "../../utils.js";

function parseCsq(v) {
    const [rssiStr = "", berStr = ""] = v.split("&");

    const errors = [];

    let rssi = Number(rssiStr);
    let ber = Number(berStr);

    // NaN checks
    if (rssiStr !== "" && Number.isNaN(rssi)) {
        rssi = null;
        errors.push(
            generateError("warning", "network", "csq", "rssi not a number", rssiStr)
        );
    }

    if (berStr !== "" && Number.isNaN(ber)) {
        ber = null;
        errors.push(
            generateError("warning", "network", "csq", "ber not a number", berStr)
        );
    }

    const csq = {
        rssi,
        ber
    };

    return {
        success: true,
        data: csq,
        errors
    };
}

export function parseGTFRINetworkMain(
    mcc,
    mnc,
    lac,
    cellId,
    csq,
    networkType
){
    const { data: parsedCsq, errors: csqErrors} = parseCsq(csq);

    const error = generateError("warning", "network", "network type", "input is not a number", networkType);
    const { data: network, errors: networkTypeErrors} = checkInputIsNumber(networkType, error);
    const networkData = {
        mcc: mcc,
        mnc: mnc,
        lac: lac,
        cellId: cellId,
        csq: parsedCsq,
        networkType: network
    }

    const compiledErrors = [...csqErrors, ...networkTypeErrors]

    return { success: true, data: networkData, errors: compiledErrors }
    
}

export function parseNetworkMain(
    mcc,
    mnc,
    lac,
    cellId,
){

    const networkData = {
        mcc: mcc,
        mnc: mnc,
        lac: lac,
        cellId: cellId
    }


    return { success: true, data: networkData, errors: [] }
    
}