import locators from "./locators.js";
import urls from "../../urls.js";
class GenericFn{
    async open (path) {
        await browser.maximizeWindow();
        await browser.url(path);
    }
    async login(username, password) {
        await this.open(urls[process.env.ENV]);
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