const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())



//router
app.get('/', (req ,res) =>{
res.send("hello Node Api")
})
app.get('/blog', (req ,res) =>{
    res.send("hello Node Api blog")
    })
    //get data in database by specific name 
    app.get('/product', async(req , res)=>{
        try {
            const product = await Product.find({name: "Tayyab"})
            res.status(200).json(product);
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message : error.message})
            
        }
        
    })
    //get data in database by id 
    app.get('/product/:id', async(req , res)=>{
        try {
            const {id}= req.params;
            const product = await Product.findById(id)
            res.status(200).json(product);
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message : error.message})
            
        }
        
    })

    //get data in database 
    //for all data 
    // app.get('/product', async(req , res)=>{
    //     try {
    //         const product = await Product.find({})
    //         res.status(200).json(product);
    
    //     } catch (error) {
    //         console.log(error.message)
    //         res.status(500).json({message : error.message})
            
    //     }
        
    // })



    //create data in database 
app.post('/product', async(req , res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
        
    }
    
})


//update data in database 
app.put('/product/:id', async(req , res)=>{
    const {id}= req.params;
    try {
    const product = await Product.findByIdAndUpdate(id , req.body)
    
    if(!product){
        res.status(404).json({message: `cant find any product against the id ${id}`})
    }
    const productUpdated = await Product.findById(id)
    res.status(200).json({message:productUpdated})
} catch (error) {
     res.status(500).json({message : error.message})   
}

})


//delete data from database 
app.delete('/product/:id', async(req , res)=>{
    const {id}= req.params;
    try {
    const product = await Product.findByIdAndDelete(id , req.body)
    
    if(!product){
        res.status(404).json({message: `cant find any product against the id ${id}`})
    }
    res.status(200).json({message:product})
} catch (error) {
     res.status(500).json({message : error.message})   
}

})
    



mongoose.set("strictQuery" , false)
mongoose.connect('mongodb+srv://Naved:Navedijaz@nodefirstapi.u9ydq5a.mongodb.net/Node_API?retryWrites=true&w=majority')
 .then(()=>{
    console.log("connected to mongooDb")
    app.listen(3000 , ()=>{
        console.log(" node api is running on port 3000")
    })
 }).catch(()=>{
    console.log("error in connection")
 })   



