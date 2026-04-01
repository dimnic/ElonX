// script.js - Final Fixed Version

let currentUser = null;

function loadUser() {
    const saved = localStorage.getItem('elonUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        return true;
    }
    return false;
}

function updateUserName() {
    if (!currentUser || !currentUser.name) return;
     // Update welcome messages
    const welcomeparagraph = document.querySelectorAll('code.bg-light');
    welcomeparagraph.forEach(paragraph => {
        if (paragraph) {
            paragraph.textContent = `https://elonfan.site/ref/${currentUser.name}298917`;
        }
    });

    // Update dashboard and other pages
    document.querySelectorAll('h1.display-4, h1.welcome-name, .welcome-name').forEach(el => {
        el.textContent = `Welcome back, ${currentUser.name}!`;
    });
}

function loginUser(name, email) {
    if (!name || name.trim() === "") {
        alert("Please enter your name");
        return;
    }
    if (!email || !email.includes("@")) {
        alert("Please enter a valid email");
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

    alert(`✅ Login successful!\nWelcome back, ${user.name}!`);
    window.location.href = "dashboard.html";
}

function signupUser(name, email) {
    if (!name || name.trim() === "") {
        alert("Please enter your name");
        return;
    }
    if (!email || !email.includes("@")) {
        alert("Please enter a valid email");
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

    alert(`🎉 Account created successfully!\nWelcome, ${user.name}!`);
    window.location.href = "dashboard.html";
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 1000, once: true });

    if (loadUser()) {
        updateUserName();
    }
});

// Make functions available to HTML forms
window.loginUser = loginUser;
window.signupUser = signupUser;