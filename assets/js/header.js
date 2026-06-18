document.addEventListener("DOMContentLoaded", function () {
  fetch("/assets/components/header.html")
    .then((r) => r.text())
    .then((html) => {
      document.getElementById("header").innerHTML = html;
      const currentPage = window.location.pathname.split("/").pop();

      document.querySelectorAll(".header__navbar-link").forEach((link) => {
        const linkPage = link.getAttribute("href").split("/").pop();
        if (linkPage === currentPage) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });

  fetch("/assets/components/footer.html")
    .then((r) => r.text())
    .then((html) => {
      document.getElementById("footer").innerHTML = html;
    });
});
