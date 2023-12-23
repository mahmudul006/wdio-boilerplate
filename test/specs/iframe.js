
import '@wdio/globals'

describe('My Login application',  () => {
    it('should login with valid credentials', async () => {
        await browser.url("https://www.w3schools.com/html/html_iframe.asp");

        const iframe = await $("iframe[title='W3Schools HTML Tutorial']");
        await iframe.waitForExist({timeout: 10000});
        await expect(iframe).toExist();
        await browser.switchToFrame(iframe);
        console.log("is it here ?");
        await browser.debug();
        const homeButton = await $("(//a[contains(text(),'❮ Home')])");
        await homeButton.waitForExist({timeout: 20000});
        await homeButton.waitForClickable({timeout: 20000});
        await expect(homeButton).toExist();
        await homeButton.click();
        await browser.pause(10000);
        await browser.switchToParentFrame();
        // await expect(await $("a[title='Login to your account']")).toExist()
    })
})