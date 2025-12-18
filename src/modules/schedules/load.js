import {HoursLoad} from "../form/hours-load.js"

export function schedulesDay(){
  // Seleciona o input de data do formulário
  const selectedDate = document.querySelector(".date-form")
  
  if (!selectedDate) {
    console.warn("Elemento de data não encontrado")
    return
  }
  
  const date = selectedDate.value
  const availableHours = HoursLoad({ date })
  
  console.log(`Carregando agendamentos para ${date}`, availableHours)
  
  return availableHours
}