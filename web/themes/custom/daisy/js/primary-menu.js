(function () {
  // Function to toggle menu visibility
  function toggleMenu() {
    const menuWrapper = document.querySelector(".menu-search-wrapper");
    const hamburger = document.querySelector(".hamburger");
    const isSmallScreen = window.innerWidth <= 1280;

    if (isSmallScreen) {
      menuWrapper.classList.toggle("menu-open");

      // Toggle the cross icon
      if (menuWrapper.classList.contains("menu-open")) {
        hamburger.textContent = "✖"; // Cross icon
        hamburger.setAttribute("aria-label", "{{ 'Close menu'|t }}");
      } else {
        hamburger.textContent = "☰"; // Hamburger icon
        hamburger.setAttribute("aria-label", "{{ 'Open menu'|t }}");
      }
    }
  }

  // Ensure the correct initial state on page load
  function updateMenuState() {
    const menuWrapper = document.querySelector(".menu-search-wrapper");
    const hamburger = document.querySelector(".hamburger");
    const isSmallScreen = window.innerWidth <= 1280;

    if (isSmallScreen) {
      menuWrapper.classList.remove("menu-open");
      hamburger.textContent = "☰"; // Reset to hamburger icon
      hamburger.setAttribute("aria-label", "{{ 'Open menu'|t }}");
    } else {
      menuWrapper.classList.add("menu-open");
      hamburger.textContent = ""; // No icon for large screens
    }
  }

  // Event listener for page load
  window.addEventListener("load", updateMenuState);

  // Event listener for window resize
  window.addEventListener("resize", updateMenuState);

  // Attach event to hamburger button
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }
})();
