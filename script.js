// script.js - Final Stable Version
const SUPABASE_URL = 'https://supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D51OBZeRfbXPmzQKMZIfwg_i4e7K0C-';

// FIX: Use capital 'S' for the library call to avoid the ReferenceError
// Change this line in your script.js
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;

// Function to update referral links only if they exist on the current page
function updateReferralLinks() {
    if (!currentUser) return; 
    const name = currentUser.user_metadata?.full_name || "User";
    const welcomeparagraph = document.querySelectorAll('code.bg-light');
    
    welcomeparagraph.forEach(paragraph => {
        if (paragraph) {
            paragraph.textContent = `https://elonfan.site{name}298917`;
        }
    });
}

// Function to update name displays only if they exist on the current page
function updateUserName() {
    if (!currentUser) return;
    const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || "User";
    document.querySelectorAll('h1.display-4, h1.welcome-name, .welcome-name').forEach(el => {
        if (el) el.textContent = `Welcome back, ${name}!`;
    });
}

// Auth Functions
async function signupUser(name, email, password) {
    if (!name || !email || !password) return alert("Please fill all fields");
    const { data, error } = await supabase.auth.signUp({
        email, password, options: { data: { full_name: name } }
    });
    if (error) return alert(error.message);
    alert("✅ Check your email to confirm!");
}

async function loginUser(email, password) {
    if (!email || !password) return alert("Please fill all fields");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    window.location.href = "dashboard.html";
}

async function logoutUser() {
    await supabase.auth.signOut();
    window.location.href = "index.html";
}

async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
        updateUserName();
        updateReferralLinks();
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Safe AOS Initialization (This fixes the "Invisible" text)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    } else {
        console.warn("AOS library not found. Check your HTML script tags.");
    }

    // 2. Check login status
    checkAuth();

    // 3. FIX: Check if buttons exist before adding listeners to prevent "onclick of null" error
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = () => { /* your login logic here if not using inline onclick */ };
    }
});

// Export to window for HTML access
window.signupUser = signupUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
