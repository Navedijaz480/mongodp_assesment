const express = require('express')
const app = express()




//router
app.get('/', (req ,res) =>{
res.send("hello Node Api")
})




app.listen(3000 , ()=>{
    console.log(" node api is running on port 3000")
})