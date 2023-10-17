import genericFn from '../pageobjects/genericFn.js'
import utility from '../data/utility.js'
import locators from '../pageobjects/locators.js'

describe('My Login application', () => {
    before('Login', async () => {
        await genericFn.login(utility.login.dev_user_id, utility.login.dev_pwd)
    })
    it('Create Project', async () => {
        await locators.newproject.new_project_btn.click();
        await locators.newproject.new_project_name.setValue(utility.newproject.new_project_name_input);

        let idx = 0;
        const customerInputFields = ['Name', 'Street', 'Town', 'PostalCode', 'Region', 'PhoneNumber', 'Email', 'HomePage'];
        for await(let input of customerInputFields) {
            const locate = await $(`input[name='CustomerInfo.${input}']`);
            await locate.setValue(utility.newproject.customerData[idx++])
        }
        await browser.pause(4000);

        //dropdown
        await locators.newproject.country_dropdown_arrow.parentElement().click();
        await locators.newproject.selected_country.click();
        await browser.pause(5000);

        //file upload
        await genericFn.fileUpload('../data/files/logo1.png', locators.newproject.file_input)

        await locators.newproject.submit_btn.click();
        await browser.pause(4000);
    })
    it('should display "Project created successfully" alert', async () => {
        await genericFn.genericWaitUntil(await $('span=Project created successfully'))
        await expect(locators.newproject.project_created_alert).toHaveText('Project created successfully');
    });
    after('Delete Project & logout', async()=>{
        await $('button=Logout').click();
    })
})