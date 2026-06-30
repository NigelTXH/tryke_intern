export function parseLockType(input) {
    if(input !== null && input == 4){
        return true;
    }
    return false;
}; 

export function parseLockState(input) {
    const valid_codes = [0,1];
    if(input !== null && valid_codes.includes(input)){
        return true;
    }
    return false;
};