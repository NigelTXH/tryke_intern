export function parseNetworkType(input) {
    const valid_codes = [0,1,2,3];
    if(input !== null && valid_codes.includes(input)){
        return true;
    }
    return false;
};