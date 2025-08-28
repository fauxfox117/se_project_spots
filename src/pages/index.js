import "./index.css";

import {
  enableValidation,
  config,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/softrware-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

// =====================================
// API SETUP
// =====================================

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2ff931b6-b90a-4804-a7ca-5d064113fca0",
    "Content-Type": "application/json",
  },
});

// =====================================
// EDIT PROFILE MODAL
// =====================================

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileName = editProfileModal.querySelector("#profile-name-input");
const editProfileDescription = editProfileModal.querySelector(
  "#profile-description-input"
);

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  api
    .editUserInfo({
      name: editProfileName.value,
      about: editProfileDescription.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error);
}

editProfileBtn.addEventListener("click", function () {
  editProfileName.value = profileNameEl.textContent;
  editProfileDescription.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileModal,
    [editProfileName, editProfileDescription],
    config
  );
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// =====================================
// AVATAR MODAL
// =====================================

const editAvatarPicture = document.querySelector(".profile__avatar-btn");
const avatarPictureModal = document.querySelector("#edit-avatar-modal");
const avatarProfile = document.querySelector(".profile__avatar");
const avatarPictureCloseBtn =
  avatarPictureModal.querySelector(".modal__close-btn");
const avatarPictureForm = avatarPictureModal.querySelector(".modal__form");
const avatarPictureLink = avatarPictureModal.querySelector(
  "#profile-avatar-input"
);
const avatarPictureSubmitBtn =
  avatarPictureModal.querySelector(".modal__submit-btn");

function handleAvatarPictureSubmit(evt) {
  evt.preventDefault();

  api
    .editAvatarPicture({
      avatar: avatarPictureLink.value,
    })
    .then((data) => {
      avatarProfile.src = data.avatar;
      closeModal(avatarPictureModal);
      avatarPictureForm.reset();
    })
    .catch(console.error);
}

editAvatarPicture.addEventListener("click", function () {
  openModal(avatarPictureModal);
});

avatarPictureCloseBtn.addEventListener("click", function () {
  closeModal(avatarPictureModal);
});

avatarPictureForm.addEventListener("submit", handleAvatarPictureSubmit);

// =====================================
// NEW POST MODAL
// =====================================

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLink = newPostModal.querySelector("#card-image-input");
const newPostDescription = newPostModal.querySelector("#card-caption-input");
const newSubmitBtn = newPostModal.querySelector(".modal__submit-btn");

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  api
    .addUserCard({
      name: newPostDescription.value,
      link: newPostLink.value,
    })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      newPostForm.reset();
      disableButton(evt.submitter, config);
    })
    .catch(console.error);
}

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

newPostForm.addEventListener("submit", handleNewPostSubmit);

// =====================================
// DELETE MODAL
// =====================================

const deleteModal = document.querySelector("#delete-picture-modal");
const deleteCloseBtn = deleteModal.querySelector(".modal__delete-close-btn");
const deleteModalBtn = deleteModal.querySelector(".modal__delete-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");

function handleDeleteCard(cardId, evt) {
  api
    .deleteUserCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
}

deleteModal.addEventListener("submit", handleDeleteCard);

deleteModalBtn.addEventListener("click", function () {
  handleDeleteCard();
});

deleteCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

// =====================================
// PREVIEW MODAL
// =====================================

const previewModal = document.querySelector("#preview-post-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCloseBtn = previewModal.querySelector(
  ".modal__close_type_preview"
);
const previewTitle = previewModal.querySelector(".modal__preview-title");

previewCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

// =====================================
// CARD FUNCTIONS
// =====================================

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardLikeBtn.addEventListener("click", function () {
    handleLikeCard(cardLikeBtn, data._id);
  });

  cardDeleteBtn.addEventListener("click", function () {
    selectedCard = cardElement;
    selectedCardId = data._id;

    openModal(deleteModal);
  });

  cardImageEl.addEventListener("click", function () {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openModal(previewModal);
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  return cardElement;
}

// =====================================
// UTILITY FUNCTIONS
// =====================================

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const modals = document.querySelectorAll(".modal");

//Variables for delete functionality
let selectedCard;
let selectedCardId;

function handleLikeCard(cardLikeBtn, cardId) {
  const isLiked = cardLikeBtn.classList.contains("card__like-btn-active");

  if (isLiked) {
    api.removeLike(cardId).then(() => {
      cardLikeBtn.classList.remove("card__like-btn-active");
    });
  } else {
    api
      .likeCard(cardId)
      .then(() => {
        cardLikeBtn.classList.add("card__like-btn-active");
      })
      .catch(console.error);
  }
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

// =====================================
// INITIALIZATION
// =====================================

enableValidation(config);

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    avatarProfile.src = userInfo.avatar;
  })
  .catch(console.error);
