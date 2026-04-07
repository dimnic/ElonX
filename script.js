// script.js - Real Supabase Authentication

const SUPABASE_URL = 'https://iqaxcdfjnkfwxtlluwho.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D51OBZeRfbXPmzQKMZIfwg_i4e7K0C-';

const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;

// Update welcome name
function updateUserName() {
    if (!currentUser) return;
    const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || "User";
    document.querySelectorAll('h1.display-4, h1.welcome-name, .welcome-name').forEach(el => {
        el.textContent = `Welcome back, ${name}!`;
    });
}

// Signup with Email Confirmation
async function signupUser(name, email, password) {
    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin + '/login.html'
        }
    });

    if (error) {
        alert("Signup failed: " + error.message);
        return;
    }

    alert(`✅ Account created!\n\nA confirmation email has been sent to ${email}.\nPlease check your inbox and click the verification link.`);
}

// Login
async function loginUser(email, password) {
    if (!email || !password) {
        alert("Please fill email and password");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Login failed: " + error.message);
        return;
    }

    currentUser = data.user;
    updateUserName();

    alert(`✅ Login successful!\nWelcome back, ${currentUser.user_metadata?.full_name || currentUser.email}!`);
    window.location.href = "dashboard.html";
}

// Forgot Password
async function forgotPassword(email) {
    if (!email) return alert("Please enter your email");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password.html'
    });

    if (error) alert("Error: " + error.message);
    else alert(`✅ Password reset email sent to ${email}.\nCheck your inbox!`);
}

// Logout
async function logoutUser() {
    await supabase.auth.signOut();
    window.location.href = "index.html";
}

// Check if user is logged in
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
        updateUserName();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 1000, once: true });
    checkAuth();
});

window.signupUser = signupUser;
window.loginUser = loginUser;
window.forgotPassword = forgotPassword;
window.logoutUser = logoutUser;