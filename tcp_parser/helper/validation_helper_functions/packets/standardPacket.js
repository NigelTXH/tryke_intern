import { generateError } from "../error_handling/generatePacket.js";
import { dateParseMain } from "../../utils.js";
import { parseNetworkMain } from "../field_helper/network.js";
import { parsePowerMain } from "../field_helper/power.js";
import { checkInputIsNumber } from "../../utils.js";
import { positionParseMain } from "../field_helper/position.js";
export function parseStandardPacket(fields){
    const [,protocol,
        imei, 
        deviceName,
        vin,
        qrCode,
        ,
        ,
        ,
        ,
        accuracy,
        speed,
        azimuth,
        altitude,
        longitude,
        latitude,
        utcTime,
        ,
        mcc,
        mnc,
        lac,
        cellId,
        ,
        ,
        state,
        powerSupply,
        mainVoltageMv,
        backupVoltageMv,
        backupBatteryPercent,
        ,
        ,
        ,
        ,
        ,
        ,
        generatedTime,
        countNumber 
    ] = fields;
    const error = generateError("warning", "packet","generated time", "invalid date format", generatedTime);
    const { data, errors: dataError, success } = dateParseMain(generatedTime, error);
    const { data: networkData, errors: networkError, success: successNetwork } = parseNetworkMain(mcc, mnc, lac, cellId);
    const { data: powerData, errors: powerError, success: successPower } = parsePowerMain(
        powerSupply, mainVoltageMv, backupVoltageMv, backupBatteryPercent
    );
    const stateErrorMessage = generateError("warning", "state", 'state', "invalid state code", state);
    const { data: stateType, errors: stateError, success: successState } = checkInputIsNumber(state, stateErrorMessage);

    const { data: positionData, errors: positionError, success: successPosition } = positionParseMain(
        accuracy, speed, azimuth, altitude, longitude, latitude, utcTime
    );

    const errors = [...dataError,...networkError,...powerError,...stateError,...positionError];

    const finalData = {
        protocol: protocol,
        imei: imei,
        deviceName: deviceName,
        generatedTime: data,
        countNumber: countNumber,
        gps: positionData,
        network: networkData,
        state: stateType,
        power: powerData
    }

    return {
        data: finalData,
        success: true,
        errors: errors
    }
}