const mongoose = require('mongoose')
const productSchema = mongoose.Schema({

    name : {
        type : String ,
        required : [true , "please enter a product name "]
    },
    quantity :{
        type : Number,
        required : true ,
        default : 0
    },
    price :{
        type : Number,
        required : true 
    },
    image :{
        type : String ,
        required : false ,
        url : "https://www.pexels.com/photo/waterfalls-during-sunset-954929/"
    }
    },
    {
        timestamp : true 
    }
)


const Product = mongoose.model('Product', productSchema)

module.exports =Product; 