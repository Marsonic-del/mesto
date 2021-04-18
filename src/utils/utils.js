//Функция отображения ожидания загрузки(типа спиннер)
export default function waitingForLoad(element, text) {
  element.submitButton.textContent = text;
}
