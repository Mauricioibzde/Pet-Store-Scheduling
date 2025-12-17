import dayjs from "dayjs"   // importa a biblioteca Day.js para trabalhar com datas

// Seleciona o elemento <form> no DOM
const form = document.querySelector("form")

// Seleciona o input de data no DOM (com a classe "date")
const selectedDate = document.querySelector(".date")
const selectedDateSchedule = document.querySelector(".date-form")
console.log(selectedDateSchedule)

// Cria uma variável com a data atual formatada em "YYYY-MM-DD"
// Esse formato é necessário para preencher inputs do tipo date
const today = dayjs(new Date()).format("YYYY-MM-DD")

// Define o valor inicial do input de data como a data de hoje
selectedDate.value = today
selectedDateSchedule.value = today

// Define o valor mínimo do input de data como a data de hoje
// Isso impede que o usuário selecione datas anteriores
selectedDate.min = today
selectedDateSchedule.min = today


// Adiciona um listener para o evento de envio do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault(); // previne o comportamento padrão do form (recarregar a página)
  console.log("enviado"); // imprime "enviado" no console quando o form é submetido

  // Seleciona o container onde os horários da manhã são exibidos
  const morning = document.querySelector(".morning");

  // Cria um novo elemento <li>
  const li = document.createElement("li");

  // Define o conteúdo HTML do <li>
  // Aqui você tinha `<p><\p>` que está incorreto. O correto seria:
  li.innerHTML = `    
            <div class="row">
          <div class="col time">09:00</div>
          <div class="col who"><b>Thor</b> <span class="muted">/ Fernanda Costa</span></div>
          <div class="col service">Vacinação</div>
          <div class="col action"><a href="#" class="link">Remover agendamento</a></div>
        </div>
      </li>`; // Exemplo de conteúdo

  // Adiciona o <li> ao container .morning
  morning.appendChild(li);

  // Exibe no console o container para verificação
  console.log(morning);
});

