// script.js - Fixed Version (Resolves invisible text/AOS crash)

const SUPABASE_URL = 'https://supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D51OBZeRfbXPmzQKMZIfwg_i4e7K0C-';

// Ensure Supabase is loaded from CDN in HTML before this script
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;

// --- FIX: Moved this into a function to prevent "null" crash on load ---
function updateReferralLinks() {
    if (!currentUser) return; 
    
    const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || "User";
    const welcomeparagraph = document.querySelectorAll('code.bg-light');
    
    welcomeparagraph.forEach(paragraph => {
        if (paragraph) {
            paragraph.textContent = `https://elonfan.site{name}298917`;
        }
    });
}

// Update name on all pages
function updateUserName() {
    if (!currentUser) return;
    const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || "User";
    document.querySelectorAll('h1.display-4, h1.welcome-name, .welcome-name').forEach(el => {
        el.textContent = `Welcome back, ${name}!`;
    });
}

// Create or update user profile in custom table
async function createUserProfile(user, name) {
    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            full_name: name,
            email: user.email,
            invested: 500,
            updated_at: new Date().toISOString()
        });

    if (error) console.error("Profile creation error:", error);
}

// Signup
async function signupUser(name, email, password) {
    if (!name || !email || !password) return alert("Please fill all fields");

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: { data: { full_name: name } }
    });

    if (error) return alert("Signup failed: " + error.message);

    if (data.user) {
        await createUserProfile(data.user, name);
    }

    alert(`✅ Account created!\nPlease check your email (${email}) to confirm.`);
}

// Login
async function loginUser(email, password) {
    if (!email || !password) return alert("Please fill email and password");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return alert("Login failed: " + error.message);

    currentUser = data.user;
    updateUserName();
    updateReferralLinks();

    alert(`✅ Login successful!`);
    window.location.href = "dashboard.html";
}

// Logout
async function logoutUser() {
    await supabase.auth.signOut();
    window.location.href = "index.html";
}

// Check auth + load profile
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
        updateUserName();
        updateReferralLinks(); // Now safe to call
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (This makes text visible)
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 1000, 
            once: true 
        });
    }

    // 2. Check login status
    checkAuth();
});

// Export functions to global window for HTML onclick access
window.signupUser = signupUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
