class Locators{
    constructor() {
        this.loginpage = new Login();
    }
}
class Login{
    get inputUsername () { return $('#userId'); }
    get inputPassword () { return $('#password');}
    get btnSubmit () { return $("//button[@type='submit']");}   
}

export default new Locators();