function drawUserShell(contentHtml) {
  return /*HTML*/ `
<div class="userLayout">
    ${createLoggedInHeaderHtml()}
    ${createUserNavHtml()}

    <div class="userContentArea">
        ${contentHtml}
    </div>

    ${createFooterHtml()}
</div>
`;
}

function createUserNavHtml() {
  const tabs = [
    //Legg til sidene her også for å få riktig tav navigation til å vises
    { pages: ["loggedInPage"], text: "Hjem" },
    { pages: ["bookingPage"], text: "Booking" },
    { pages: ["userBulletinBoard"], text: "Oppslag" },
    {
      pages: ["userProfileHome", "userEditProfile", "userEditSubscription"],
      text: "Profil",
    },
  ];

  let html = "";

  for (const tab of tabs) {
    let selectedClass = "";
    if (tab.pages.includes(model.app.currentPage)) {
      selectedClass = "selected";
    }

    html += /*HTML*/ `
            <button class="${selectedClass}" onclick="navigateTo('${tab.pages[0]}')">
                ${tab.text}
            </button>
        `;
  }

  return /*HTML*/ `<nav class="user-nav">${html}</nav>`;
}
