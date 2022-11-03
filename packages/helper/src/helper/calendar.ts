
export const getNextDayOfWeek = (dayName : string, refDate : Date, excludeToday = true) => {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
        .indexOf(dayName.slice(0,3).toLowerCase());

    if (dayOfWeek < 0) throw new Error(`illegal dayName: ${dayName}`);

    refDate.setHours(0,0,0,0);
    refDate.setDate(refDate.getDate() + +!!excludeToday + 
                    (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
                    
    return refDate;
};

export const addDaysToDate = (date : Date, days : number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};