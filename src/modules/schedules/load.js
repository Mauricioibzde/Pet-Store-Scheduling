import {HoursLoad} from "../form/hours-load.js"

const selectedDate = document.querySelector(".date")

export function schedulesDay(){

const date = selectedDate.value
HoursLoad({date})

}