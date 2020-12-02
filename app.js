const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

mongoClient.connect(connectionURL, {useNewUrlParser: true}, 
    (error, client) => {
        if (error){
            return console.log("An error occured")
        }
        
    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'kini',
    //     age: 44
    // }, (error, result)=>{
    //     if (error){
    //         console('An error occured while insertion')
    //         return console.log(error)
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('users').insertMany([
    //     {name: 'ron', age: 13},
    //     {name: 'rick', age: 55}
    // ], (error, result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result.ops)
    // })

    db.collection('tasks').insertMany([
        {description: 'Review SDD', completed: false},
        {description: 'Log file Analysis', completed: false},
        {description: 'Update ticket', completed: false}
    ],(error,result) => {
        if (error){
            return console.log(error)
        }

        console.log(result.ops)
    })
})

