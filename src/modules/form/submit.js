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
const overlay = document.querySelector(".calendar-overlay")
const openCalendarBtn = document.querySelector(".btn-show-status-calendary")

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
          <div class="col who">
            <b>${schedules.pet}</b>
            <span class="muted">/ ${schedules.tutor}</span>
          </div>
          <div class="col phone">${schedules.phone}</div>
          <div class="col service">${schedules.description}</div>
          <div class="col action">
            <a href="#" class="link remove">Remove appointment</a>
          </div>
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

  if (
    !tutorInput.value ||
    !petInput.value ||
    !phoneInput.value ||
    !descInput.value ||
    !dateInput.value ||
    !hourInput.value
  ) {
    alert("Please fill in all fields.")
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

  allSchedules = allSchedules.filter(
    s => !(s.hour === time && s.date === date)
  )

  li.remove()
})

// ======================
// CALENDÁRIO
// ======================
function createCustomCalendar(year, month, appointments) {
  const calendar = document.createElement("div")
  calendar.classList.add("custom-calendar")

  // 🚫 Impede clique vazar
  calendar.addEventListener("click", e => e.stopPropagation())

  let currentYear = year
  let currentMonth = month

  const header = document.createElement("div")
  header.classList.add("month-year-on-the-calendary")

  const prev = document.createElement("button")
  prev.classList.add("btn-next-month-lef")
  prev.innerHTML = `
   <img src="./assets/icon/arrow.svg" alt="">
  `

  const label = document.createElement("p")
  label.textContent = dayjs(`${year}-${month + 1}-01`).format("MMMM YYYY")

  const next = document.createElement("button")
  next.classList.add("btn-next-month-right")
  next.innerHTML = `
     <img src="./assets/icon/arrow.svg" alt="">
  `

  header.append(prev, label, next)
  calendar.appendChild(header)

  function renderDays() {
    calendar.querySelectorAll(".day").forEach(d => d.remove())

    const days = new Date(currentYear, currentMonth + 1, 0).getDate()

    for (let d = 1; d <= days; d++) {
      const dayEl = document.createElement("div")
      dayEl.classList.add("day")
      dayEl.textContent = d

      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`

      const count = appointments.filter(a => a.date === dateStr).length
      if (count) {
        const badge = document.createElement("span")
        badge.classList.add("appointment-count")
        badge.textContent = count
        dayEl.appendChild(badge)
      }

      dayEl.addEventListener("click", () => {
        selectedDateInput.value = dateStr
        renderSchedules(dateStr)
        closeCalendar()
      })

      calendar.appendChild(dayEl)
    }
  }

  prev.onclick = () => {
    currentMonth--
    if (currentMonth < 0) {
      currentMonth = 11
      currentYear--
    }
    label.textContent = dayjs(`${currentYear}-${currentMonth + 1}-01`).format("MMMM YYYY")
    renderDays()
  }

  next.onclick = () => {
    currentMonth++
    if (currentMonth > 11) {
      currentMonth = 0
      currentYear++
    }
    label.textContent = dayjs(`${currentYear}-${currentMonth + 1}-01`).format("MMMM YYYY")
    renderDays()
  }

  renderDays()
  return calendar
}

// ======================
// ABRIR / FECHAR CALENDÁRIO
// ======================
function openCalendar() {
  overlay.classList.add("active")
  calendarSection.innerHTML = ""

  const [y, m] = selectedDateInput.value.split("-").map(Number)
  const calendar = createCustomCalendar(y, m - 1, allSchedules)
  calendarSection.appendChild(calendar)
}

function closeCalendar() {
  overlay.classList.remove("active")
  calendarSection.innerHTML = ""
}

openCalendarBtn.addEventListener("click", e => {
  e.stopPropagation()
  openCalendar()
})

overlay.addEventListener("click", closeCalendar)
