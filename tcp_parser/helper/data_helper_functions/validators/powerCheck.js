export function parsePowerSupplyCode(input) {
    const valid_codes = [0,1];
    if(input !== null && valid_codes.includes(input)){
        return true;
    }
    return false;
};  