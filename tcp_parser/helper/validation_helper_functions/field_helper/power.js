import { checkInputIsNumber } from "../../utils.js";
import { generateError } from "../error_handling/generatePacket.js";
export function parsePowerMain(
    powerSupply,
    mainVoltageMv,
    backupVoltageMv,
    backupBatteryPercent
) {

    const error = generateError("warning", "power supply", "power supply code", "power supply code is not a number", powerSupply);
    const { data: powerType, errors: errors } = checkInputIsNumber(powerSupply, error);
    const powerData = {
        powerSupply: powerType,
        mainVoltageMv: Number(mainVoltageMv),
        backupBatteryPercent: Number(backupBatteryPercent),
        backupVoltageMv: Number(backupVoltageMv)
    };
    return {
        success: true,
        data: powerData,
        errors: errors
    }
}