class Locators{
    constructor() {
        this.loginpage = new Login();
        this.newproject = new NewProject();
    }
}
class Login{
    get inputUsername () { return $('#userId'); }
    get inputPassword () { return $('#password');}
    get btnSubmit () { return $("//button[@type='submit']");}   
}
class NewProject{
    get new_project_btn() { return $('button=New Project'); }
    get new_project_name() { return $("input[name='ProjectInfo.Name']");}
    get new_project_num() { return $("input[name='ProjectInfo.Number']");}

    get new_project_strt() { 
        return $("input[name='MetaData.Start.Name']");
    }
    get new_project_end() {
        return $("input[name='MetaData.End.Name']");
    }
    get new_project_start_place() {
        return $("input[name='MetaData.Start.Name']");
    }
    get new_project_end_place() {
        return $("input[name='MetaData.End.Name']");
    }
    get new_project_strt_local() {
        return $("input[name='MetaData.Start.Stationing']");
    }
    get new_project_end_local() {
        return $("input[name='MetaData.End.Stationing']");
    }
    get new_project_comment() {
        return $("textarea[name='MetaData.Comment']");
    }
    get new_project_line_section() {
        return $("input[name='ProjectInfo.LineSectionName']");
    }
    get new_project_track_name() {
        return $("input[name='ProjectInfo.TrackName']");
    }

    //customerInfo
    get company_name() {
        return $('input[name="CustomerInfo.Name"]');
    }
    get street() {
        return $('input[name="CustomerInfo.Street"]');
    }
    get town() {
        return $('input[name="CustomerInfo.Town"]');
    }
    get postal_code() {
        return $('input[name="CustomerInfo.PostalCode"]');
    }
    get region() {
        return $('input[name="CustomerInfo.Region"]');
    }
    get country() {
        return $('input[name="CustomerInfo.Country"]');
    }
    get phone() {
        return $('input[name="CustomerInfo.PhoneNumber"]');
    }
    get email() {
        return $('input[name="CustomerInfo.Email"]');
    }
    get website() {
        return $('input[name="CustomerInfo.HomePage"]');
    }

    get customer_info() {return $('span=Customer information');}
    get country_dropdown_arrow(){ return $$("svg[data-testid='ArrowDropDownIcon']")[1];}
    get selected_country(){ return $('li=Zimbabwe');}
    get file_input(){ return $("input[type='file']")}
    get submit_btn() {return $("button[type='submit']");}
    get project_created_alert() {return $("//div[@role='alert']");}
}

export default new Locators();