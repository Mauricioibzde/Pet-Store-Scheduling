import { initModalAndPickers } from "../script/script-open-menu.js";
import {schedulesDay} from ".//schedules/load.js"

document.addEventListener("DOMContentLoaded", () => {
initModalAndPickers();

schedulesDay()
  
});
