import locators from "./locators.js";
import urls from "../../urls.js";
import { fileURLToPath } from 'url';
import path from 'path';
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
    async fileUpload(pathToFile, locator){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, pathToFile);
    
        const upload_file_element = await locator;
        await browser.execute(async (e) => {
            e.style.display = 'block'; 
        }, upload_file_element)
    
        await upload_file_element.waitForDisplayed();
        await upload_file_element.setValue(filePath);
    }
}
export default new GenericFn();