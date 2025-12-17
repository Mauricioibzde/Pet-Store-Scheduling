import { initModalAndPickers } from "../script/script-open-menu.js";
import {schedulesDay} from ".//schedules/load.js"

document.addEventListener("DOMContentLoaded", () => {
initModalAndPickers();

schedulesDay()
  
});

document.addEventListener("click", () => {
  const pickerContainer = document.querySelector(".date-picker")
  const calendar = pickerContainer.querySelector(".custom-calendar")
  if (calendar) calendar.remove()
})

