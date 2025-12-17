import dayjs from "dayjs"
import { hour } from "./load-schedules"

// ======================
// ELEMENTOS DO DOM
// ======================
const form = document.querySelector("form")
const tutorInput = document.getElementById("tutor")
const petInput = document.getElementById("pet")
const phoneInput = document.getElementById("fone")
const descInput = document.getElementById("desc")
const dateInput = document.querySelector(".date-form")
const hourInput = document.getElementById("horario")
const selectedDate = document.querySelector(".date")

// ======================
// HORÁRIOS
// ======================
hourInput.innerHTML = ""
hour.forEach(h => {
  const option = document.createElement("option")
  option.value = h
  option.textContent = h
  hourInput.appendChild(option)
})

// ======================
// DATA ATUAL
// ======================
const today = dayjs().format("YYYY-MM-DD")
selectedDate.value = today
dateInput.value = today
selectedDate.min = today
dateInput.min = today

// ======================
// AGENDAMENTOS
// ======================
let allSchedules = []

function getTimeBlock(hour) {
  const h = parseInt(hour.split(":")[0])
  if (h >= 9 && h < 12) return document.querySelector(".morning")
  if (h >= 13 && h < 18) return document.querySelector(".afternoon")
  if (h >= 19 && h < 21) return document.querySelector(".night")
  return document.querySelector(".morning")
}

// ======================
// FORMATAÇÃO TELEFONE
// ======================
function formatPhone(value) {
  value = value.replace(/\D/g, "")
  if (value.length > 11) value = value.slice(0, 11)
  value = value.replace(/^(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d{1})(\d{4})$/, "$1 $2")
  value = value.replace(/(\d{4})$/, "-$1")
  return value
}

phoneInput.addEventListener("input", e => {
  e.target.value = formatPhone(e.target.value)
})

// ======================
// RENDERIZAÇÃO DE AGENDAMENTOS
// ======================
function renderSchedules(date) {
  document.querySelector(".morning").innerHTML = ""
  document.querySelector(".afternoon").innerHTML = ""
  document.querySelector(".night").innerHTML = ""

  allSchedules
    .filter(s => s.date === date)
    .forEach(schedules => {
      const block = getTimeBlock(schedules.hour)
      const li = document.createElement("li")
      li.innerHTML = `
        <div class="row">
          <div class="col time">${schedules.hour}</div>
          <div class="col date">${schedules.date}</div>
          <div class="col who"><b>${schedules.pet}</b> <span class="muted">/ ${schedules.tutor}</span></div>
          <div class="col service">${schedules.description}</div>
          <div class="col action"><a href="#" class="link remove">Remove appointment</a></div>
        </div>
      `
      block.appendChild(li)
    })
}

// ======================
// SUBMIT FORMULÁRIO
// ======================
form.addEventListener("submit", e => {
  e.preventDefault()

  if (!tutorInput.value || !petInput.value || !phoneInput.value || !descInput.value || !dateInput.value || !hourInput.value) {
    alert("Please fill in all fields before submitting the appointment.")
    return
  }

  allSchedules.push({
    tutor: tutorInput.value,
    pet: petInput.value,
    phone: phoneInput.value,
    description: descInput.value,
    date: dateInput.value,
    hour: hourInput.value
  })

  renderSchedules(selectedDate.value)
  form.reset()
  dateInput.value = today
  hourInput.value = hour[0]
})

// ======================
// REMOVER AGENDAMENTO
// ======================
document.addEventListener("click", e => {
  if (!e.target.classList.contains("remove")) return

  e.preventDefault()
  const li = e.target.closest("li")
  const time = li.querySelector(".time").textContent
  const date = li.querySelector(".date").textContent

  allSchedules = allSchedules.filter(s => !(s.hour === time && s.date === date))
  li.remove()
})

// ======================
// CALENDÁRIO CUSTOM
// ======================
function createCustomCalendar(year, month, appointments) {
  const calendar = document.createElement("div")
  calendar.classList.add("custom-calendar")
  calendar.addEventListener("click", e => e.stopPropagation())

  let currentYear = year
  let currentMonth = month

  // Header com label, input e ícone
  const monthYear = document.createElement("div")
  monthYear.classList.add("month-year-on-the-calendary")
  monthYear.style.position = "relative"

  const monthLabel = document.createElement("div")
  monthLabel.classList.add("month-label")
  monthLabel.textContent = dayjs(`${year}-${month + 1}-01`).format("MMMM YYYY")

  const monthInput = document.createElement("input")
  monthInput.type = "month"
  monthInput.classList.add("month-input-calendary")
  monthInput.value = dayjs(`${year}-${month + 1}-01`).format("YYYY-MM")
  monthInput.style.opacity = 0
  monthInput.style.position = "absolute"
  monthInput.style.top = 0
  monthInput.style.left = 0
  monthInput.style.width = "100%"
  monthInput.style.height = "100%"
  monthInput.style.cursor = "pointer"
  monthInput.style.zIndex = 2

  const monthIcon = document.createElement("span")
  monthIcon.classList.add("month-icon")
  const img = document.createElement("img")
  img.src = "assets/icon/Calendar-Minimalistic--Streamline-Solar.svg"
  img.alt = "Calendar"
  monthIcon.appendChild(img)

  // Adiciona elementos no header
  monthYear.append(monthLabel, monthIcon, monthInput)
  calendar.appendChild(monthYear)

  // Abre seletor de mês ao clicar em qualquer lugar do header
  monthYear.addEventListener("click", () => monthInput.click())

  // Atualiza label e dias ao mudar o mês
  monthInput.addEventListener("change", e => {
    const [y, m] = e.target.value.split("-").map(Number)
    currentYear = y
    currentMonth = m - 1
    monthLabel.textContent = dayjs(`${y}-${m}-01`).format("MMMM YYYY")
    renderDays()
  })

  // Botão Apply
  const filterBtn = document.createElement("button")
  filterBtn.innerText = "Apply"
  filterBtn.classList.add("calendar-filter")
  filterBtn.addEventListener("click", () => renderSchedules(selectedDate.value))
  calendar.appendChild(filterBtn)

  // Renderiza os dias do mês
  function renderDays() {
    calendar.querySelectorAll(".day").forEach(d => d.remove())
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement("div")
      dayEl.classList.add("day")
      dayEl.textContent = day

      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const count = appointments.filter(a => a.date === dateStr).length
      if (count > 0) {
        const icon = document.createElement("span")
        icon.classList.add("appointment-count")
        icon.textContent = count
        dayEl.appendChild(icon)
      }

      dayEl.addEventListener("click", () => {
        selectedDate.value = dateStr
      })

      calendar.appendChild(dayEl)
    }
  }

  renderDays()
  return calendar
}

// ======================
// ABRIR / FECHAR CALENDÁRIO
// ======================
document.querySelector(".btn-show-status-calendary").addEventListener("click", e => {
  e.stopPropagation()
  const [year, month] = selectedDate.value.split("-").map(Number)
  const calendar = createCustomCalendar(year, month - 1, allSchedules)
  const picker = document.querySelector(".date-picker")
  picker.querySelector(".custom-calendar")?.remove()
  picker.appendChild(calendar)
})

document.addEventListener("click", () => {
  document.querySelector(".custom-calendar")?.remove()
})
