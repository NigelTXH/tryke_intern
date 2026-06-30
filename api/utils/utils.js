export async function convertDate(yearInput, monthInput, dayInput){
    if(Array.isArray(yearInput) || Array.isArray(monthInput) || Array.isArray(dayInput)){
        throw new Error("Invalid Input, do only numbers1");
    }
    const year = Number(yearInput);
    const month = Number(monthInput);
    const day = Number(dayInput);

    if(Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)){
        return null;
    }

    const date = new Date(year, month - 1, day); 
    return date;
}