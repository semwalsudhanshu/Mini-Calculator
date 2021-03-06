const path = require('path')
const express = require('express')
const app = express()
app.use(express.static('public'))
app.use('/',(req,res)=>{
    
  res.sendFile(path.join(__dirname,'public','index.html'))
})

app.listen(3000)
console.log("Application is up and running")