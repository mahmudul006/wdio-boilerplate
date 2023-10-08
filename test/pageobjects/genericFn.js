import locators from "./locators.js";

class GenericFn{
    async open () {
        await browser.maximizeWindow();
        await browser.url('/');
    }
    async login(username, password) {
        await locators.loginpage.inputUsername.setValue(username);
        await locators.loginpage.inputPassword.setValue(password);
        await locators.loginpage.btnSubmit.click();
    }
    async genericWaitUntil(element, flag=true) {
        await browser.waitUntil(async () => {
            let exist = await element.isExisting();
            return flag ? exist : !exist;
        }, {timeout: 30000})
    }
}
export default new GenericFn();