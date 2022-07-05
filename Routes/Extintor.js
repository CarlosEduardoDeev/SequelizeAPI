const router = require('express').Router()
const database = require('../DB/Db')
const Extintor = require('../Models/AddExtintor')



//Rota de ADD extintor
router.post('/add', async (req,res) =>{

    const {numeracao,peso,local} = req.body

if(!numeracao){return res.status(422).json({msg:"Digite a numeração "})}
if(!peso){return res.status(422).json({msg:"Digite seu peso "})}
if(!local){return res.status(422).json({msg:"Digite o local que se encontra ! "})}

try {
    await database.sync();
    
    const novoProduto = Extintor.create({
        numeracao:numeracao,
        peso:peso,
        local:local
    })

    res.status(200).json({msg:'Exintor inserido !'})

} catch (error) {
    console.log(error)
    res.status(422).json({msg:"Nao foi possivel, adicionar "})
}

})

//Rota de Puxar lista de extintor
router.get('/list', async (req,res) =>{
    try {
        
        const extintor = await Extintor.findAll();
        res.status(200).json(extintor)

    } catch (error) {
        console.log(error)
        res.status(422).json({msg:"Não foi possivel puxar os dados!"})
        
    }
})

//Rota de puxar extintor por ID
router.get('/list/:id', async (req,res) =>{

    const id = req.params.id

    try {
        const extintores = await Extintor.findByPk(id)
        if(!extintores){ return res.status(422).json({msg:"Extintor nao encontrado"})}
        
        res.status(200).json(extintores)
        
    } catch (error) {
        console.log(error)
    }
})

//Rota de deletar Extintor 
router.delete('/delete/:id' ,async (req,res) =>{

    const id = req.params.id

    const extintores = await Extintor.findByPk(id)
    if(!extintores){ return res.status(422).json({msg:"Extintor nao encontrado"})}
    try {
       
        await extintores.destroy()
        res.status(200).json({msg:"Extintor excluido! "})
        
    } catch (error) {
        console.log(error)
    }

} )


module.exports = app => app.use ('/equipamentos',router)