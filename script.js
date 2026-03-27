// script.js
let currentUser = null;

function checkLogin() {
    const savedUser = localStorage.getItem('elonUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserNameEverywhere();
    } else {
        // Redirect to login if trying to access protected pages
        const currentPage = window.location.pathname.split('/').pop();
        if (!['index.html', 'login.html', 'signup.html'].includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
}

function updateUserNameEverywhere() {
    if (!currentUser || !currentUser.name) return;

    // Update welcome messages
    const welcomeHeaders = document.querySelectorAll('h1.display-4, h1.welcome-name');
    welcomeHeaders.forEach(header => {
        if (header) {
            header.textContent = `Welcome back, ${currentUser.name}!`;
        }
    });

    // Update logout button if exists
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.textContent = `Logout (${currentUser.name})`;
    }
}

function loginUser(email) {
    const user = {
        name: "Suzzy",        // fallback
        email: email,
        invested: 0,
        joined: "March 2026"
    };
    localStorage.setItem('elonUser', JSON.stringify(user));
    alert(`Login successful! Welcome back, ${user.name}`);
    window.location.href = "dashboard.html";
}

function signupUser(name, email) {
    const user = {
        name: name.trim() || "Suzzy",
        email: email,
        invested: 500,
        joined: "March 2026"
    };
    localStorage.setItem('elonUser', JSON.stringify(user));
    alert(`Account created successfully! Welcome, ${user.name}`);
    window.location.href = "dashboard.html";
}

// Run on every page
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 1000, once: true });
    checkLogin();
});