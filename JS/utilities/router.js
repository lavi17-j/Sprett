function updateView() {
  const app = document.getElementById("app");

  if (model.app.loggedInUserId === null) {
    app.innerHTML = updateViewNotLoggedInPage();
    return; 
  }

  let html = "";

  switch (model.app.currentPage) {
    case "adminDashboard":
      html = drawAdminDashboard();
      break;
    case "LoginScreen":
      html = drawLoginScreen();
      break;
    default:
      html = `<p>404 - Page not found</p>`;
  }

  app.innerHTML = html;
}
