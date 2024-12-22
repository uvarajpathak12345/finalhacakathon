const express = require('express');
const cors = require('cors');
const {connection ,getDb } = require('./dbConn');
const { ObjectId } = require('mongodb');

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

app.post('/create', (req, res) => {
    const data = req.body;
  
    dbdata.collection('appointmentlist')
      .insertOne(data)
      .then((result) => {
        res.status(200).json({ message: 'Appointment created successfully', result });
      })
      .catch((err) => {
        console.error('Error inserting data into database:', err);
        res.status(500).json({ error: 'Error while sending data to the database' });
      });
  });


  app.delete('/delete/:id' , (req,res) => {
     const id = req.params.id
   
     if(ObjectId.isValid(id)){
        dbdata.collection('appointmentlist')
        .deleteOne({_id:new ObjectId(id)})
        .then(result => {
           res.status(200).json(result)
        })
        .catch(err => {
           res.status(500).json({err:"error occured during delecting the data"});
        })
        
     }else{
        res.status(500).json({err:'the object id not correct'})
     } 
  }) 