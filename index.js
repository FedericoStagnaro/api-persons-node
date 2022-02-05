const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const Person = require("./models/Person");
const { request, response } = require("express");
require("dotenv").config()


// ========================= MIDDLEWARES ============================
app.use(cors())                     // Permite el acceso de distintas IP del mundo
app.use(express.json())             // Parser de json-data
//app.use(express.static("build"))    // Determina el tipo de aplicacion , concecta con el frontend

morgan.token("body", (req, res) => {
    return JSON.stringify(req.body)
})
//app.use(morgan(':method :url :status :response-time[digits] :body'));

// ========================= DATABASE CONNECTION ====================

const user = process.env.USER_DB
const pass = process.env.PASSWORD_DB
const url = `mongodb+srv://${user}:${pass}@clusterdeprueba.wtvmw.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)
    .then(() => console.log("Database conected..."))
    .catch((error) => {console.log(error)})

// =============================== END POINTS ===========================

app.get('/api/persons', (request, response,next) => {
    Person
        .find()
        .then((people)=>{

            response.json(people)
            })
        .catch(err => {next(err)})
})

app.get("/api/persons/:id", (request, response,next) => {
    const {id} = request.params
    Person
        .findById(id)
        .then((person)=>{
            if(person){response.json(person)}
            else{response.status(404).end()}})
        .catch(err => next(err))
})


app.get("/info", (request, response,next) => {
    Person
        .find()
        .then(people => {
            const stringOut = "Phonebook has info for " + people.length + " people"
            const date = new Date()
            return response.send(`<p>${stringOut}</p><br/><p>${date}</p>`)
        })
        .catch(err => {next(err)})
})

app.delete("/api/persons/:id", (request, response,next) => {
    const {id} = request.params
    Person
        .findByIdAndDelete(id)
        .then(() => response.status(204).end())
        .catch(err => {next(err)})
})

app.put("/api/persons/:id", (request,response,next) => {
    const {id} = request.params
    const personToUpdate = request.body
    Person
        .findByIdAndUpdate(id, personToUpdate, { returnDocument: "after"})
        .then(personUpdated => {
            console.log(personUpdated)
            response.status(200).json(personUpdated)})
        .catch(err => next(err))
})

app.post("/api/persons", (request, response,next) => {
    const body = request.body

    if (!body.name || !body.number) {
        const err = { name: "MissingData"}
        return next(err)
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })

    newPerson
        .save()
        .then(personSaved => response.status(201).json(personSaved))
        .catch(err => {next(err)})
})

// ============================= ERROR HANDLER =========================

app.use((request, response) => {
    response.status(404).json({ "error": "Pagina no encontrada..." })
})


app.use((error,request,response,next) => {
 
    if(error.name === "ValidationError"){ response.status(400).json({error: error.message})}
    if(error.name === "Missing Data"){ response.status(400).send({error: "Datos faltantes"})}
    if(error.name === "CastError"){ response.status(400).send( {error : "ID malformed...."})}
    //next(error)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => { console.log("Server running on port ", PORT) })