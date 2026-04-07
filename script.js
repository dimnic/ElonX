// script.js - Final Version with Google Sheets Logging

let currentUser = null;

// Load user from localStorage
function loadUser() {
    const savedUser = localStorage.getItem('elonUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        return true;
    }
    return false;
}

// Update welcome name on dashboard and other pages
function updateUserName() {
    if (!currentUser || !currentUser.name) return;

    document.querySelectorAll('h1.display-4, h1.welcome-name, .welcome-name').forEach(el => {
        el.textContent = `Welcome back, ${currentUser.name}!`;
    });
}


// Logout
function logoutUser() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem('elonUser');
        currentUser = null;
        alert("You have been logged out.");
        window.location.href = "index.html";
    }
}

// Initialize on every page
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 1000, once: true });

    if (loadUser()) {
        updateUserName();
    }
});

// Make functions available to HTML forms
window.loginUser = loginUser;
window.signupUser = signupUser;
window.logoutUser = logoutUser;