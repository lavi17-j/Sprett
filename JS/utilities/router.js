function updateView() {
  const app = document.getElementById("app");

  if (model.app.loggedInUserId === null) {
    app.innerHTML = updateViewNotLoggedInPage();
    return; 
  }

  let html = "";

  switch (model.app.currentPage) {
    case "startPage":
      html = updateViewNotLoggedInPage();
      break;
      case "loggedInPage":
      html = updateViewLoggedInPage();
      break;
    case "adminDashboard":
      html = drawAdminDashboard();
      break;
    case "memberships":
      html = drawAdminMemberships();
      break;
    case "applications":
      html = drawManageApplication();
      break;
    case "editSubscriptions":
      html = drawAdminEditSubscriptions();
      break;
    case "LoginScreen":
      html = drawLoginScreen();
      break;
    default:
      html = `<p>404 - Page not found</p>`;
  }

  app.innerHTML = html;
}

