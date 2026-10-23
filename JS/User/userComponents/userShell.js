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
      { page: "loggedInPage", text: "Hjem" },
      { page: "bookingPage", text: "Booking" },
      { page: "userBulletinBoard", text: "Oppslag" },
      { page: "userProfileHome", text: "Profil" },
    ];

    let html = "";

    for (const tab of tabs) {
        let selectedClass = "";
        if (model.app.currentPage === tab.page) {
            selectedClass = "selected";
        }

        html += /*HTML*/ `
            <button class="${selectedClass}" onclick="navigateTo('${tab.page}')">
                ${tab.text}
            </button>
        `;

    }

    return /*HTML*/ `<nav class="user-nav">${html}</nav>`;
}