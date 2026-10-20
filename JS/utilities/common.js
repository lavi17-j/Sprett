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