require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndUpdate('5fc1c9248232e23dd4dc9c37', 
// {completed: true}).then((task1)=>{
//     // console.log(task1)
//     return Task.countDocuments({completed: false})
// }).then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err)
// })

const taskFindAndDelete = async (_id, completed)=>{
    const tasks = await Task.findByIdAndDelete(_id)
    const notComplete = await Task.countDocuments({completed})
    return notComplete
}

taskFindAndDelete('5fc1bcae7a5f1670fcc37695', false).then((r)=>{
    console.log('total not complete: ' + r)
}).catch((e)=>{
    console.log('e: ' + e)
})