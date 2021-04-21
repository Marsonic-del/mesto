//Функция отображения ожидания загрузки(типа спиннер)
export { renderLoading };
function renderLoading(text) {
  const popupOpened = document.querySelector('.popup_opened');
  const submitBtn = popupOpened.querySelector('.popup__button');
  submitBtn.textContent = text;
}
