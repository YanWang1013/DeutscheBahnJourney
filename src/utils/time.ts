import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function formatTime(date: Date) {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const germanDate = dayjs(date).tz("Europe/Berlin");
    const time = germanDate.format("HH:mm");
    // const hours = rDate.getHours().toString().padStart(2, "0");
    // const minutes = rDate.getMinutes().toString().padStart(2, "0");
    return `${time}`;
}