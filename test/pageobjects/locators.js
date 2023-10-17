class Locators{
    constructor() {
        this.loginpage = new Login();
        this.projectdetails = new ProjectDetails();
        this.searchproject = new SearchProject();
        this.newproject = new NewProject();
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
class SearchProject {
    get searchField() { return $('input[placeholder="Search by Project Name"]')}
    get searchResult() {return $$('//tbody/tr/td[1]/div[1]/span');}
}
class NewProject{
    get newProjectBtn(){return $("//button[normalize-space()='New Project']")}
}
export default new Locators();