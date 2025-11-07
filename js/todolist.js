// // work with localstorage
// function saveTasksToLocalStorage() {
//   const tasks = [];
//   document.querySelectorAll('.list__item').forEach(item => {
//     const text = item.querySelector('.list__text')?.textContent.trim();
//     const done = item.classList.contains('done');
//     if (text) {
//       tasks.push({ text, done });
//     }
//   });
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }


// // upload on start
// function loadTasksFromLocalStorage() {
//   const saved = localStorage.getItem('tasks');
//   if (!saved) return;

//   const todoList = document.querySelector('.to-do-list');
//   todoList.innerHTML = ''; // ❗ Очистка списка перед загрузкой

//   const tasks = JSON.parse(saved);
//   tasks.forEach(task => {
//     const li = document.createElement('li');
//     li.className = 'list__item';
//     if (task.done) li.classList.add('done');
//     li.innerHTML = `
//       <div class="list__item-checkbox">
//         <div class="completed__button ${task.done ? 'done-btn' : ''}"></div>
//       </div>
//       <div class="space-filler"></div>
//       <div class="list__text">${task.text}</div>
//       <span class="expand-btn"><img src="../img/icons/expand-arrow.svg" alt=""></span>
//     `;
//     todoList.appendChild(li);
//   });
// }


// // TO-DO LIST FUNCTIONALITY
// document.addEventListener('click', event => {
//   const modal = document.querySelector('.modal')
//   const eTarget = event.target
//   const modalInput = document.querySelector('.modal__input')
//   const listItems = document.querySelectorAll('.list__item')
//   const todoList = document.querySelector('.to-do-list');


//   // DONE BUTTON FUNCTIONALITY
//   if (eTarget.classList.contains('completed__button') && !eTarget.classList.contains('delete-btn')) {
//     eTarget.classList.toggle('done-btn');
//     eTarget.parentElement.parentElement.classList.toggle('done');
//     saveTasksToLocalStorage();
//   }

//   // OPEN NEW TASK MODAL
//   else if (eTarget.closest('.list__controls-plus')) {
//     listItems.forEach((item) => {
//       item.classList.remove('want-delete')
//       const itemChild = item.querySelector('.list__item-checkbox .completed__button')
//       itemChild.classList.remove('delete-btn')
//     })
//     document.querySelector('.list__controls-minus').classList.remove('list__controls-minus--active')
//     modal.classList.add('modal-open')
//   }

//   // CLOSE NEW TASK MODAL
//   else if (eTarget.closest('.modal__close-btn') || eTarget.classList.contains('modal__inner')) {
//     modalInput.value = '';
//     modal.classList.remove('modal-open')
//   }

//   // SAVE NEW TASK TEXT
//   else if (eTarget.closest('.modal__save-btn')) {
//     const taskText = modalInput.value.trim();
//     if (taskText === '') return;

//     const li = document.createElement('li');
//     li.className = 'list__item';
//     li.innerHTML = `
//       <div class="list__item-checkbox">
//         <div class="completed__button"></div>
//       </div>
//       <div class="space-filler"></div>
//       <div class="list__text">
//         ${taskText}
//       </div>
//     `;
//     todoList.appendChild(li);
//     modalInput.value = '';
//     modal.classList.remove('modal-open');
//     saveTasksToLocalStorage();
//   }

//   // "DELETE MODE" FUNCTIONALITY
//   else if (eTarget.closest('.list__controls-minus')) {
//     eTarget.closest('.list__controls-minus').classList.toggle('list__controls-minus--active')
//     listItems.forEach((item) => {
//       item.classList.toggle('want-delete')
//       const itemChild = item.querySelector('.list__item-checkbox .completed__button')
//       itemChild.classList.toggle('delete-btn')
//         ;
//     })
//   }

//   // "DELETE TASK" FUNCTIONALITY
//   else if (eTarget.classList.contains('delete-btn')) {
//     const item = event.target.closest('.list__item');
//     item.remove();
//     saveTasksToLocalStorage();
//   }
// });

// document.addEventListener('dblclick', event => {
//   event.target.classList.toggle('list__text--expanded')
//   if (window.getSelection) {
//     window.getSelection().removeAllRanges();
//   } else if (document.selection) {
//     // for old IE
//     document.selection.empty();
//   }
// });


// // code for adding temporary class by right swipe
// let touchStartX = 0;
// let touchEndX = 0;
// let swipeTarget = null;

// // Сохраняем начальную позицию и целевой элемент
// document.addEventListener('touchstart', event => {
//   const el = event.target.closest('.list__text');

//   if (el) {
//     touchStartX = event.changedTouches[0].screenX;
//     swipeTarget = el;
//   }
// });

// // Сохраняем конечную позицию и обрабатываем свайп
// document.addEventListener('touchend', event => {
//   if (!swipeTarget) return;

//   touchEndX = event.changedTouches[0].screenX;
//   const deltaX = touchEndX - touchStartX;

//   if (deltaX > 40) {
//     const parentItem = swipeTarget.closest('.list__item');
//     if (parentItem) {
//       // Удаляем класс перед повторным применением
//       parentItem.classList.remove('list__item--swiped');

//       // 🔧 Форсируем перерисовку (reflow), чтобы анимация точно сработала
//       void parentItem.offsetWidth;

//       // Повторно добавляем класс, чтобы перезапустить анимацию
//       parentItem.classList.add('list__item--swiped');

