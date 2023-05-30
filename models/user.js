
const mongoose = require("mongoose");

const user	 = new mongoose.Schema({

name : {
    type : String ,
    required : [true , "The name of the user "]
},
number : {
    
    type : String ,
    required : [true , "The passport number of the user "]
},
email : {
    type : String ,
    required : [true , "The email of the user "]
},
password : {
    type : String ,
    required : [true , "The type of password"]
}
});

module.exports = mongoose.model("user", user);
