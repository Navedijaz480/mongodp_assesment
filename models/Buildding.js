
const mongoose = require("mongoose");
const Buildding = new mongoose.Schema({
name :{
    type : String ,
    required : [true ,"the name of the building"]
},
address :{
    type : String ,
    required : [true ,"the address of the building"]
},
number_of_flats :{
    type : Number ,
    required : [true ,"the number_of_flats of the building"]
},
remarks :{
    type : String ,
    required : [true ,"Any additional remarks about the building"]
},
status :{
    type : Boolean ,
    required : [true ,"The status of the building (occupied, vacant, under construction, etc."]
}

});

module.exports = mongoose.model("Buildding", Buildding);

