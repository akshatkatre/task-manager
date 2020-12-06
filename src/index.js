const express = require('express')
require('./db/mongoose')
const { ObjectID } = require('mongodb')
const userRouter = require('../src/routers/users')
const taskRouter = require('../src/routers/tasks')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port  = process.env.PORT || 3000

const jwt = require('jsonwebtoken')
const Tasks = require('./models/task')

const myFunc = async ()=> {
    const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse',
    {expiresIn: '7 days'})
    console.log(token)
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}
const User = require('./models/user')
//myFunc()
const main = async () =>{
    const task = await Tasks.findById('5fcc3454460b4d0a7367056b')
    await task.populate('owner').execPopulate()
    console.log(task.owner)

    const user = await User.findById(task.owner)
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

// main()

app.listen(port, ()=>{
    console.log('Server is running on : ' + port)
})

