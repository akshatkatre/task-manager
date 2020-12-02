const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, 
    (error, client) => {
        if (error){
            return console.log("An error occured")
        }
        
    const db = client.db(databaseName)
    
    // db.collection("users").updateOne({
    //     _id: new ObjectID('5fbef8283394443d10ff25ba')
    // },{
    //     $set : {
    //         name: 'Mik'
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('users').updateMany({
        name: 'kini'
    },{
        $inc : {
            age: -1
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=> {
        console.log(error)
    })

})
