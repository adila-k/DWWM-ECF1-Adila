document.addEventListener("DOMContentLoaded", function () {
  fetch("/assets/components/header.html")
    .then((r) => r.text())
    .then((html) => {
      document.getElementById("header").innerHTML = html;

      // --- Tout ce qui dépend du contenu du header va ICI ---

      const currentPage = window.location.pathname.split("/").pop();

      document.querySelectorAll(".header__navbar-link a").forEach((link) => {
        const linkPage = link.getAttribute("href").split("/").pop();
        if (linkPage === currentPage) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      //////////////////
      //  BURGER MENU //
      //////////////////

      const burgerButton = document.querySelector(".header__burger-menu");
      const navbar = document.querySelector(".header__navbar");

      burgerButton.addEventListener("click", () => {
        navbar.classList.toggle("is-open");
      });
    });

  fetch("/assets/components/footer.html")
    .then((r) => r.text())
    .then((html) => {
      document.getElementById("footer").innerHTML = html;
    });
});
