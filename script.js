// ===== SELECT ELEMENTS =====
const form = document.getElementById("complaintForm");
const successMessage = document.getElementById("successMessage");

const studentName = document.getElementById("studentName");
const regNumber = document.getElementById("regNumber");
const concernType = document.getElementById("concernType");
const description = document.getElementById("description");

// ===== ADD REAL-TIME VALIDATION =====
const inputs = [studentName, regNumber, concernType, description];

inputs.forEach(input => {
    input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
            input.style.border = "2px solid #4caf50";
        } else {
            input.style.border = "2px solid #ff4d6d";
        }
    });
});

// ===== FORM SUBMIT =====
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.style.border = "2px solid #ff4d6d";
            isValid = false;
        }
    });

    if (!isValid) {
        showTemporaryAlert("Please fill all required fields.");
        return;
    }

    // ===== CREATE COMPLAINT OBJECT =====
    const complaintData = {
        name: studentName.value.trim(),
        regNumber: regNumber.value.trim(),
        concern: concernType.value,
        description: description.value.trim(),
        time: new Date().toLocaleString()
    };

    // ===== STORE IN LOCAL STORAGE =====
    let complaints = JSON.parse(localStorage.getItem("campusComplaints")) || [];
    complaints.push(complaintData);
    localStorage.setItem("campusComplaints", JSON.stringify(complaints));

    // ===== SHOW SUCCESS ANIMATION =====
    successMessage.style.display = "block";
    successMessage.style.opacity = "0";
    successMessage.style.transform = "translateY(10px)";

    setTimeout(() => {
        successMessage.style.transition = "all 0.4s ease";
        successMessage.style.opacity = "1";
        successMessage.style.transform = "translateY(0)";
    }, 50);

    // ===== RESET FORM SMOOTHLY =====
    form.reset();
    inputs.forEach(input => input.style.border = "none");

    setTimeout(() => {
        successMessage.style.display = "none";
    }, 3000);
});

// ===== PREMIUM ALERT FUNCTION =====
function showTemporaryAlert(message) {
    const alertBox = document.createElement("div");

    alertBox.innerText = message;
    alertBox.style.position = "fixed";
    alertBox.style.top = "20px";
    alertBox.style.right = "20px";
    alertBox.style.padding = "15px 20px";
    alertBox.style.background = "linear-gradient(135deg, #ff4d6d, #c9184a)";
    alertBox.style.color = "white";
    alertBox.style.borderRadius = "10px";
    alertBox.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
    alertBox.style.zIndex = "1000";
    alertBox.style.opacity = "0";
    alertBox.style.transition = "all 0.4s ease";

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.opacity = "1";
        alertBox.style.transform = "translateY(0)";
    }, 50);

    setTimeout(() => {
        alertBox.style.opacity = "0";
        alertBox.style.transform = "translateY(-10px)";
        setTimeout(() => document.body.removeChild(alertBox), 400);
    }, 2500);
}