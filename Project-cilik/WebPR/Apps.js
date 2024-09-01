// Inisiasi variabel
const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form-container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

// Event listener untuk membuka form
formOpenBtn.addEventListener("click", () => home.classList.add("show"));

// Event listener untuk menutup form saat icon X di klik
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

// Event listener untuk menutup form ketika klik di luar form
home.addEventListener("click", (e) => {
  if (e.target === home) {
    home.classList.remove("show");
  }
});

// Event listener untuk toggle visibility password
pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

// Event listener untuk switch ke form signup
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

// Event listener untuk switch ke form login
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});
