// API Base URL
const API_URL = 'http://localhost:3000/api';

// Current User
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const bookNowBtn = document.getElementById('bookNowBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const bookingModal = document.getElementById('bookingModal');
const doctorsList = document.getElementById('doctorsList');
const appointmentsList = document.getElementById('appointmentsList');
const specializationFilter = document.getElementById('specializationFilter');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    updateUIForUser();
    loadDoctors();
    if (currentUser) {
        loadAppointments();
    }
    setupEventListeners();
});

// Update UI based on login status
function updateUIForUser() {
    if (currentUser) {
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = logout;
        registerBtn.style.display = 'none';
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = () => openModal(loginModal);
        registerBtn.style.display = 'inline-block';
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Modal controls
    const closeBtns = document.getElementsByClassName('close');
    Array.from(closeBtns).forEach(btn => {
        btn.onclick = function() {
            this.parentElement.parentElement.style.display = 'none';
        }
    });

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }

    // Button clicks
    registerBtn.onclick = () => openModal(registerModal);
    bookNowBtn.onclick = () => {
        if (!currentUser) {
            showAlert('Please login to book an appointment', 'error');
            openModal(loginModal);
        } else {
            openModal(bookingModal);
            populateDoctorDropdown();
        }
    };

    // Form submissions
    document.getElementById('loginForm').onsubmit = handleLogin;
    document.getElementById('registerForm').onsubmit = handleRegister;
    document.getElementById('bookingForm').onsubmit = handleBooking;

    // Filter
    specializationFilter.onchange = filterDoctors;
}

// Modal Functions
function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Authentication
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            currentUser = data.data.patient;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('token', data.data.token);
            showAlert('Login successful!', 'success');
            closeModal(loginModal);
            updateUIForUser();
            loadAppointments();
        } else {
            showAlert(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        phone: document.getElementById('regPhone').value,
        password: document.getElementById('regPassword').value,
        date_of_birth: document.getElementById('regDOB').value,
        gender: document.getElementById('regGender').value,
        address: document.getElementById('regAddress').value
    };

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (data.success) {
            showAlert('Registration successful! Please login.', 'success');
            closeModal(registerModal);
            document.getElementById('registerForm').reset();
            setTimeout(() => openModal(loginModal), 1500);
        } else {
            showAlert(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    showAlert('Logged out successfully', 'info');
    updateUIForUser();
    appointmentsList.innerHTML = '<p class="alert alert-info">Please login to view your appointments</p>';
}

// Doctors
async function loadDoctors(specialization = '') {
    try {
        const url = specialization 
            ? `${API_URL}/doctors/specialization/${specialization}`
            : `${API_URL}/doctors`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
            displayDoctors(data.data);
        } else {
            showAlert('Error loading doctors', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

function displayDoctors(doctors) {
    if (doctors.length === 0) {
        doctorsList.innerHTML = '<p class="alert alert-info">No doctors found</p>';
        return;
    }

    doctorsList.innerHTML = doctors.map(doctor => `
        <div class="doctor-card">
            <h3>${doctor.name}</h3>
            <p class="specialization">${doctor.specialization}</p>
            <p class="info">📚 ${doctor.qualification}</p>
            <p class="info">⏱ ${doctor.experience} years experience</p>
            <p class="info">📞 ${doctor.phone}</p>
            <p class="fee">Fee: ₹${doctor.consultation_fee}</p>
            <button class="btn-primary" onclick="bookAppointmentWith(${doctor.id})">Book Appointment</button>
        </div>
    `).join('');
}

function filterDoctors() {
    const specialization = specializationFilter.value;
    loadDoctors(specialization);
}

function populateDoctorDropdown() {
    fetch(`${API_URL}/doctors`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const select = document.getElementById('bookDoctor');
                select.innerHTML = '<option value="">Select a Doctor</option>' +
                    data.data.map(doctor => 
                        `<option value="${doctor.id}">${doctor.name} - ${doctor.specialization}</option>`
                    ).join('');
            }
        });
}

function bookAppointmentWith(doctorId) {
    if (!currentUser) {
        showAlert('Please login to book an appointment', 'error');
        openModal(loginModal);
        return;
    }
    openModal(bookingModal);
    populateDoctorDropdown();
    setTimeout(() => {
        document.getElementById('bookDoctor').value = doctorId;
    }, 100);
}

// Appointments
async function handleBooking(e) {
    e.preventDefault();

    const appointmentData = {
        patient_id: currentUser.id,
        doctor_id: document.getElementById('bookDoctor').value,
        appointment_date: document.getElementById('bookDate').value,
        appointment_time: document.getElementById('bookTime').value,
        symptoms: document.getElementById('bookSymptoms').value,
        status: 'pending'
    };

    try {
        const response = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });

        const data = await response.json();

        if (data.success) {
            showAlert('Appointment booked successfully!', 'success');
            closeModal(bookingModal);
            document.getElementById('bookingForm').reset();
            loadAppointments();
        } else {
            showAlert(data.message || 'Booking failed', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

async function loadAppointments() {
    if (!currentUser) {
        appointmentsList.innerHTML = '<p class="alert alert-info">Please login to view your appointments</p>';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/appointments/patient/${currentUser.id}`);
        const data = await response.json();

        if (data.success) {
            displayAppointments(data.data);
        } else {
            showAlert('Error loading appointments', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

function displayAppointments(appointments) {
    if (appointments.length === 0) {
        appointmentsList.innerHTML = '<p class="alert alert-info">No appointments found</p>';
        return;
    }

    appointmentsList.innerHTML = appointments.map(apt => `
        <div class="appointment-card">
            <div class="appointment-info">
                <h3>Dr. ${apt.doctor_name}</h3>
                <p>🏥 ${apt.specialization}</p>
                <p>📅 ${formatDate(apt.appointment_date)} at ${formatTime(apt.appointment_time)}</p>
                <p>💬 ${apt.symptoms}</p>
            </div>
            <div class="appointment-actions">
                <span class="status-badge status-${apt.status}">${apt.status}</span>
                ${apt.status === 'pending' ? `
                    <button class="btn-danger" onclick="cancelAppointment(${apt.id})">Cancel</button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

async function cancelAppointment(appointmentId) {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/appointments/${appointmentId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            showAlert('Appointment cancelled successfully', 'success');
            loadAppointments();
        } else {
            showAlert(data.message || 'Cancellation failed', 'error');
        }
    } catch (error) {
        showAlert('Error: ' + error.message, 'error');
    }
}

// Utility Functions
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    document.body.insertBefore(alert, document.body.firstChild);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function formatTime(timeString) {
    return timeString.substring(0, 5);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
