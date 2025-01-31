// Hamburger toggle js

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


// Keyboard accessibility targeting header to start with

// Focus on logo when page loads
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.getElementById('logo');
  if (logo) {
      logo.focus();
  }
});

// Open/Close Menu with Enter or Space
document.querySelector('.hamburger').addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
      toggleMenu();
  }
});

// Function to toggle menu visibility
function toggleMenu() {
  const menu = document.querySelector('.primary-menu');
  menu.classList.toggle('show');
}

// Close the menu with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
      const menu = document.querySelector('.primary-menu');
      if (menu.classList.contains('show')) {
          menu.classList.remove('show');
      }
  }
});

// Keyboard navigation for menu items
const menuItems = document.querySelectorAll('.primary-menu a');
menuItems.forEach(item => {
  item.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown') {
          e.preventDefault();
          let nextItem = item.nextElementSibling;
          if (nextItem) nextItem.focus();
      } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          let prevItem = item.previousElementSibling;
          if (prevItem) prevItem.focus();
      }
  });
});
