
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router = require("express").Router();

const database = require('../../DB/Db')

const User = require('../../Models/Usuarios/AddUsers');







    router.post('/user' , async (req,res) =>{

        const {user,password,setor} = req.body

        if(!user){return res.status(422).json({msg:"O usuario é obrigatorio"})}
        if(!password){return res.status(422).json({msg:"A senha é obrigatorio"})}

        
        const usuario = await User.findOne({ where : {usuario:user}})
        

        if(!usuario){return res.status(422).json({msg:"Email nao encontrado ! "})}
        
        const checkPassword = await bcrypt.compare(password, usuario.password)

        if(!checkPassword){return res.status(422).json({msg:"A senha esta errada"})}
        try {
            
            await database.sync()
        
            const secret = process.env.SECRET

            const token = jwt.sign(
            {
                id:user._id,
            },
            secret,
            )
            res.status(200).json({msg:"Autenticação realizada com sucesso ",token,usuario,setor})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg:'Erro de servidor tente mais tarde'
            })
            
        }

    })


    router.get("/user/:id", checkToken, async (req,res) =>{
        
        const id = req.params.id

        const user = await User.findByPk(id,{attributes: {exclude: ['password']}})

        if(!user){
            return res.status(404).json({msg:"usuario nao encontrado"})
        }
            res.status(200).json({ user })
        })

        function checkToken(req,res,next){
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            
            if(!token){
                return res.status(401).json({msg:"acesso negado "})
            }
            try {
                const secret = process.env.SECRET

                jwt.verify(token, secret)

                next()
                
            } catch (error) {
                res.status(400).json({msg:"token invalido"})
            }
        }
    module.exports = app => app.use('/Login',router)