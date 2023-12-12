class Utility{
    constructor() {
        this.login = new Login();
        this.newproject = new NewProject();
    }
}
class Login{
    dev_user_id = '';
    dev_pwd = '';
}
class NewProject {
    inputValues = [
        '1', 'Demo Line', 'Demo Track', 'munich', 'zurich' ,'0', '1', 'Demo Comment',
         'Demo Company', 'Demo Street',
         'Demo Town','Demo Post','Demo Region',
         111111111,'AAA@gmail.com','www.abc.com'
       ];
}
export default new Utility();