require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5fc1b85e78f4f147983b74de', {age: 2}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 2})
// }).then((u2)=>{
//     console.log(u2)
// }).catch((error)=>{
//     console.log(error)
// })

const updateAgeAndCount = async (_id, age)=>{
    await User.findByIdAndUpdate(_id, age)
    const totalRecordCount = await User.countDocuments(age)
    return totalRecordCount
}

updateAgeAndCount('5fc1b85078f4f147983b74dc', {age: 42}).then((result)=>{
    console.log('total records count: ' + result)
}).catch((e)=>{
    console.log('e: ' + e)
})