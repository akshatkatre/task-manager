const { Router } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

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

router.get('/user/me', auth, async (req, res)=>{
    res.send(req.user)
}) 

router.patch('/users/me', auth, async (req, res)=> {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email','name','age', 'password']
    const isAllowed = updates.every((update)=>allowedUpdates.includes(update))
    console.log(isAllowed)
    if (!isAllowed){
        return res.status(400).send({'error': 'invalid data sent'})
    }
        try{
            updates.forEach((update)=>{
                req.user[update] = req.body[update]
            })
            req.user.save()
            res.status(201).send(req.user)
        }catch(e){
            res.status(400).send(e)
        }
})

router.delete('/users/me', auth, async (req, res)=> {
    try{
        await req.user.remove()
        res.send(req.user)
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

router.post('/user/logout', auth, async (req, res)=> {
    try{
    req.user.tokens = req.user.tokens.filter((token)=>{
    return token.token !== req.token  
    })
    await req.user.save()
    res.send()
    }catch (e){
        res.status(500).send()
    }
})

router.post('/user/logoutAll', auth, async (req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send({"message": "Logout successful"})
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
