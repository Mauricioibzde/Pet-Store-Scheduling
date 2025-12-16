export function initModalAndPickers() {
  const openBtn = document.getElementById('open-appointment');
  const modal = document.getElementById('appointment-modal');

  if (!openBtn || !modal) return;

  const closeBtn = modal.querySelector('.modal-close');

  const focusableSelector = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])',
    'select:not([disabled])', 'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function trapFocus(e) {
    if (!modal.classList.contains('is-open')) return;
    if (e.key !== 'Tab') return;

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
  }

  function openModal() {
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');

    modal.querySelector('#tutor')?.focus();

    document.addEventListener('keydown', onEsc);
    document.addEventListener('keydown', trapFocus);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('keydown', trapFocus);
    openBtn.focus();
  }

  function onEsc(e) {
    if (e.key === 'Escape') closeModal();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  initCustomPickers();
}

/* ---------- picker ---------- */
export function initCustomPickers() {
  document.querySelectorAll('.picker.picker--custom').forEach(picker => {
    const select = picker.querySelector('select');
    const btn = picker.querySelector('.picker-trigger');
    const list = picker.querySelector('.picker-menu');

    if (!select || !btn || !list) return;

    list.innerHTML = '';

    [...select.options].forEach(opt => {
      const li = document.createElement('li');
      li.textContent = opt.text;
      li.dataset.value = opt.value;

      if (opt.selected) li.setAttribute('aria-selected', 'true');

      li.addEventListener('click', () => {
        select.value = opt.value;
        btn.textContent = opt.text;

        picker.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });

      list.appendChild(li);
    });
  });
}
