import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiAwtdvHwhEAdci6JOX9XWq-0fwR0wGyY",
    authDomain: "login-form-df636.firebaseapp.com",
    projectId: "login-form-df636",
    storageBucket: "login-form-df636.firebasestorage.app",
    messagingSenderId: "987937821221",
    appId: "1:987937821221:web:e783a83b6dfb29d2f5a5cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Handle Authentication State
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                } else {
                    console.log("No document found matching ID");
                }
            })
            .catch((error) => {
                console.log("Error getting document", error);
            });
    } else {
        console.log("User ID not found in Local Storage");
    }
});

// Logout Functionality
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        });
});

// Fuel Efficiency Calculator
const calculateEfficiency = async () => {
    const shipId = document.getElementById("shipId").value;
    const engineCapacity = parseFloat(document.getElementById("engineCapacity").value);
    const fuelConsumption = parseFloat(document.getElementById("fuelConsumption").value);
    const cargoWeight = parseFloat(document.getElementById("cargoWeight").value);
    const speedKnots = parseFloat(document.getElementById("speedKnots").value);
    const resultContainer = document.getElementById("efficiencyResult");
    resultContainer.innerHTML = "";

    if (!shipId || isNaN(engineCapacity) || isNaN(fuelConsumption) || isNaN(cargoWeight) || isNaN(speedKnots)) {
        resultContainer.innerHTML = "<p style='color:red;'>Please enter valid values.</p>";
        return;
    }

    const data = {
        ship_id: shipId,
        engine_capacity: engineCapacity,
        fuel_consumption: fuelConsumption,
        cargo_weight: cargoWeight,
        speed_knots: speedKnots
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/calculate-fuel-efficiency", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            resultContainer.innerHTML = `<h3>Efficiency Score: ${result.efficiency_score}</h3>`;
        } else {
            resultContainer.innerHTML = `<p style='color:red;'>${result.error}</p>`;
        }
    } catch (error) {
        resultContainer.innerHTML = "<p style='color:red;'>Server error. Please try again later.</p>";
    }
};

// Event Listener for Fuel Efficiency Calculation
document.getElementById("calculateEfficiency").addEventListener("click", calculateEfficiency);
