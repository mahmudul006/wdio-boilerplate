class Locators{
    constructor() {
        this.loginpage = new Login();
        this.projectdetails = new ProjectDetails();
    }
}
class Login{
    get inputUsername () { return $('#userId'); }
    get inputPassword () { return $('#password');}
    get btnSubmit () { return $("//button[@type='submit']");}   
}
class ProjectDetails{
    get projectDetails() { return $("//h2[normalize-space()='Projects']") }
    get logout() { return $('button[aria-label="Logout"]')}
}
export default new Locators();