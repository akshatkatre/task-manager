const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, 
    (error, client) => {
        if (error){
            return console.log("An error occured")
        }
        
    const db = client.db(databaseName)
    
    // db.collection('users').deleteMany({
    //     name: 'kini'
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=> {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: "Update ticket"
    }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
        console.log(error)
    })

})
