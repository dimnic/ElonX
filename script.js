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

// ==================== GOOGLE SHEETS LOGGING ====================
// PASTE YOUR ACTUAL WEB APP URL BELOW
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbziNqD_b08nP73CZbimGFvqaeuIONXVp0T-X7gr4fa2c929yGRkXkEqYGDpvSx9dQb9BQ/exec";

async function logToGoogleSheets(action, name, email) {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("https://script.google.com/macros/s/AKfycbziNqD_b08nP73CZbimGFvqaeuIONXVp0T-X7gr4fa2c929yGRkXkEqYGDpvSx9dQb9BQ/exec")) {
        console.log("⚠️ Google Sheets URL not set yet");
        return;
    }

    try {
        const payload = {
            action: action,
            name: name,
            email: email
        };

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            console.log(`✅ ${action} successfully logged to Google Sheets`);
        }
    } catch (err) {
        console.log("Could not log to Google Sheets:", err);
    }
}

// Login Function
function loginUser(name, email) {
    if (!name || name.trim() === "") {
        alert("Please enter your name");
        return;
    }
    if (!email || !email.includes("@")) {
        alert("Please enter a valid email address");
        return;
    }

    const user = {
        name: name.trim(),
        email: email.trim(),
        invested: 24850,
        joined: "March 2026"
    };

    localStorage.setItem('elonUser', JSON.stringify(user));
    currentUser = user;

    // Log to Google Sheets
    logToGoogleSheets("Login", user.name, user.email);

    alert(`✅ Login successful!\nWelcome back, ${user.name}!`);
    window.location.href = "dashboard.html";
}

// Signup Function
function signupUser(name, email) {
    if (!name || name.trim() === "") {
        alert("Please enter your name");
        return;
    }
    if (!email || !email.includes("@")) {
        alert("Please enter a valid email address");
        return;
    }

    const user = {
        name: name.trim(),
        email: email.trim(),
        invested: 500,
        joined: "March 2026"
    };

    localStorage.setItem('elonUser', JSON.stringify(user));
    currentUser = user;

    // Log to Google Sheets
    logToGoogleSheets("Signup", user.name, user.email);

    alert(`🎉 Account created successfully!\nWelcome, ${user.name}!`);
    window.location.href = "dashboard.html";
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