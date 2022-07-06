const router = require('express').Router()
const Usuario = require('../../Models/Usuarios/AddUsers')
const database = require('../../DB/Db')
const bcrypt = require('bcrypt')



//Rota criar usuario 
router.post('/add', async (req,res) => {

    const {nome,usuario,setor,password} = req.body

    if(!nome){return res.status(422).json({msg:" Inserir o Nome! "})}
    if(!usuario){return res.status(422).json({msg:" Insirir o nome do usuario! "})}
    if(!password){return res.status(422).json({msg:" Insirir Password! "})}
    if(!setor){return res.status(422).json({msg:" Insirir Setor! "})}

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

     const userExist = await Usuario.findOne({ where : {usuario:usuario}})

     if(userExist){return res.status(422).json({msg:"Usuario ja existe!"}) }

    try {
        await database.sync()

        const novoUsuario =  Usuario.create({
            nome,
            usuario,
            setor,
            password:passwordHash
        })

        res.status(200).json({msg:"Usuario Criado!"})
    } catch (error) {
        console.log(error)
        res.status(422).json({msg:"Erro ao insirir "})
        
    }

     
})

//Rota de excluir usuario 
router.delete('/delete/:id', async (req,res) =>{
    
    const id = req.params.id
    
    const usuarios = await Usuario.findByPk(id)
    if(!usuarios){return res.status(422).json({msg:"Usuario nao encontrado "})}
    try {
        await usuarios.destroy()
        res.status(200).json({msg:'Usuario excluido!'})
    } catch (error) {
        console.table(error)
    }

})
//Rota de usuario 
router.get('/list', async (req,res) =>{
    try {
        
        const usuarios = await Usuario.findAll({attributes: {exclude: ['password']}})
        res.status(200).json(usuarios)

    } catch (error) {
        console.log(error)
        res.status(422).json({msg:"Não foi possivel puxar os dados!"})
        
    }
})


module.exports = app => app.use ('/usuarios',router)