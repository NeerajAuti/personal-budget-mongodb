const express = require('express');
const cors = require('cors');
const mongoDBClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/mongodb_demo";
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const budgetDataModel = require('./models/budgetData_scheme.js')
//const json = require('./budget-data.json')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/',express.static('public'))
var json = {}

app.get('/budget', (req, res) => {
    res.json(json);
    console.log(json);
});

mongoDBClient.connect(url,{ useUnifiedTopology: true },(operationError, dbHandler) => {
    if (operationError) {
      console.log("Error");
    } else {
      console.log("Connected to db");
      dbHandler.db("mongodb_demo").collection("budgetData").find().toArray((operr, opresult) => {
          if (operr) {
            console.log(operr);
          }
          else
          {
              json= opresult;
              dbHandler.close();
          }
        });
    }
  }
);

app.post('/budget', (req,res) => { 
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            console.log(req.body);
            let data = new budgetDataModel(req.body);
            budgetDataModel.insertMany(data)
                      .then((data) =>{
                          console.log(data);
                          res.status(200).send("Data inserted Successfully");
                          mongoose.connection.close();
                      })
                      .catch((connectionError) =>{
                          console.log(connectionError);
                          res.status(400).send();
                      })
        })
        .catch((connectionError) => {
            console.log(connectionError);
            res.status(400).send();
        })
});

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});