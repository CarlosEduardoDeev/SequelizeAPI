const express = require('express')
const app = express()

app.use(express.json())



require('./Routes/Extintor')(app)




app.listen('3000',(req,res) =>{
    console.log('Connect')
})