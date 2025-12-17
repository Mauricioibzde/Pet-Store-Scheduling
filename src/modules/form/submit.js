import dayjs from "dayjs"
import { hour } from "./load-schedules" // importa o array de horários

// Seleciona elementos do DOM
const form = document.querySelector("form")
const tutorInput = document.getElementById("tutor")
const petInput = document.getElementById("pet")
const phoneInput = document.getElementById("fone")
const descInput = document.getElementById("desc")
const dateInput = document.querySelector(".date-form")
const hourInput = document.getElementById("horario")
const selectedDate = document.querySelector(".date") // input usado para filtrar

// Preenche o select de horários dinamicamente
hourInput.innerHTML = "" // limpa options existentes
hour.forEach(h => {
  const option = document.createElement("option")
  option.value = h
  option.textContent = h
  hourInput.appendChild(option)
})

// Data de hoje
const today = dayjs().format("YYYY-MM-DD")
selectedDate.value = today
dateInput.value = today
selectedDate.min = today
dateInput.min = today

// Armazena todos os agendamentos
let allSchedules = []

// Função para determinar em qual bloco colocar o agendamento
function getTimeBlock(hour) {
  const h = parseInt(hour.split(":")[0])
  if (h >= 9 && h < 12) return document.querySelector(".morning")
  if (h >= 13 && h < 18) return document.querySelector(".afternoon")
  if (h >= 19 && h < 21) return document.querySelector(".night")
  return document.querySelector(".morning") // padrão
}

// Função para formatar o telefone (00) 0 0000-0000
function formatPhone(value) {
  value = value.replace(/\D/g, "")           // remove tudo que não é número
  if (value.length > 11) value = value.slice(0, 11) // limita a 11 dígitos
  value = value.replace(/^(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d{1})(\d{4})$/, "$1 $2")
  value = value.replace(/(\d{4})$/, "-$1")
  return value
}

// Aplica a máscara enquanto o usuário digita
phoneInput.addEventListener("input", (e) => {
  e.target.value = formatPhone(e.target.value)
})

// Função para renderizar agendamentos de acordo com a data filtrada
function renderSchedules(date) {
  // Limpa todos os blocos
  document.querySelector(".morning").innerHTML = ""
  document.querySelector(".afternoon").innerHTML = ""
  document.querySelector(".night").innerHTML = ""

  // Filtra agendamentos pela data selecionada
  const filtered = allSchedules.filter(s => s.date === date)

  // Adiciona cada agendamento ao bloco correto
  filtered.forEach(schedules => {
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

// Evento submit
form.addEventListener("submit", (e) => {
  e.preventDefault()

  // Verifica se algum campo está vazio
  if (!tutorInput.value || !petInput.value || !phoneInput.value || !descInput.value || !dateInput.value || !hourInput.value) {
    alert("Please fill in all fields before submitting the appointment.")
    return
  }

  const schedules = {
    tutor: tutorInput.value,
    pet: petInput.value,
    phone: phoneInput.value,
    description: descInput.value,
    date: dateInput.value,
    hour: hourInput.value
  }

  // Adiciona ao array global de agendamentos
  allSchedules.push(schedules)

  // Renderiza novamente de acordo com a data selecionada
  renderSchedules(selectedDate.value)

  // Limpa o formulário e reseta data e horário
  form.reset()
  dateInput.value = today
  hourInput.value = hour[0] // sempre volta à primeira opção do array
})

// Remover agendamento ao clicar no link
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.preventDefault()
    const li = e.target.closest("li")
    const time = li.querySelector(".time").textContent
    const date = li.querySelector(".date").textContent

    // Remove do array
    allSchedules = allSchedules.filter(s => !(s.hour === time && s.date === date))

    // Remove do DOM
    li.remove()
  }
})

// Evento para filtrar agendamentos quando o usuário mudar a data
selectedDate.addEventListener("change", (e) => {
  renderSchedules(e.target.value)
})






//



function createCustomCalendar(year, month, appointments) {
  const calendar = document.createElement('div');
  calendar.classList.add('custom-calendar');
  


  // Botão filtrar
  const monthYear = document.createElement('div');
  const filterBtn = document.createElement('input');
  
  filterBtn.innerText = "Apply"

  monthYear.classList.add("month-year-on-the-calendary")
  const btn_select_month = document.createElement("button")
  btn_select_month.textContent = dayjs().format("YYYY-MM-DD")
 

  filterBtn.classList.add('calendar-filter');

  filterBtn.addEventListener('click', () => {
    const dateValue = selectedDate.value;
    renderSchedules(dateValue); // aplica filtro
    // o calendário continua aberto
  });
  calendar.appendChild(filterBtn);
  calendar.appendChild(monthYear);
  monthYear.appendChild(btn_select_month)

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement('div');
    dayEl.classList.add('day');
    dayEl.textContent = day;

    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const count = appointments.filter(a => a.date === dateStr).length;

    if (count > 0) {
      const icon = document.createElement('span');
      icon.classList.add('appointment-count');
      icon.textContent = count;
      dayEl.appendChild(icon);
    }

    dayEl.addEventListener('click', () => {
      const dayStr = String(day).padStart(2, '0');
      const monthStr = String(month+1).padStart(2, '0');
      const dateValue = `${year}-${monthStr}-${dayStr}`;
      selectedDate.value = dateValue;
      // não fecha automaticamente, usuário pode clicar em “Filtrar”
    });

    calendar.appendChild(dayEl);
  }

  return calendar;
}



// Mostrar calendário ao clicar no input

const btn_show_status_calendary = document.querySelector(".btn-show-status-calendary")
btn_show_status_calendary.addEventListener('click', (e) => {
  e.stopPropagation(); // evita fechar imediatamente

  const [year, month,] = selectedDate.value.split('-').map(Number);
  const calendar = createCustomCalendar(year, month - 1, allSchedules);

  const pickerContainer = document.querySelector('.date-picker');
  const existing = pickerContainer.querySelector('.custom-calendar');
  if (existing) existing.remove();

  pickerContainer.appendChild(calendar);
});

// Fechar calendário se clicar fora
document.addEventListener('click', () => {
  const pickerContainer = document.querySelector('.date-picker');
  const calendar = pickerContainer.querySelector('.custom-calendar');
 
  if (calendar) calendar.remove();
});


//



// Fechar calendário se clicar fora
document.addEventListener('click', () => {
  const pickerContainer = document.querySelector('.date-picker');
  const calendar = pickerContainer.querySelector('.custom-calendar');
  if (calendar) calendar.remove();
});
