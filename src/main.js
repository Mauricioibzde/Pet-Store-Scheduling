import "./style/index.css";
import dayjs from "dayjs";
import "dayjs/locale/de.js";
import schedules from "./modules/schedules/load.js"
import form from "./modules/form/submit.js"
import loadPage from "./modules/load-page.js"

dayjs.locale("de");

console.log(dayjs().format("HH:mm")); // hora:minuto

