import { generateError } from "./validation_helper_functions/error_handling/generatePacket.js";
function dateParse(date){

    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(4, 6)) - 1; // Subtract 1 for 0-indexed months
    const day = parseInt(date.substring(6, 8));
    const hour = parseInt(date.substring(8, 10));
    const minute = parseInt(date.substring(10, 12));
    const second = parseInt(date.substring(12, 14));

    const localDate = new Date(year, month, day, hour, minute, second);
    return localDate;

}

function dateParseMain(date, errorInput){
        if(date === null){ // This if check exists separately because we already did an empty field check at envelope.ts
            return {
                success: false,
                data: null,
                errors: []
            }
        }
        if (date.length !== 14){
            const error = errorInput;
            return {
                success: false,
                data: null,
                errors: [error]
            }
    
        }
        else{
            return {
                success: true,
                data: dateParse(date),
                errors: []
            }
        }
}

function parseState(input) {
    if (input === "41") return { success: true, data: 41, errors: [] };
    if (input === "42") return { success: true, data: 42, errors: [] };

    const error = generateError("warning", "state", 'state', "invalid state code", input)
    return { success: false, data: null, errors: [error] }; 


}

function checkInputIsNumber(input, error) {

    if(Number.isNaN(Number(input))){
        return { success: true, data: null , errors: [error]};
    }
    else if(input === null){
        return { success: true, data: null , errors: []};
    }

    return { success: true, data: Number(input) , errors: []};
}

function normaliseFields(fields, fieldNames){
    const errors = [];

    for (const [key, fieldName] of Object.entries(fieldNames)) {
        const index = Number(key);

        // reserved field
        if (!fieldName) {
            continue;
        }

        const value = fields[index];

        // normalise empty string -> null
        if (value === "") {
            fields[index] = null;
        }

        // warn if empty
        if (fields[index] === null) {
            errors.push({
                severity: "warning",
                stage: "packet",
                field: fieldName,
                reason: "EMPTY FIELD",
                rawValue: "No value"
            });
        }
    }

    return errors;
}

export { dateParse, parseState, dateParseMain, checkInputIsNumber, normaliseFields };