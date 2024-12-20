const express = require('express');
const cors = require('cors');
const {connection ,getDb } = require('./dbConn')

let  dbdata;
const dataColl = []
const app = express()
app.use(cors());
app.use(express.json())

connection ((err) => {
    if (!err){
        app.listen(3000, () => {
            console.log('the port is listeing');
        })

       dbdata = getDb()
    }
})

app.get('/get' ,(req,res) => {
    dbdata.collection('appointmentlist')
    .find()
    .sort({number:1})
    .forEach (result => {
        dataColl.push(result)
    })
    .then(() => {
        res.status(200).json(dataColl)
    })
    .catch(err => {
        res.status(500).json({err: 'not fetching'})
    })
})