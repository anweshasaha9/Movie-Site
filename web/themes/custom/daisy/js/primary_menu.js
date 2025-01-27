(function () {
  // Function to toggle menu visibility
  function toggleMenu() {
    const menuWrapper = document.querySelector(".menu-search-wrapper");
    const isSmallScreen = window.innerWidth <= 1280;

    if (isSmallScreen) {
      menuWrapper.classList.toggle("menu-open");
    }
  }

  // Ensure the correct initial state on page load
  function updateMenuState() {
    const menuWrapper = document.querySelector(".menu-search-wrapper");
    const isSmallScreen = window.innerWidth <= 1280;

    if (isSmallScreen) {
      // On small screens, ensure the menu is hidden initially
      menuWrapper.classList.remove("menu-open");
    } else {
      // On large screens, always show the menu
      menuWrapper.classList.add("menu-open");
    }
  }

  // Event listener for page load
  window.addEventListener("load", updateMenuState);

  // Event listener for window resize
  window.addEventListener("resize", updateMenuState);

  // Attach event to hamburger button
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
})();
