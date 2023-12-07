import utility from '../data/utility.js';
import genericFn from '../pageobjects/genericFn.js';
import locators from '../pageobjects/locators.js';

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await genericFn.login(utility.login.dev_user_id, utility.login.dev_pwd);
        await expect(await locators.loginpage.headingText).toHaveTextContaining('Projects');
    })
})