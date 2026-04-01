// script.js - Supabase Integration (Your Project)

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

// Update welcome name on dashboard and other pages
function updateUserName() {
    if (!currentUser) return;
    
    const displayName = currentUser.user_metadata?.full_name || 
                       currentUser.email?.split('@')[0] || 
                       "User";

    document.querySelectorAll('h1.display-4, h1.welcome-name, .welcome-name').forEach(el => {
        el.textContent = `Welcome back, ${displayName}!`;
    });
}

// Signup
async function signupUser(name, email, password) {
    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: name }
        }
    });

    if (error) {
        alert("Signup failed: " + error.message);
        return;
    }

    alert(`✅ Account created successfully!\nPlease check your email (${email}) to confirm your account.`);
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
    if (!email || !email.includes('@')) {
        alert("Please enter a valid email");
        return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password.html'
    });

    if (error) {
        alert("Error sending reset email: " + error.message);
    } else {
        alert(`✅ Password reset email sent to ${email}\nPlease check your inbox (and spam folder).`);
    }
}

// Reset Password (used in reset-password.html)
async function resetPassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
        alert("Reset failed: " + error.message);
    } else {
        alert("✅ Your password has been updated successfully!");
        window.location.href = "login.html";
    }
}

// Logout
async function logoutUser() {
    await supabase.auth.signOut();
    alert("You have been logged out.");
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 1000, once: true });
    checkAuth();
});

// Make functions available globally
window.signupUser = signupUser;
window.loginUser = loginUser;
window.forgotPassword = forgotPassword;
window.resetPassword = resetPassword;
window.logoutUser = logoutUser;