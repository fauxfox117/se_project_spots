import "./index.css";
import { enableValidation, config } from "../scripts/validation.js";

// import profilePhoto from "../images/avatar.jpg";
// import profileLogo from "./images/logo.svg";
// import profileEdit from "../images/pencil.svg";
// import profileTrash from "../images/trash.svg";
// import profileLike from "../images/like.svg";

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/softrware-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// const initialProfile = [
//   { name: "avatar", image: profilePhoto },
//   { name: "logo", link: profileLogo },
// ];

//Edit Profile
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileName = editProfileModal.querySelector("#profile-name-input");
const editProfileDescription = editProfileModal.querySelector(
  "#profile-description-input"
);

//New Post
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLink = newPostModal.querySelector("#card-image-input");
const newPostDescription = newPostModal.querySelector("#card-caption-input");
const newSubmitBtn = newPostModal.querySelector(".modal__submit-btn");

//Preview Image
const previewModal = document.querySelector("#preview-post-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCloseBtn = previewModal.querySelector(
  ".modal__close_type_preview"
);
const previewTitle = previewModal.querySelector(".modal__preview-title");

// Card Elements
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const modals = document.querySelectorAll(".modal");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-btn-active");
  });

  cardDeleteBtn.addEventListener("click", function () {
    cardDeleteBtn.closest(".card").remove();
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

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

previewCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileName.value;
  profileDescriptionEl.textContent = editProfileDescription.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  if (!newPostLink.value) {
    console.log("Please enter a valid URL");
    return;
  }

  const cardElement = getCardElement({
    name: newPostDescription.value,
    link: newPostLink.value,
  });

  cardsList.prepend(cardElement);
  closeModal(newPostModal);
  newPostForm.reset();
  disableButton(evt.submitter, config);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

enableValidation(config);
