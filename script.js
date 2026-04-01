// script.js - Final Version with Supabase + Profiles Table

const SUPABASE_URL = 'https://iqaxcdfjnkfwxtlluwho.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D51OBZeRfbXPmzQKMZIfwg_i4e7K0C-';

const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;

 // Update welcome messages
    const welcomeparagraph = document.querySelectorAll('code.bg-light');
    welcomeparagraph.forEach(paragraph => {
        if (paragraph) {
            paragraph.textContent = `https://elonfan.site/ref/${currentUser.name}298917`;
        }
    });

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

    // Create profile in custom table
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

    alert(`✅ Login successful!\nWelcome back, ${currentUser.user_metadata?.full_name || currentUser.email}!`);
    window.location.href = "dashboard.html";
}

// Forgot Password
async function forgotPassword(email) {
    if (!email) return alert("Please enter email");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password.html'
    });
    if (error) alert(error.message);
    else alert(`✅ Reset email sent to ${email}. Check your inbox!`);
}

// Reset Password
async function resetPassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) alert(error.message);
    else {
        alert("✅ Password updated successfully!");
        window.location.href = "login.html";
    }
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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true });
    checkAuth();
});

window.signupUser = signupUser;
window.loginUser = loginUser;
window.forgotPassword = forgotPassword;
window.resetPassword = resetPassword;
window.logoutUser = logoutUser;