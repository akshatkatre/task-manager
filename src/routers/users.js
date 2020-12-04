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
