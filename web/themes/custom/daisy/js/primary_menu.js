function toggleMenu() {
  const menuWrapper = document.querySelector(".menu-search-wrapper");
  const isSmallScreen = window.innerWidth <= 1280;

  if (isSmallScreen) {
    if (menuWrapper.style.display === "flex") {
      menuWrapper.style.display = "none";
    } else {
      menuWrapper.style.display = "flex";
    }
  }
}

// Ensure the correct initial state on page load
function updateMenuState() {
  const menuWrapper = document.querySelector(".menu-search-wrapper");
  const isSmallScreen = window.innerWidth <= 1280;

  if (isSmallScreen) {
    // On small screens, hide the menu initially
    menuWrapper.style.display = "none";
  } else {
    // On large screens, always show the menu
    menuWrapper.style.display = "flex";
  }
}

// Event listener for page load
window.addEventListener("load", updateMenuState);

// Event listener for window resize
window.addEventListener("resize", updateMenuState);
