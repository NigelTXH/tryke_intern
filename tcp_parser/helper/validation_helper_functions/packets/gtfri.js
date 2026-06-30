import { positionParseMain } from "../field_helper/position.js";
import { parsePowerMain } from "../field_helper/power.js";
import { parseGTFRINetworkMain } from "../field_helper/network.js";
import { generateError } from "../error_handling/generatePacket.js";
import { checkInputIsNumber } from "../../utils.js";
import { parseECUMain } from "../field_helper/ecu.js";
import { dateParseMain } from "../../utils.js";
export function parseGTFRI(fields){

    const [,protocol,
        imei, 
        deviceName,
        vin,
        qrCode,
        ,
        ,
        reportType,
        ecuErrorCode,
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
        csq,
        networkType,
        state,
        powerSupply,
        mainVoltageMv,
        backupVoltageMv,
        backupBatteryPercent,
        errorType,
        alive,
        locked,
        taskId,
        ecuInfo,
        scooterBatteryPercent,
        generatedTime,
        countNumber 
    ] = fields; //destructuring so I do not need to deal with indexes

    // const { data: protocolInfo, valid: validProtocol, errors: protocolError, success: successProtocol } = parseProtocolMain(protocol!)

    const { data: positionData, errors: positionError, success: successPosition } = positionParseMain(
        accuracy, speed, azimuth, altitude, longitude, latitude, utcTime
    )

    const { data: powerData, errors: powerError, success: successPower } = parsePowerMain(
        powerSupply, mainVoltageMv, backupVoltageMv, backupBatteryPercent
    );

    const { data: networkData, errors: networkError, success: successNetwork } = parseGTFRINetworkMain(mcc, mnc, lac, cellId, csq, networkType)

    const stateErrorMessage = generateError("warning", "state", 'state', "invalid state code", state)
    const { data: stateType, errors: stateError, success: successState } = checkInputIsNumber(state, stateErrorMessage);

    const { data: ecuData, errors: ecuError, success: successEcu } = parseECUMain(errorType, alive, locked, taskId, ecuInfo)

    const error = generateError("warning", "packet","generated time", "invalid date format", generatedTime)
    const { data: dateData, errors: dateError, success: successDate } = dateParseMain(generatedTime, error)

    const errors = [...positionError, ...powerError, ...networkError, ...stateError, ...ecuError,...dateError];

    const finalPacket = {
        protocol: protocol,
        imei: imei,
        deviceName: deviceName,
        generatedTime: dateData,
        countNumber: countNumber,
        reportType: Number(reportType),
        ecuErrorCode: ecuErrorCode,
        gps: positionData,
        power: powerData,
        network: networkData,
        state: stateType,
        scooterBatteryPercent: Number(scooterBatteryPercent),
        ecu: ecuData,
    };

    return {
        data: finalPacket,
        errors: errors,
        success: true
    };
}