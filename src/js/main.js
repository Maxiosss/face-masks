const openMenuBtn = document.querySelector(".menu-open");
const closeMenuBtn = document.querySelector(".burger-close");
const menu = document.querySelector(".mobile-menu");

openMenuBtn.addEventListener("click", () => {
  menu.classList.remove("is-hidden");
});

closeMenuBtn.addEventListener("click", () => {
  menu.classList.add("is-hidden");
});

