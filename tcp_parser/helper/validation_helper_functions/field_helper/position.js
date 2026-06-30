import { dateParseMain } from "../../utils.js";
import { generateError } from "../error_handling/generatePacket.js";
function convertLocalDateToUtc(localDate) {
    // .getTimezoneOffset() returns the difference in minutes (Local - UTC)
    // Multiply by 60,000 to convert minutes to milliseconds
    const timezoneOffsetMs = localDate.getTimezoneOffset() * 60 * 1000;
    
    // Add the offset to the local time to get the true UTC equivalent
    return new Date(localDate.getTime() + timezoneOffsetMs);
}

export function positionParseMain(
    inputAccuracy,
    inputSpeed,
    inputAzimuth,
    inputAltitude,
    inputLongitude,
    inputLatitude,
    inputUtcTime
){

    const utcError =  generateError("warning", "position","utc time", "invalid utc time format", inputUtcTime)
    const { data, errors, success } = dateParseMain(inputUtcTime, utcError);
    const utcTime = errors.length == 0 && success ? convertLocalDateToUtc(data) : null;
    const positionData = {accuracy: Number(inputAccuracy),
        speed: Number(inputSpeed),
        azimuth: Number(inputAzimuth),
        altitude: Number(inputAltitude),
        longitude: Number(inputLongitude),
        latitude: Number(inputLatitude),
        utcTime: utcTime
    }
        
    return {
        success: true,
        data: positionData,
        errors: errors
    };
    
}