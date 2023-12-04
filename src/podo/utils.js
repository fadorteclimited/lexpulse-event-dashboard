
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const getAbbreviation = (num) => {

    if (num === 1 || num === 21 || num === 31) {
        return num.toString() + 'st'
    } else {
        return num.toString() + 'th'
    }
}

export const monthString = (num) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return months[num];
}

export const monthStringShort = (num) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[num];
}

export const monthInt = (month) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let finalIndex = 0;
    for (let index = 0; index <= months.length; index++ ){
        if (months.at(index).toLocaleLowerCase() === month.toLocaleLowerCase()){
            finalIndex = index;
        }
    }
    return finalIndex;
}

export const dayStringShort = (num) => {
    const days = [ "Sun",  "Mon",  "Tue",  "wed",  "thu",  "Fri",  "Sat", ]
    return days[num];
}

