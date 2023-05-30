
const mongoose = require("mongoose");

const employee	 = new mongoose.Schema({

employee_name : {
    type : String ,
    required : [true , "The name of the employee "]
},
passport_number : {
    type : String ,
    required : [true , "The passport number of the employee "]
},
nationality : {
    type : String ,
    required : [true , "The nationality of the employee "]
},
visa_category : {
    type : String ,
    required : [true , "The type of visa the employee holds	"]
},
Date_of_entry : {
    type : String ,
    required : [true , "The Date the employee entered the country"]
},
sponsor : {
    type : String ,
    required : [true , "The sponsor of the employee's visa"]
},
remarks : {
    type : String ,
    required : [true , "Any additional remarks about the employee"]
},
last_Date_for_labor_office : {
    type : Date ,
    required : [true , "The last Date the employee needs to renew their labor office registration	"]
},
last_Date_for_immigration : {
    type : Date ,
    required : [true , "The last Date the employee needs to renew their immigration status	"]
},
last_Date_for_eid : {
    type : Date ,
    required : [true , "The last Date the employee needs to renew their Emirates ID		"]
},
profession_on_visa : {
    type : String ,
    required : [true , ""]
},
job_description : {
    type : String ,
    required : [true , ""]
},
job_title : {
    type : String ,
    required : [true , ""]
},
status : {
    type : Boolean ,
    required : [true , ""]
}
});

module.exports = mongoose.model("employee", employee);
