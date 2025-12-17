import dayjs from "dayjs"
import {openingHours} from "../../utils/opening-hours.js"

export function HoursLoad({date}) {
 const opening = openingHours.map((hour)=>{
 const [schedulesHour] = hour.split(":")
 console.log(morning)


    const isHourPast = dayjs(date).add(schedulesHour, "hour").isAfter(dayjs())
    console.log(schedulesHour , isHourPast)

    return {
        hour,
        available: isHourPast,
    }

    console.log(opening)
 })

 opening.forEach(({hour,available})=>{
   

 })
}


