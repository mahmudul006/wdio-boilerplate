import genericFn from '../pageobjects/genericFn.js';
import utility from '../data/utility.js';
import locators from '../pageobjects/locators.js';


describe('Creating New Project in Amberg RMS System  ', async () => {
    let projectName = "";
    before('login', async () => {
        await genericFn.login(utility.login.dev_user_id, utility.login.dev_pwd);
        projectName = await genericFn.generateAnUniqueProjectName('Project for Automation');
    })
    it('should add a new project', async () => {
        await genericFn.createProject('EN-13848', projectName);
        await genericFn.genericWaitUntil(await $("span=Project created successfully"));
        await expect(await $("span=Project created successfully")).toBeExisting();
    })
    it("delete the project", async() => {
        await genericFn.deleteASingleProject(projectName);
        await genericFn.genericWaitUntil(await locators.deleteproject.deleteSuccessfulAlert);
        await expect(await locators.deleteproject.deleteSuccessfulAlert).toHaveTextContaining('Project deleted successfully')
    })
    
    after('logout ', async () => {
        await locators.projectdetails.logout.click();
    })
});