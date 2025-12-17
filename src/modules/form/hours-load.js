import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"

export function HoursLoad({ date }) {
  const opening = openingHours.map((hour) => {
    // Cria um objeto Dayjs com a data e hora exata
    const hourDate = dayjs(`${date}T${hour}:00`)
    
    // Checa se a hora ainda não passou
    const isHourPast = hourDate.isAfter(dayjs())

    return {
      hour,
      available: isHourPast
    }
  })

  // Aqui você pode renderizar os horários ou retornar
  opening.forEach(({ hour, available }) => {
    console.log(`Hour: ${hour}, Available: ${available}`)
  })

  return opening
}
