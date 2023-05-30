const express = require('express')
const mongoose = require('mongoose')
const BuilddingRouter = require("./routes/BuilddingRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const userRouter = require("./routes/userRoutes");
const app = express()
  


app.use(express.json())


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
 app.use("/building", BuilddingRouter);
 app.use("/employee", employeeRouter);
 app.use("/user", userRouter);


 app.all("*", (req, res) => {
   res.status(404).send("<h1>404! Page not found</h1>");
 });