//       // Удаляем класс через 2 секунды (длительность анимации)
//       setTimeout(() => {
//         parentItem.classList.remove('list__item--swiped');
//       }, 1200);
//     }
//   }

//   swipeTarget = null;
// });

// // chatGPT code for task uploading on page opening
// loadTasksFromLocalStorage();


// =====================
// TO-DO LIST SCRIPT
// =====================

// ---------- LOCAL STORAGE ----------

// Сохранение задач
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('.list__item').forEach(item => {
    const text = item.querySelector('.list__text')?.textContent.trim();
    const done = item.classList.contains('done');
    if (text) tasks.push({ text, done });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ---------- EXPAND BUTTON VISIBILITY ----------

// Проверка, выходит ли текст за пределы контейнера
function updateExpandButtons(root = document) {
  requestAnimationFrame(() => {
    const runCheck = () => {
      root.querySelectorAll('.list__text').forEach(listText => {
        const btn = listText.parentElement.querySelector('.expand-btn');
        if (!btn) return;
        if (listText.scrollHeight > listText.clientHeight) {
          btn.classList.add('expand-btn--visible');
        } else {
          btn.classList.remove('expand-btn--visible');
        }
      });
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runCheck).catch(runCheck);
    } else {
      runCheck();
    }
  });
}

// ---------- LOAD TASKS ----------

function loadTasksFromLocalStorage() {
  const todoList = document.querySelector('.to-do-list');
  const saved = localStorage.getItem('tasks');

  if (!saved) {
    updateExpandButtons();
    return;
  }

  todoList.innerHTML = '';

  const tasks = JSON.parse(saved);
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'list__item';
    if (task.done) li.classList.add('done');
    li.innerHTML = `
      <div class="list__item-checkbox">
        <div class="completed__button ${task.done ? 'done-btn' : ''}"></div>
      </div>
      <div class="space-filler"></div>
      <div class="list__text">${task.text}</div>
      <span class="expand-btn"><img src="../img/icons/expand-arrow.svg" alt=""></span>
    `;
    todoList.appendChild(li);
  });

  updateExpandButtons();
}

// ---------- MAIN INTERACTIONS ----------

document.addEventListener('click', event => {
  const modal = document.querySelector('.modal');
  const eTarget = event.target;
  const listItems = document.querySelectorAll('.list__item');
  const modalInput = document.querySelector('.modal__input');
  const todoList = document.querySelector('.to-do-list');

  // DONE BUTTON
  if (eTarget.classList.contains('completed__button') && !eTarget.classList.contains('delete-btn')) {
    eTarget.classList.toggle('done-btn');
    eTarget.closest('.list__item').classList.toggle('done');
    saveTasksToLocalStorage();
  }

  // EXPAND TASK
  else if (eTarget.closest('.expand-btn')) {
    const btn = eTarget.closest('.expand-btn');
    const text = btn.parentElement.querySelector('.list__text');
    text.classList.toggle('list__text--expanded');
    btn.classList.toggle('expand-btn--expanded');
  }

  // OPEN NEW TASK MODAL
  else if (eTarget.closest('.list__controls-plus')) {
    listItems.forEach(item => {
      item.classList.remove('want-delete');
      const itemChild = item.querySelector('.list__item-checkbox .completed__button');
      itemChild.classList.remove('delete-btn');
    });
    document.querySelector('.list__controls-minus').classList.remove('list__controls-minus--active');
    modal.classList.add('modal-open');
  }

  // CLOSE NEW TASK MODAL
  else if (eTarget.closest('.modal__close-btn') || eTarget.classList.contains('modal__inner')) {
    modalInput.value = '';
    modal.classList.remove('modal-open');
  }

  // SAVE NEW TASK
  else if (eTarget.closest('.modal__save-btn')) {
    const taskText = modalInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.className = 'list__item';
    li.innerHTML = `
      <div class="list__item-checkbox">
        <div class="completed__button"></div>
      </div>
      <div class="space-filler"></div>
      <div class="list__text">${taskText}</div>
      <span class="expand-btn"><img src="../img/icons/expand-arrow.svg" alt=""></span>
    `;

    todoList.appendChild(li);
    modalInput.value = '';
    modal.classList.remove('modal-open');
    saveTasksToLocalStorage();

    // проверяем переполнение
    updateExpandButtons(li);
  }

  // DELETE MODE TOGGLE
  else if (eTarget.closest('.list__controls-minus')) {
    eTarget.closest('.list__controls-minus').classList.toggle('list__controls-minus--active');
    listItems.forEach(item => {
      item.classList.toggle('want-delete');
      const itemChild = item.querySelector('.list__item-checkbox .completed__button');
      itemChild.classList.toggle('delete-btn');
    });
  }

  // DELETE TASK
  else if (eTarget.classList.contains('delete-btn')) {
    const item = eTarget.closest('.list__item');
    item.remove();
    saveTasksToLocalStorage();
  }
});

// DOUBLE CLICK TO EXPAND (optional fallback)
document.addEventListener('dblclick', event => {
  if (event.target.parentElement.classList.contains('list__item')) {
    event.target.parentElement.classList.add('list__item--swiped');
    setTimeout(() => event.target.parentElement.classList.remove('list__item--swiped'), 1700);
  }
});

// ---------- INITIALIZATION ----------

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  updateExpandButtons(); // на случай статического HTML
});
