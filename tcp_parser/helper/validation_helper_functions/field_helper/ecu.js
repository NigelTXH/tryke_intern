import { generateError } from "../error_handling/generatePacket.js";
import { checkInputIsNumber } from "../../utils.js";
export function parseECUMain(
    errorType, alive, locked, taskId, ecuInfo
){

    const errorForEcuError = generateError("warning", "ecu", "ecu error", "input is not a number", errorType);
    const errorForEcuAlive = generateError("warning", "ecu", "ecu alive", "input is not a number", alive);
    const errorForEcuLock = generateError("warning", "ecu", "ecu lock", "input is not a number", locked);
    const ecuError = checkInputIsNumber(errorType, errorForEcuError );
    const ecuAlive = checkInputIsNumber(alive,errorForEcuAlive);
    const ecuLock = checkInputIsNumber(locked,errorForEcuLock);

    const ecuData = {
        errorType: ecuError.data,
        alive: ecuAlive.data,
        locked: ecuLock.data
    };

    const compiledErrors = [...ecuError.errors,...ecuAlive.errors,...ecuLock.errors]

    return { success: true, data: ecuData, errors: compiledErrors };
}