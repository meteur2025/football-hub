/* =========================================================
   FOOTBALL HUB
   Main Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuButton = document.querySelector(".menu-button");
  const mainNav = document.querySelector(".main-nav");

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", function () {
      mainNav.classList.toggle("show");

      const isOpen = mainNav.classList.contains("show");

      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");

      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("show");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =======================================================
     ACTIVE NAVIGATION LINK
     ======================================================= */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navigationLinks = document.querySelectorAll(".main-nav a");

  navigationLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  /* =======================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener("click", function (event) {

    if (!menuButton || !mainNav) {
      return;
    }

    const clickedInsideMenu =
      mainNav.contains(event.target) ||
      menuButton.contains(event.target);

    if (!clickedInsideMenu) {
      mainNav.classList.remove("show");
      menuButton.textContent = "☰";
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  /* =======================================================
     GENERAL BUTTON PROTECTION
     ======================================================= */

  const buttons = document.querySelectorAll("button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.blur();
    });
  });

});
