import genericFn from '../pageobjects/genericFn.js'
import locators from '../pageobjects/locators.js'
import utility from '../data/utility.js'

describe('My Login application', () => {
    before('go to browser & login', async () => {
        await genericFn.open()
        await genericFn.login(utility.login.dev_user_id, utility.login.dev_pwd)
    })
    it('project details check', async () => {
        await genericFn.genericWaitUntil(await locators.projectdetails.projectDetails);
        expect(await locators.projectdetails.projectDetails.getText()).toEqual('Projects');
    })
    it('logout', async () => {
        await locators.projectdetails.logout.click();
    })
    after('cleanup ', async () => {
        console.log('cleanup tasksssssss');
    })
})