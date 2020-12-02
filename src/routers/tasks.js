const { Router } = require('express')
const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    
})

router.get('/tasks', async (req, res)=>{
    try{
        const task = await Task.find(req.body)
        res.status(200).send(task)
    }catch(e){
        res.status(400).send(e)
    }
}) 

router.get('/tasks/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            res.status(404).send([])
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res)=>{
    console.log(req.body)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isAllowed = updates.every((update)=> allowedUpdates.includes(update))
    if (!isAllowed){
        return res.status(400).send({'error': 'invalid input data'})
    }
    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true})
        if(!task){
            res.status(404).send([])
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req, res)=> {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task){
            return res.status(404).send({"message": "id not found"})
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router