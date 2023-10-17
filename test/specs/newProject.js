import genericFn from '../pageobjects/genericFn.js';
import utility from '../data/utility.js';
describe('Creating New Project in Amberg RMS System  ', async () => {
    let projectName = "";
    before('login', async () => {
        await genericFn.login(utility.login.dev_user_id, utility.login.dev_pwd);
        projectName = await genericFn.generateAnUniqueProjectName('Project for automation');
    })
    it('should add a new project', async () => {
        await genericFn.createProject();
    })
    after('delete project', async () => {
        await genericFn.deleteASingleProject(projectName)
    })
});