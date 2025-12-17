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
const selectedDateInput = document.querySelector(".date")
const calendarSection = document.querySelector(".Calendar")
const showCalendarBtn = document.querySelector(".btn-show-status-calendary")

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
selectedDateInput.value = today
dateInput.value = today
selectedDateInput.min = today
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
          <div class="col phone">${schedules.phone}</div>
          <div class="col service">${schedules.description}</div>
          <div class="col action"><a href="#" class="link remove">Remove appointment</a></div>
        </div>
      `
      block.appendChild(li)
    })
}

// ======================
// FORMULÁRIO
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

  renderSchedules(selectedDateInput.value)
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
// CRIAR CALENDÁRIO DINÂMICO
// ======================
function createCustomCalendar(year, month, appointments) {
  const calendar = document.createElement("div")
  calendar.classList.add("custom-calendar")
  calendar.addEventListener("click", e => e.stopPropagation())

  let currentYear = year
  let currentMonth = month

  // Header com label e botões
  const monthYear = document.createElement("div")
  monthYear.classList.add("month-year-on-the-calendary")

  const btnPrev = document.createElement("button")
  btnPrev.classList.add("btn-next-month-lef")
  btnPrev.innerHTML = `<img src="./assets/icon/arrow.svg" alt="Prev">`

  const monthLabel = document.createElement("p")
  monthLabel.classList.add("month-label")
  monthLabel.textContent = dayjs(`${currentYear}-${currentMonth + 1}-01`).format("MMMM YYYY")

  const btnNext = document.createElement("button")
  btnNext.classList.add("btn-next-month-right")
  btnNext.innerHTML = `<img src="./assets/icon/arrow.svg" alt="Next">`

  monthYear.append(btnPrev, monthLabel, btnNext)
  calendar.appendChild(monthYear)

  const filterBtn = document.createElement("button")
  filterBtn.classList.add("calendar-filter")
  filterBtn.innerHTML = ` <img class="close-img" src="./assets/icon/close.png" alt="Next">`
  filterBtn.addEventListener("click", () => {
    renderSchedules(selectedDateInput.value)
  })
  calendar.appendChild(filterBtn)

  function renderDays() {
    calendar.querySelectorAll(".day").forEach(d => d.remove())
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement("div")
      dayEl.classList.add("day")
      dayEl.textContent = day

      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
      const count = appointments.filter(a => a.date === dateStr).length
      if (count > 0) {
        const span = document.createElement("span")
        span.classList.add("appointment-count")
        span.textContent = count
        dayEl.appendChild(span)
      }

      dayEl.addEventListener("click", () => {
        selectedDateInput.value = dateStr
        renderSchedules(dateStr)
      })

      calendar.appendChild(dayEl)
    }
  }

  btnPrev.addEventListener("click", () => {
    currentMonth--
    if (currentMonth < 0) {
      currentMonth = 11
      currentYear--
    }
    monthLabel.textContent = dayjs(`${currentYear}-${currentMonth + 1}-01`).format("MMMM YYYY")
    renderDays()
  })

  btnNext.addEventListener("click", () => {
    currentMonth++
    if (currentMonth > 11) {
      currentMonth = 0
      currentYear++
    }
    monthLabel.textContent = dayjs(`${currentYear}-${currentMonth + 1}-01`).format("MMMM YYYY")
    renderDays()
  })

  renderDays()
  return calendar
}

// ======================
// ABRIR / FECHAR CALENDÁRIO
// ======================
showCalendarBtn.addEventListener("click", e => {
  e.stopPropagation()
  calendarSection.querySelector(".custom-calendar")?.remove()
  const [year, month] = selectedDateInput.value.split("-").map(Number)
  const calendar = createCustomCalendar(year, month - 1, allSchedules)
  calendarSection.appendChild(calendar)
})

document.addEventListener("click", () => {
  document.querySelector(".custom-calendar")?.remove()
})
