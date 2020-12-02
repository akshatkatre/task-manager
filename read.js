const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, 
    (error, client) => {
        if (error){
            return console.log("An error occured")
        }
        
    const db = client.db(databaseName)
    // db.collection('users').findOne({name: 'kini'}, (error, result) => {
    //     if (error){
    //         return console.log(error)
    //     }

    //     console.log(result)
    // })

    // db.collection('users').find({name: 'kini'}).toArray((error, users)=>{
    //     console.log(users)
    // })

    // db.collection('users').find({name: 'kini'}).count((error, ct)=>{
    //     console.log(ct)
    // })

    db.collection('tasks').findOne({_id: new ObjectID("5fbeffaaf8c15c5a401afcc0")}, 
    (error, result)=>{
        if (error){
            return console.log(error)
        }

        console.log(result)
    })
    console.log('**** Printing find***')
    db.collection('tasks').find({completed: false})
    .toArray((error, result) => {
        if (error){
            return console.log(error)
        }

        console.log(result)
    })
})
