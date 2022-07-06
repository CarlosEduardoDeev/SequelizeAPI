const express = require('express')
const app = express()

app.use(express.json())



require('./Routes/RotasExtintor/Extintor')(app)
require('./Routes/RotasUsuario/Usuario')(app)
require('./Routes/RotaLogin/LoginUser')(app)




app.listen('3000',(req,res) =>{
    console.log('Connect')
})