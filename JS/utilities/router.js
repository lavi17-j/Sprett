function updateView() {
  const app = document.getElementById("app");

  const publicPages = [
    "startPage",
    "LoginScreen",
    "newUserRegistration",
    "userRecoverPassword",
  ];

  if (
    model.app.loggedInUserId === null &&
    !publicPages.includes(model.app.currentPage)
  ) {
    app.innerHTML = updateViewNotLoggedInPage();
    return;
  }

  let html = "";

  switch (model.app.currentPage) {
    case "startPage":
      html = updateViewNotLoggedInPage();
      break;
    case "LoginScreen":
      html = drawLoginScreen();
      break;
    case "userRecoverPassword":
      html = drawRecoverPasswordScreen();
      break;
    case "newUserRegistration":
      html = drawNewUserRegistration();
      break;
    case "loggedInPage":
      html = tegnHjemmesideBooking();
      break;
    case "bookingPage":
      html = tegnBookeUtstyrSide();
      break;
    case "eventDetailsPage":
      html = tegnArrangementDetaljerSide();
      break;
    case "arrangementerSide":
      html = tegnArrangementerSide();
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
    case "editBulletins":
      html = drawAdminEditBulletins();
      break;
    case "manageBulletins":
      html = drawAdminManageBulletins();
      break;
    case "calender":
      html = drawAdminCalender();
      break;
    case "signUps":
      html = drawAdminSignUps();
      break;
    case "addEvent":
      html = drawAdminAddEvents();
      break;
    case "addProduct":
      html = drawAdminAddProducts();
      break;
    case "editProduct":
      html = drawAdminEditProducts();
      break;
    case "addEquipment":
      html = drawAdminAddEquipment();
      break;
    case "editEquipment":
      html = drawAdminEditEquipment();
      break;
    case "manageRooms":
      html = drawAdminManageRooms();
      break;
    case "userBulletinBoard":
      html = drawUserBulletinBoard();
      break;
    case "userProfileHome":
      html = drawUserProfileHomePage();
      break;
    case "userEditProfile":
      html = drawUserChangePersonaliaPage();
      break;
    case "userEditSubscription":
      html = drawUserEditSub();
      break;
    case "userChangeMembershipType":
      html = drawUserSelectSub();
      break;
    case "userWebstore":
      html = drawUserWebstore();
      break;
    case "adminOrders":
      html = drawAdminOrderFulfillment();
      break;
    default:
      html = `<p>404 - Page not found</p>`;
  }

  app.innerHTML = html;
}
