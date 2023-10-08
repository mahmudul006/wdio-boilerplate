import genericFn from '../pageobjects/genericFn.js'
import utility from '../data/utility.js'
describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await genericFn.open()
        await genericFn.login(utility.login.dev_user_id, utility.login.dev_pwd)
    })
})