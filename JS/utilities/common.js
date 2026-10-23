function navigateTo(pageName) {
  model.app.currentPage = pageName;
  updateView();
}

function logoutUser() {
  model.app.loggedInUserId = null;
  model.app.currentPage = "startPage";
  updateView();
}

function displayUserName() {
  const loggedInUser = model.users.find(
    (user) => user.userId === model.app.loggedInUserId,
  );

  return loggedInUser ? loggedInUser.username : "Gjest";
}

function checkUserRights (userId) {
let user = null;

for (const u of model.users) {
  if (u.userId === userId) {
    user = u;
  }
}

if (user === null) return false;
if (user.role === "admin") return false;


if (user.isBookingAllowed !== true) return false;
if (user.approved !== true) return false;
if (user.activeBooking === true) return false;

for (const membership of model.memberships) {
  if (membership.id === user.membershipType) {
    return membership.bookingAllowed;
  }
}

return false;
}