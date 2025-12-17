import "./style/index.css";
import dayjs from "dayjs";        // importar da node_modules
import "dayjs/locale/de";          // se quiser em alemão
import schedules from "./modules/schedules/load.js"
import form from "./modules/form/submit.js"
import loadPage from "./modules/load-page.js"

dayjs.locale("de");               // define alemão globalmente

console.log(dayjs().format("HH:mm")); // hora:minuto

