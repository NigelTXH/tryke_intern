// Making it into different functions even if repetitive for now
export function parseECUErrorType(input) {
    const valid_codes = [0,1,2];
    if(input !== null && valid_codes.includes(input)){
        return true;
    }
    return false;
};  

export function parseECUAlive(input) {
    const valid_codes = [0,1];
    if(input !== null && valid_codes.includes(input)){
        return true;
    }
    return false;
};  

export function parseECULock(input) {
    const valid_codes = [0,1];
    if(input !== null && valid_codes.includes(input)){
        return true;
    }
    return false;
}; 