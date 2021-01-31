let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__btn-close');
let heading = document.querySelector('.profile__heading');
let headingDescription = document.querySelector('.profile__heading-description');
let inputName = popup.querySelector('.popup__text_type_name');
let inputAbout = popup.querySelector('.popup__text_type_about');
let savePopupButton = popup.querySelector('.popup__btn');


function togglePopap () {
    popup.classList.toggle('popup_opened')
    inputName.value = heading.textContent;
    inputAbout.value = headingDescription.textContent;
}

function closePopup (evt) {
    if(evt.target === evt.currentTarget) {
        togglePopap(evt)
    }
}

function savePopup(evt) {
    heading.textContent = inputName.value;
    headingDescription.textContent = inputAbout.value;
    closePopup(evt);
}



savePopupButton.addEventListener('click', savePopup);
popupOpenButton.addEventListener('click', togglePopap)
popupCloseButton.addEventListener('click', togglePopap)
popup.addEventListener('click', closePopup)

