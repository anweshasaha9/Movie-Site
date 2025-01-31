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
