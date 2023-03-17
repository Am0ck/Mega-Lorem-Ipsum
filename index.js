const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//const mongoDB = 'mongodb+srv://user:1zOUuRh5O3uvBXhn@cluster0.ojbpu2j.mongodb.net/?retryWrites=true&w=majority'
const mongoDB = 'mongodb://0.0.0.0:27017/dog_api'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//pass: 1zOUuRh5O3uvBXhn
const db = mongoose.connection
db.on('error', console.error.bind(console, 'DB conn error'))
db.once('open', () => console.log('Connected to DB'));
const app = express()
const port = 4567
 const dogSchema = new mongoose.Schema({
     name: String,
     breed: String
 })

 const Dog = mongoose.model('Dog', dogSchema)

// const app = express()
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())
// const port = 4567
// // const dogs = [
// //     {name:"Olly", breed: "Mix"},    
// //     {name:"Molly", breed: "Beagle"}
// // ]
//app.use(express.json())
 app.get("/", async (req, res) => {
    const dgs = await Dog.find({});
    res.json(dgs)
    console.log(dgs)
 //    res.json(dogs)
 })

 app.get("/dogs/:id", async (req, res) => {
    
    const dgs = await Dog.findById(req.params.id); 
    console.log(dgs)
    res.json(dgs)
 })

app.post("/dogs", async (req, res) => {
    res.send(JSON.stringify(req.body));
     console.log('doges isnerting: '+req.body.name)
     const dg = new Dog({
         name: req.body.name,
         breed: req.body.breed
     })
     console.log('doges isnerting: '+dg)
     console.log(req.body)
     const result = await dg.save()
 })
 
app.put("/dogs/:id", async(req, res) => {
    console.log('updatre shoon')    
    const dg = await Dog.findByIdAndUpdate(req.params.id,req.body)
        console.log('doges updated:')
        const result = await dg.save()
        res.json(dg)
 })
 app.delete("/dogs/:id", async(req, res) => {
    console.log('del shoon')    
    const dg = await Dog.findByIdAndDelete(req.params.id,req.body)
        console.log('doges removed:')
        // const result = await dg.save()
         res.send("deleted")
 })
app.listen(port, () => {
    console.log('Listening on port '+port)
})
