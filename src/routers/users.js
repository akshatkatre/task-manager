const { Router } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        user.tokens = user.tokens.concat({token})
        await user.save()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res)=>{
    try{
        const user = await User.find(req.body)
        res.send(user)  
    }catch(e){
        res.status(400).send(e)
    }
}) 

router.get('/users/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if (user){
            res.status(200).send(user)
        }
        res.status(404).send(user)
        
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.patch('/users/:id', async (req, res)=> {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email','name','age', 'password']
    const isAllowed = updates.every((update)=>allowedUpdates.includes(update))
    console.log(isAllowed)
    if (!isAllowed){
        return res.status(400).send({'error': 'invalid data sent'})
    }
        const _id = req.params.id
        try{
            const user = await User.findById(_id)
            updates.forEach((update)=>{
                user[update] = req.body[update]
            })
            user.save()
            if (!user){
                res.status(400).send([])
            }
            res.status(201).send(user)
        }catch(e){
            res.status(400).send(e)
        }
})

router.delete('/users/:id', async (req, res)=> {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user){
            return res.status(404).send({"message": "id not found"})
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.post('/user/login', async (req, res) => {
    
    try{
        const user = await User.findByCredential(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        user.tokens =user.tokens.concat({token})
        user.save()
        res.send({user, token})
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router
