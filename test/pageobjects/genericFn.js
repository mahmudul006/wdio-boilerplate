import locators from "./locators.js";
import utility  from "../data/utility.js";
class GenericFn{
    async open () {
        await browser.maximizeWindow();
        await browser.url('/');
    }
    async login(username, password) {
      await this.open()
      console.log(await $('aria/Amberg Technologies AG').getText());
      console.log(await $('<span />').getText());
      console.log(await $('button=Login').getText());
      
      // await locators.loginpage.inputUsername.setValue(username);
      await $("[name='username']").setValue(username);
      
      await locators.loginpage.inputPassword.setValue(password);
      await $('<button />').click();

        // await locators.loginpage.btnSubmit.click();
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
              await $$(`//span[normalize-space()='${idxx===1 ? 'Project Configuration' : 'Customer information'}']`)[0].click();
              await arrow.parentElement().click();
              const target = await $(`//li[normalize-space()='${input[1]}']`);
              await target.scrollIntoView();
              await target.click();
              continue;
            }
            const locate = await $(`${input==='Comment' ? 'textarea' : 'input'}[name='${section}.${input}']`);
            await locate.scrollIntoView({ block: 'end' });
            await locate.setValue(utility.newproject.inputValues[idx++])
          }
        }
        await locators.newproject.new_project_create_complete.click();
    }
    async generateAnUniqueProjectName(name) {
        await this.genericWaitUntil(await locators.searchproject.searchField)
        await locators.searchproject.searchField.setValue(name);
        await browser.pause(3000);
        let str = '', mx = 0;
        for (const elem of await locators.searchproject.searchResult) {
          str = await elem.getText();
          const parts = str.split('-');
          if (parts.length > 1) {
            const num = Number(parts[1]);
            mx = Math.max(mx, num);
          }
        }
        const newProjectName = `${name}-${mx + 1}`;
        console.log(newProjectName);
        return newProjectName;
    }
    async deleteASingleProject(name) {
        await browser.url('/');
        await locators.searchproject.searchField.setValue(name);
        let elements = await locators.searchproject.searchResult;
        await this.genericWaitUntil(elements)
        await elements[0].click();

        await $("h3").click();
        await this.genericWaitUntil(await $("//span[normalize-space()='Project']"));
        await locators.deleteproject.delete_project_button.click();
        await locators.deleteproject.project_delete_confirm.click();
        await this.genericWaitUntil(await $("//div[@role='alert']"));
        expect(await $("//div[@role='alert']").getText()).toEqual('Project deleted successfully')
    }
}
export default new GenericFn();