const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())  // Parser de json-data

app.use(express.static("build"))

morgan.token("body", (req,res) => {
    return JSON.stringify(req.body)
})

//app.use(morgan(':method :url :status :response-time[digits] :body'));


let persons = [
    {
        id:1,
        name: "Federico",
        number:"3513643"
    },
    {
        id:2,
        name: "Leonardo",
        number:"51849264"
    },
    {
        id:3,
        name: "Andres",
        number:"48486895"
    }
]

app.get('/api/persons', (request,response) => { 
    response.json(persons)
    }
)

app.get("/api/persons/:id",(request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        return response.json(person)
    }
    else{ 
        return response.status(404).end()
    }
})


app.get("/info",(request,response) => { 
    if (persons.length > 0) {
        const string = "Phonebook has info for " + persons.length + " people"
        const date = new Date()
        return response.send(`<p>${string}</p><br/><p>${date}</p>`)
    }
})

app.delete("/api/persons/:id",(request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(pers => pers.id !== id)
    response.status(204).end()
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

app.post("/api/persons",(request,response) => {
    const body = request.body
    
    if(!body.name || !body.number){
        return response.status(400).json({error:"Faltan datos para el registro"})
    }
    if (persons.find(p => p.name === body.name)){
        return response.status(400).json({error:"Esta persona ya ha sido agregada..."})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandomInt(0,5000)
    }
    persons = persons.concat(person)
    response.status(201).json(person)
})

app.use((req,res)=>{
    res.status(404).json({"error": "Pagina no encontrada..."})
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {console.log("Server running on port ", PORT)})