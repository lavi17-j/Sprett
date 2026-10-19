function goToLoginPage(){
    model.app.currentPage = 'loginPage';
    updateView();
}

function goToNewUserPage(){
    model.app.currentPage = 'newUserPage';
    updateView();
}