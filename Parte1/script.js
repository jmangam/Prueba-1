const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const pillContainer = document.querySelector('.pill-container');
const clearFiltersBtn = document.querySelector('.boton');
const toggleButtons = document.querySelectorAll('.btn-toggle');

function handleCheckboxClick(event) {
  const checkbox = event.target;
  const checkboxName = checkbox.name;

  if (checkbox.checked) {
    addFilterPill(checkboxName);
  } else {
    removeFilterPill(checkboxName);
  }
}

function handleClearFiltersClick() {
  clearFilters();
}

function addFilterPill(filterName) {
  const filterPill = document.createElement('div');
  filterPill.classList.add('pill');
  filterPill.dataset.filterName = filterName;
  filterPill.innerHTML = `
    <span>${filterName}</span>
    <button class="pill-close">X</button>
  `;
  pillContainer.appendChild(filterPill);

  const pillCloseBtn = filterPill.querySelector('.pill-close');
  pillCloseBtn.addEventListener('click', () => {
    removeFilterPill(filterName);
    const correspondingCheckbox = document.querySelector(`input[type="checkbox"][name="${filterName}"]`);
    correspondingCheckbox.checked = false;
  });
}

function removeFilterPill(filterName) {
  const filterPill = document.querySelector(`.pill[data-filter-name="${filterName}"]`);
  if (filterPill) {
    filterPill.remove();
  }
}

function clearFilters() {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  pillContainer.innerHTML = '';
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', handleCheckboxClick);
});

clearFiltersBtn.addEventListener('click', handleClearFiltersClick);

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      content.classList.toggle('hidden');
      if (button.textContent === '+') {
        button.textContent = '-';
      } else {
        button.textContent = '+';
      }
    });
  });