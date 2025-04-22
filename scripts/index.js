const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileName = editProfileModal.querySelector("#profile-name-input");
const editProfileDescription = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLink = newPostModal.querySelector("#card-image-input");
const newPostDescription = newPostModal.querySelector("#card-caption-input");

/*      below is commented for future implementation


const cardImage = document.querySelector(".card__image");
const cardDescription = document.querySelector(".card__title");


*/

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileName.value = profileNameEl.textContent;
  editProfileDescription.value = profileDescriptionEl.textContent;
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

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileName.value;
  profileDescriptionEl.textContent = editProfileDescription.value;
  closeModal;
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  if (!newPostLink.value) {
    console.log("Please enter a valid URL");
    return;
  }
  console.log("New Post Link:", newPostLink.value);
  console.log("New Post Description:", newPostDescription.value);

  /*      below is commented for future implementation

  cardImage.textContent = newPostLink.value;
  cardDescription.textContent = newPostDescription.value;

  */

  newPostForm.reset();
  closeModal;
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
