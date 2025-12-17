/* ==================== MODAL & PICKER ==================== */

/**
 * Inicializa o modal e os pickers customizados
 */
export function initModalAndPickers() {
  const openBtn = document.getElementById("open-appointment");
  const modal = document.getElementById("appointment-modal");

  if (!openBtn || !modal) return;

  const closeBtn = modal.querySelector(".modal-close");

  // Inicializa eventos do modal
  setupModalEvents(openBtn, closeBtn, modal);

  // Inicializa os pickers customizados
  initCustomPickers();
}

/* ==================== MODAL ==================== */

/**
 * Configura todos os eventos do modal
 * @param {HTMLElement} openBtn - botão de abrir modal
 * @param {HTMLElement} closeBtn - botão de fechar modal
 * @param {HTMLElement} modal - container do modal
 */
function setupModalEvents(openBtn, closeBtn, modal) {
  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  const trapFocus = (e) => {
    if (!modal.classList.contains("is-open") || e.key !== "Tab") return;

    const focusables = [...modal.querySelectorAll(focusableSelector)];
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  };

  const onEsc = (e) => {
    if (e.key === "Escape") closeModal();
  };

  const openModal = () => {
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");

    // Foca no primeiro input relevante, se existir
    modal.querySelector("#tutor")?.focus();

    document.addEventListener("keydown", onEsc);
    document.addEventListener("keydown", trapFocus);
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");

    document.removeEventListener("keydown", onEsc);
    document.removeEventListener("keydown", trapFocus);

    openBtn.focus();
  };

  // Eventos do modal
  openBtn.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);

  // Fecha ao clicar fora do conteúdo do modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==================== PICKERS ==================== */

/**
 * Inicializa todos os pickers customizados no documento
 */
export function initCustomPickers() {
  const pickers = document.querySelectorAll(".picker.picker--custom");

  pickers.forEach((picker) => {
    const select = picker.querySelector("select");
    const btn = picker.querySelector(".picker-trigger");
    const list = picker.querySelector(".picker-menu");

    if (!select || !btn || !list) return;

    buildPickerOptions(picker, select, btn, list);
    setupPickerEvents(picker, select, btn, list);
  });
}

/**
 * Cria os itens da lista do picker com base nas opções do select
 */
function buildPickerOptions(picker, select, btn, list) {
  list.innerHTML = "";

  [...select.options].forEach((opt) => {
    const li = document.createElement("li");
    li.textContent = opt.text;
    li.dataset.value = opt.value;

    if (opt.selected) li.setAttribute("aria-selected", "true");

    li.addEventListener("click", () => {
      select.value = opt.value;
      btn.textContent = opt.text;

      list.querySelectorAll("[aria-selected]").forEach((el) =>
        el.removeAttribute("aria-selected")
      );
      li.setAttribute("aria-selected", "true");

      picker.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });

    list.appendChild(li);
  });

  // Define o texto inicial do botão
  btn.textContent = select.options[select.selectedIndex]?.text || "Select";
}

/**
 * Configura eventos de abrir/fechar o picker e acessibilidade
 */
function setupPickerEvents(picker, select, btn, list) {
  btn.addEventListener("click", () => {
    const isOpen = picker.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Fecha picker ao clicar fora
  document.addEventListener("click", (e) => {
    if (!picker.contains(e.target)) {
      picker.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // Acessibilidade via teclado
  picker.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      btn.click();
    }
  });
}
