const {MongoClient} = require('mongodb');
let Dbconn;

module.exports ={
    connection: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/Appointment')
        .then(result => {
             Dbconn = result.db()
             return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => Dbconn
}