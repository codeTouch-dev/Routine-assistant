const bodyElement = document.querySelector('.body')

bodyElement.addEventListener('click', event => {
  if (event.target.closest('.burger-menu') || event.target.closest('.nav__link') && bodyElement.closest('.body-menu--opened')) {

    bodyElement.classList.toggle('body-menu--opened');

  }
})