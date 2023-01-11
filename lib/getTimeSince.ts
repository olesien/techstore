const MONTH_NAMES = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
];

//Credit: https://muffinman.io/blog/javascript-time-ago-function/

function getFormattedDate(
    date: Date,
    prefomattedDate: string | boolean = false,
    hideYear = false
) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes: string | number = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} vid ${hours}:${minutes}`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} vid ${hours}:${minutes}`;
    }

    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. vid ${hours}:${minutes}`;
}

// --- Main function
export function timeAgo(dateParam: string) {
    if (!dateParam) {
        return null;
    }

    const date = new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(Date.now() - DAY_IN_MS);
    const seconds = Math.round((Date.now() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();

    if (seconds < 5) {
        return "nu";
    } else if (seconds < 60) {
        return `${seconds} sekunder sedan`;
    } else if (seconds < 90) {
        return "cirka en minut sedan";
    } else if (minutes < 60) {
        return `${minutes} minuter sedan`;
    } else if (isToday) {
        return getFormattedDate(date, "Idag"); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, "Igår"); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
}
