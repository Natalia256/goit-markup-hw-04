import images from "./gallery-items.js";

const galleryList = document.querySelector("ul.js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const btn = document.querySelector(".lightbox__button");

const createImage = (item, parent) => {
  const { preview, original, description } = item;
  const img = document.createElement("img");

  img.classList.add("gallery__image");
  img.dataset.source = original;
  img.src = preview;
  img.alt = description;

  parent.appendChild(img);
};

const createLink = (item, parent) => {
  const { original } = item;
  const a = document.createElement("a");

  a.classList.add("gallery__link");
  a.href = original;

  createImage(item, a);

  parent.appendChild(a);
};

const createItem = (item) => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  createLink(item, li);

  return li;
};
const renderListItems = (arr) => {
  const items = arr.map((item) => createItem(item));

  galleryList.append(...items);
};

renderListItems(images);

function onClickHandler(e) {
  e.preventDefault();

  if (e.target.nodeName === "IMG") {
    lightbox.classList.add("is-open");
    lightbox.querySelector(".lightbox__image").src = e.target.src;
    lightbox.querySelector(".lightbox__image").alt = e.target.alt;
  }
}

function onCloseHandler(e) {
  if (e.target.nodeName === "I" || e.target.nodeName === "BUTTON") {
    lightbox.classList.remove("is-open");
  }
}

function onCloseHandler2(e) {
  if (e.code === "Escape") {
    lightbox.classList.remove("is-open");
  }
}

galleryList.addEventListener("click", onClickHandler);
btn.addEventListener("click", onCloseHandler);
document.addEventListener("keydown", onCloseHandler2);
