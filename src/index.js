const express = require("express") //import ExpressJS
const path = require("path") //import PathJS -> for the utilities for working with files and directory paths
const hbs = require("hbs") //import HandlebarsJS
const collection = require("./mongodb")
const { Session } = require("inspector/promises")
const app = express() //starting ExpressJS

const templatePath = path.join(__dirname, "../templates") //preparing our templatePath to replace the views path

app.use(express.json()) //get the hbs files and get mongodb successfully connected


app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/therapistlogin", (req, res) => {
    res.render("therapistlogin")
})

app.get("/therapistsignup", (req, res) => {
    res.render("therapistsignup")
})

app.get("/patientlogin", (req, res) => {
    res.render("patientlogin")
})

app.get("/patientsignup", (req, res) => {
    res.render("patientsignup")
})

app.get("/therapisthome", (req, res) => {
    res.render("therapisthome")
})

app.get("/patienthome", (req, res) => {
    res.render("patienthome")
})

app.post("/therapistlogin", async (req, res) => {
    try{
        const check = await collection.therapistUsersCollection.findOne({username : req.body.username})

        if(check.password === req.body.password){          
            res.redirect("therapisthome")

    }else{
        res.send("Password is incorrect!")

    }
    }catch {
        res.send("There seems to be no account connected to the username")
    }
})

app.post("/therapistsignup", async (req, res) => {
    var newUser = {

    username : req.body.username,
    password : req.body.password

    }

    await collection.therapistUsersCollection.insertMany([newUser])

    res.redirect("therapisthome")
})

app.post("/patientlogin", async (req, res) => {
    try{
        const check = await collection.patientUsersCollection.findOne({username : req.body.username})

        if(check.password === req.body.password){          
            res.redirect("patienthome")

    }else{
        res.send("Password is incorrect!")

    }
    }catch {
        res.send("There seems to be no account connected to the username")
    }
})

app.post("/patientsignup", async (req, res) => {
    var newUser = {

    username : req.body.username,
    password : req.body.password

    }

    await collection.patientUsersCollection.insertMany([newUser])

    res.redirect("patienthome")
})


app.listen(3000, () => {
    console.log("Listening to Port 3000")
})

   