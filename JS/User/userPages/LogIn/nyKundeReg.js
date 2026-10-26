





function registerUser() {
const input = model.inputs.registration;

// Valgfri validering
if (!input.username || !input.password) {
alert("Please enter username and password.");
return;
}

// Generate unique ID based on existing users
const newUserId = model.users.length > 0
? Math.max(...model.users.map(u => u.userId)) + 1
: 0;

// Create user object
const newUser = {
userId: newUserId,
role: "customer",
username: input.username,
password: input.password,
membershipType: 1,
approved: false,
paymentDate: "2026-10-21",
paymentStatus: true,
activeBooking: false,
bookings: [],
signUps: [],
penalties: 0,
registeredShowUps: 0
};

// Push into the model array
model.users.push(newUser);
}


model.viewState.loginPage.newUserForm