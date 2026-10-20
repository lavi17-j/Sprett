function navigateTo(pageName) {
  model.app.currentPage = pageName;
  updateView();
}

function logoutUser() {
  model.app.loggedInUserId = null;
  model.app.currentPage = "startpage";
  updateView();
}
