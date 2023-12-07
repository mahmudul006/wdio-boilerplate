class Locators{
    constructor() {
        this.loginpage = new Login();
        this.projectdetails = new ProjectDetails();
        this.searchproject = new SearchProject();
        this.newproject = new NewProject();
        this.deleteproject = new DeleteProject();
    }
}
class Login{
    get inputUsername () { return $('#userId'); }
    get inputPassword () { return $('#password');}
    get btnSubmit () { return $("button[type='submit']");}
    get headingText() { return $("h2=Projects") }   
}
class ProjectDetails{
    get projectDetails() { return $("h2=Projects") }
    get logout() { return $('button[aria-label="Logout"]')}
}
class SearchProject {
    get searchField() { return $('input[placeholder="Search by Project Name"]')}
}
class NewProject{
    get newProjectBtn(){ return $("button=New Project") }
    get projectSuccessfulAlert() { return $("span=Project created successfully"); }
    get new_project_create_complete() { return $("button[type='submit']"); }
    get companyLogo() { return $("input[type='file']"); }
}
class DeleteProject {
    get deleteProjectName() { return $("h3"); }
    get deleteProjectModal() { return  $("span=Project") }
    get deleteButton() { return $("button[aria-label='Property Window Delete Button']") }
    get deleteConfirmButton() { return $("button[aria-label='confirm']") }
    get deleteSuccessfulAlert() { return $("span=Project deleted successfully"); }
}
export default new Locators();