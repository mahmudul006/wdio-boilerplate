import locators from "./locators.js";
import utility  from "../data/utility.js";
import path from 'path';
import { fileURLToPath } from 'url';

class GenericFn{
    async open () {
        await browser.maximizeWindow();
        await browser.url('/');
    }
    async login(username, password) {
      await this.open();
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
    async createProject(template='SRT Thailand', name='project test') {
        const sections = ['ProjectInfo', 'MetaData', 'CustomerInfo'];
        let idx = 0, idxx = 0;
        const inputFields = [['Name', 'Number', 'LineSectionName', 'TrackName', ['ProjectTemplateId', template]],
          ['Start.Name', 'End.Name', 'Start.Stationing', 'End.Stationing', 'Comment'],
          ['Name', 'Street', 'Town', 'PostalCode', 'Region', ['Country', 'Zimbabwe'], 'PhoneNumber', 'Email', 'HomePage']];
        
        await locators.newproject.newProjectBtn.click();
        for await(let [index, section] of sections.entries()){
          for await(let input of inputFields[index]) {
            if (typeof input !== 'string') {
              const arrow = await $$("svg[data-testid='ArrowDropDownIcon']")[idxx++];
              await $$(`span=${idxx===1 ? 'Project Configuration' : 'Customer information'}`)[0].click();
              await arrow.parentElement().click();
              await browser.debug();
              const target = await $(`li=${input[1]}`);
              await target.scrollIntoView();
              await target.click();
              continue;
            }
            const locate = await $(`${input==='Comment' ? 'textarea' : 'input'}[name='${section}.${input}']`);
            // await locate.scrollIntoView({ block: 'end' });
            await this.genericScrollTo(await locate)
            await locate.setValue(input==='Name' && index===0 ? name : utility.newproject.inputValues[idx++])
          }
        }
        const filePath = '../data/files/logo1.png'
        const element = await locators.newproject.companyLogo;
        await this.fileUpload(filePath, element)
        await locators.newproject.new_project_create_complete.click();
    }

    // async fileUpload(filePath, element) {
    //   const remoteFilePath = await browser.uploadFile(filePath);
    //   await browser.execute(async (e) => {
    //       e.style.display = 'block'; 
    //   }, element)
    //   await element.setValue(remoteFilePath);
    // }

    async fileUpload(url, locator) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.join(__dirname, url);
  
      const upload_file_element = await locator;
      await upload_file_element.scrollIntoView({ block: 'end' });
      await browser.execute(async (e) => {
        e.style.display = 'block';
      }, upload_file_element);
  
      await upload_file_element.waitForDisplayed();
      await upload_file_element.setValue(filePath);
    }
    
    async generateAnUniqueProjectName(name) {
      await this.genericWaitUntil(await locators.searchproject.searchField);
      await locators.searchproject.searchField.setValue(name);
      await browser.pause(5000);

      let str = '';
      let mx = 0;
      for (const elem of await $$(`span*=${name}`)) {
        str = await elem.getText();
        console.log(str);
        const parts = str.split('-');
        if (parts.length > 1) {
          const num = Number(parts[1]);
          console.log(num);
          if(num !== NaN) {
            mx = Math.max(mx, num);
          }
        }
      }
      
      const newProjectName = `${name}-${mx + 1}`;
      console.log(newProjectName);
      return newProjectName;
    }
    async deleteASingleProject(name) {
        await browser.url('/');
        await locators.searchproject.searchField.setValue(name);
        await browser.pause(2000);
        let elements = await $$(`span*=${name}`);
        //await this.genericWaitUntil(elements)
        await elements[0].click();

        await locators.deleteproject.deleteProjectName.click();
        await this.genericWaitUntil(await locators.deleteproject.deleteProjectModal);
        await locators.deleteproject.deleteButton.click();
        await locators.deleteproject.deleteConfirmButton.click();
    }

    async genericScrollTo(locate) {
      const elementLocation = await locate.getLocation();
      console.log(elementLocation);
      const viewportWidth = await browser.execute(() => window.innerWidth);
      const viewportHeight = await browser.execute(() => window.innerHeight);
      const xOffset = elementLocation.x - viewportWidth / 2;
      const yOffset = elementLocation.y - viewportHeight / 2;
      await browser.execute(
        (x, y) => {
          window.scrollTo(x, y);
        },
        xOffset,
        yOffset
      );
    }
}
export default new GenericFn();