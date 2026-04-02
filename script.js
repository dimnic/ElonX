// script.js - Simple LocalStorage Version (No Supabase)

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

 // Update welcome messages
    const welcomeparagraph = document.querySelectorAll('code.bg-light');
    welcomeparagraph.forEach(paragraph => {
        if (paragraph) {
            paragraph.textContent = `https://elonfan.site/ref/${currentUser.name}298917`;
        }
    });

// Update welcome name on all pages
function updateUserName() {
    if (!currentUser || !currentUser.name) return;

    document.querySelectorAll('h1.display-4, h1.welcome-name, .welcome-name').forEach(el => {
        el.textContent = `Welcome back, ${currentUser.name}!`;
    });
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

// Initialize on every page load
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 1000, once: true });

    if (loadUser()) {
        updateUserName();
    }
});

// Make functions available to HTML
window.loginUser = loginUser;
window.signupUser = signupUser;
window.logoutUser = logoutUser;