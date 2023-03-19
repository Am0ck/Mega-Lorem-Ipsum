const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
//const mongoDB = 'mongodb+srv://user:1zOUuRh5O3uvBXhn@cluster0.ojbpu2j.mongodb.net/?retryWrites=true&w=majority'
const mongoDB = process.env.DB_CONN_STRING
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'DB conn error'))
db.once('open', () => console.log('Connected to DB'));
const app = express()
const port = process.env.PORT
 const dogSchema = new mongoose.Schema({
     name: String,
     breed: String,
     weight: Number,
     age: Number 
 })

 const Dog = mongoose.model('Dog', dogSchema)

// const app = express()
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())
 app.get("/", async (req, res) => {
    const dgs = await Dog.find({});
    res.json(dgs)
    //console.log(dgs)
 //    res.json(dogs)
 })

 app.get("/dogs/:id", async (req, res) => {
    
    const dgs = await Dog.findById(req.params.id); 
    console.log(dgs)
    res.json(dgs)
 })

app.post("/dogs", async (req, res) => {
    // alert("SERVER GOT THE POST");
    res.send(JSON.stringify(req.body));
     //console.log('doges isnerting: '+req.body.name)
     const dg = new Dog({
         name: req.body.name,
         breed: req.body.breed,
         weight: req.body.weight,
         age: req.body.age
     })
     console.log('dog inserted: '+dg)
     console.log(req.body)
     const result = await dg.save()
 })
 
app.put("/dogs/:id", async(req, res) => {
    console.log('updatre shoon')    
    const dg = await Dog.findByIdAndUpdate(req.params.id,req.body)
        console.log('doges updated:')
        const result = await dg.save()
        //res.json(dg)
        res.send("updated")
 })
 app.delete("/dogs/:id", async(req, res) => {
    console.log('del shoon')    
    const dg = await Dog.findByIdAndDelete(req.params.id,req.body)
        console.log('dog removed:')
        // const result = await dg.save()
         res.send("deleted")
 })
app.listen(port, () => {
    console.log('Listening on port '+port)
})
