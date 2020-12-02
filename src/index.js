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

const myFunc = async ()=> {
    const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse',
    {expiresIn: '7 days'})
    console.log(token)
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunc()

app.listen(port, ()=>{
    console.log('Server is running on : ' + port)
})

