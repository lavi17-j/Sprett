function drawAdminHeader() {
return /*HTML*/ `
    <header class="adminTopBar">
              <div class="userInfo">
                <span>${displayUserName()}</span>
                <div class="userAvatar"></div>
                <button class="logoutBtn" onclick=logoutUser()>Log Ut</button>
              </div>
    </header>
    `;

}
