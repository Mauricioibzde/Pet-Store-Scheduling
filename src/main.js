import "./style/index.css";

// seu JS abaixo
console.log("App loaded");


// script/script.js

document.addEventListener('DOMContentLoaded', () => {
  /* ========= Modal open/close ========= */
  const openBtn = document.getElementById('open-appointment');
  const modal = document.getElementById('appointment-modal');
  const closeBtn = modal.querySelector('.modal-close');

  const focusableSelector = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])',
    'select:not([disabled])', 'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function trapFocus(e){
    if (!modal.classList.contains('is-open')) return;
    if (e.key !== 'Tab') return;

    const focusables = [...modal.querySelectorAll(focusableSelector)];
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first){
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last){
      first.focus();
      e.preventDefault();
    }
  }

  function openModal(){
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    setTimeout(() => {
      const firstInput = modal.querySelector('#tutor');
      if (firstInput) firstInput.focus();
    }, 0);
    document.addEventListener('keydown', onEsc);
    document.addEventListener('keydown', trapFocus);
  }

  function closeModal(){
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('keydown', trapFocus);
    openBtn.focus();
  }

  function onEsc(e){
    if (e.key === 'Escape') closeModal();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); // click fora fecha
  });

  /* ========= Custom select (picker) ========= */
  initCustomPickers();
});

/* Constrói pickers custom a partir do <select> */
function initCustomPickers(){
  document.querySelectorAll('.picker.picker--custom').forEach(picker => {
    const select = picker.querySelector('select');
    const btn = picker.querySelector('.picker-trigger');
    const list = picker.querySelector('.picker-menu');

    if (!select || !btn || !list) return;

    // Evitar duplicar lista se já inicializado
    list.innerHTML = '';

    Array.from(select.options).forEach(opt => {
      const li = document.createElement('li');
      li.textContent = opt.text;
      li.setAttribute('role', 'option');
      li.dataset.value = opt.value;
      if (opt.selected) li.setAttribute('aria-selected', 'true');
      list.appendChild(li);

      li.addEventListener('click', () => {
        select.value = opt.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        btn.textContent = opt.text;
        list.querySelectorAll('[aria-selected="true"]').forEach(n => n.removeAttribute('aria-selected'));
        li.setAttribute('aria-selected', 'true');
        picker.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Label inicial
    btn.textContent = select.options[select.selectedIndex]?.text || 'Select';

    // Abre/fecha
    btn.addEventListener('click', () => {
      const isOpen = picker.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!picker.contains(e.target)) {
        picker.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Acessibilidade via teclado
    picker.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}