import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"

export function HoursLoad({ date }) {
  const opening = openingHours.map((hour) => {
    // Cria um objeto Dayjs com a data e hora exata
    const hourDate = dayjs(`${date}T${hour}:00`)
    
    // Checa se a hora ainda não passou (horários futuros são disponíveis)
    const isHourAvailable = hourDate.isAfter(dayjs())

    return {
      hour,
      available: isHourAvailable
    }
  })

  // Debug: log dos horários disponíveis
  console.log(`Horários disponíveis para ${date}:`, opening.filter(h => h.available))

  return opening
}
