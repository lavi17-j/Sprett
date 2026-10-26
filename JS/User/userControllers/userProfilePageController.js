function initEditProfileForm() {
  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);
  if (!user) return;

  const profileState = model.viewState.profilePage;
  profileState.username = user.username || "";
  profileState.email = user.email || "";
  profileState.phone = user.phone || "";
  profileState.address = user.address || "";
  profileState.postcode = user.postCode || "";

  profileState.loadedUserId = model.app.loggedInUserId;

  if (profileState.isEmailEditable === undefined)
    profileState.isEmailEditable = false;
  if (profileState.isPhoneEditable === undefined)
    profileState.isPhoneEditable = false;
  if (profileState.isAddressEditable === undefined)
    profileState.isAddressEditable = false;
}

function toggleEditField(fieldKey) {
  const profileState = model.viewState.profilePage;
  if (fieldKey === "email")
    profileState.isEmailEditable = !profileState.isEmailEditable;
  if (fieldKey === "phone")
    profileState.isPhoneEditable = !profileState.isPhoneEditable;
  if (fieldKey === "address")
    profileState.isAddressEditable = !profileState.isAddressEditable;
  updateView();
}

function saveFieldChanges(fieldKey) {
  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);
  if (!user) return;

  const profileState = model.viewState.profilePage;

  if (fieldKey === "email") {
    user.email = profileState.email;
    profileState.isEmailEditable = false;
  } else if (fieldKey === "phone") {
    user.phone = profileState.phone;
    profileState.isPhoneEditable = false;
  } else if (fieldKey === "address") {
    user.address = profileState.address;
    profileState.isAddressEditable = false;
  }
  updateView();
}

function getNextPaymentDate(user) {
  const startDateStr =
    user.membershipStartUpDate || user.membershipApplicationDate;
  if (!startDateStr) return "Ikke registrert";

  const startDate = new Date(startDateStr);
  const today = new Date();

  let nextPayment = new Date(
    today.getFullYear(),
    today.getMonth(),
    startDate.getDate(),
  );

  if (today > nextPayment) {
    nextPayment.setMonth(nextPayment.getMonth() + 1);
  }

  return nextPayment.toISOString().split("T")[0];
}

function selectMembership(membershipId) {
  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);
  if (!user) return;

  user.membershipType = membershipId;

  navigateTo("userEditSubscription");
}