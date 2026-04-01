// script.js - Enhanced Version for Elon Musk  Site

let currentUser = null;

// ====================== USER MANAGEMENT ======================

function saveUser(user) {
    localStorage.setItem('elonUser', JSON.stringify(user));
    currentUser = user;
}

function loadUser() {
    const savedUser = localStorage.getItem('elonUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        return true;
    }
    return false;
}

function clearUser() {
    localStorage.removeItem('elonUser');
    currentUser = null;
}

// ====================== UI UPDATES ======================
// Update welcome messages
    const welcomeparagraph = document.querySelectorAll('code.bg-light');
    welcomeparagraph.forEach(paragraph => {
        if (paragraph) {
            paragraph.textContent = `https://elonfan.site/ref/${currentUser.name}298917`;
        }
    });

function updateUserNameEverywhere() {
    if (!currentUser || !currentUser.name) return;

    const name = currentUser.name.trim();

    // Update all welcome messages
    document.querySelectorAll('h1.display-4, h1.welcome-name, .welcome-name').forEach(el => {
        el.textContent = `Welcome back, ${name}!`;
    });

    // Update logout buttons
    document.querySelectorAll('#logout-btn, .logout-btn').forEach(btn => {
        btn.textContent = `Logout (${name})`;
    });

    // Update navbar if exists
    const navBrand = document.querySelector('.navbar-brand');
    if (navBrand && currentUser.name) {
        navBrand.title = `Logged in as ${name}`;
    }
}

function showLoggedInUI() {
    updateUserNameEverywhere();

    // Show dashboard link in navbar if not already present
    const navMenu = document.getElementById('navmenu') || document.querySelector('.navbar-nav');
    if (navMenu && !document.getElementById('dashboard-link')) {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.id = 'dashboard-link';
        li.innerHTML = `<a class="nav-link" href="dashboard.html">Dashboard</a>`;
        navMenu.appendChild(li);
    }
}

function showLoggedOutUI() {
    // Optional: Hide dashboard link when logged out
}

// ====================== LOGIN & SIGNUP ======================

function loginUser(email, password = "demo123") {
    if (!email || !email.includes('@')) {
        alert("Please enter a valid email address.");
        return false;
    }

    let user = null;
    const savedUser = localStorage.getItem('elonUser');

    if (savedUser) {
        user = JSON.parse(savedUser);
        user.email = email; // Update email if changed
    } else {
        // First time login - create user
        const nameFromEmail = email.split('@')[0];
        user = {
            name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
            email: email,
            invested: 24850,
            joined: "March 2026",
            lastLogin: new Date().toISOString()
        };
    }

    user.lastLogin = new Date().toISOString();
    saveUser(user);

    alert(`✅ Login successful!\nWelcome back, ${user.name}!`);
    window.location.href = "dashboard.html";
    return true;
}

function signupUser(name, email, password = "demo123") {
    if (!name || name.trim() === "") {
        alert("Please enter your name.");
        return false;
    }
    if (!email || !email.includes('@')) {
        alert("Please enter a valid email address.");
        return false;
    }

    const user = {
        name: name.trim(),
        email: email.toLowerCase(),
        invested: 500,
        joined: "March 2026",
        lastLogin: new Date().toISOString(),
        referralCode: "elon" + Math.floor(100000 + Math.random() * 900000)
    };

    saveUser(user);
    alert(`🎉 Account created successfully!\nWelcome to the community, ${user.name}!`);
    window.location.href = "dashboard.html";
    return true;
}

function logoutUser() {
    if (confirm("Are you sure you want to logout?")) {
        clearUser();
        alert("You have been logged out successfully.");
        window.location.href = "index.html";
    }
}

// ====================== UTILITY FUNCTIONS ======================

function getCurrentUser() {
    return currentUser;
}

function isLoggedIn() {
    return currentUser !== null;
}

// Auto-redirect if trying to access protected pages without login
function protectPage() {
    const protectedPages = ['dashboard.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        alert("Please login to access this page.");
        window.location.href = "login.html";
    }
}

// ====================== EVENT LISTENERS & INITIALIZATION ======================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Load user data
    const isUserLoaded = loadUser();

    if (isUserLoaded) {
        showLoggedInUI();
    } else {
        showLoggedOutUI();
    }

    // Protect dashboard and other private pages
    protectPage();

    // Add logout functionality to any element with id="logout-btn"
    const logoutButtons = document.querySelectorAll('#logout-btn, .logout-btn');
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    });

    console.log('%c✅ Elon Musk Fan Site script loaded successfully!', 'color: #000; font-weight: bold;');
});

// Make functions available globally so HTML onclick and forms can use them
window.loginUser = loginUser;
window.signupUser = signupUser;
window.logoutUser = logoutUser;
window.getCurrentUser = getCurrentUser;