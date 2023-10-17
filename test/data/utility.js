class Utility{
    constructor() {
        this.login = new Login();
        this.newproject = new NewProject();
    }
}
class Login{
    dev_user_id = 'Inspector';
    dev_pwd = 'RMS!Go22';
}
class NewProject{
    new_project_name_input = 'Demo Project';
    customerData = ['Demo Company', 'Demo Street', 'Demo Town', 'Demo Post', 'Demo Region',
    '111111111', 'AAA@gmail.com', 'www.abc.com']
}
export default new Utility();