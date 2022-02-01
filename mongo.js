const mongoose = require("mongoose")

if(process.argv[2] === undefined){              // Finaliza si no tiene password
    console.log("Password needed ....")
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fedesAdmin:${password}@clusterdeprueba.wtvmw.mongodb.net/phonebook-app?retryWrites=true&w=majority`

const connectDataBase = (url) => {
    mongoose
        .connect(url)
        .then(() => console.log("Database conected..."))
        .catch(error => {
            console.log(error.message)
            process.exit(1)
        })
}
const schemeModelDB = () => {
    const personScheme = new mongoose.Schema({
        name: String,
        number: Number
    })

    const Person = mongoose.model("Person",personScheme)
    return [personScheme,Person]
}

const argumentsLength = process.argv.length         //Controls de cantidad de argumentos
if (argumentsLength <= 3){ 
    connectDataBase(url)
    const [schemePerson,Person] = schemeModelDB()
    Person
        .find()
        .then(people => {
            people.forEach(p => {
                console.log(`Name: ${p.name}  Number:  ${p.number}`)  
            });
            mongoose.connection.close()
                console.log("Database disconected...")
        })
}
else{
    const name = process.argv[3]
    const number = process.argv[4]

    if (typeof(name) !== "string" ){                    //Control de tipo de arugmento de nombre 
        console.log("The second argument, needs to be a name-string")
        process.exit()
    }
    const isAnNumber = (number) => {return !isNaN(number)}
    if (!isAnNumber(number)) {                       //Control de tipo de arguymento numero
        console.log("The third argument, needs to be a phone-number")
        process.exit()
    }
    //==============================MONGOOSE=========================================

    connectDataBase(url)           //Conecta con DATABASE

    const [schemePerson,Person] = schemeModelDB()       //devuelve el esquema y el modelo Person

    const newPerson = new Person({name: name, number: Number(number)})      //Crea una nueva persona con una instancia del modelo Person

    newPerson
        .save()
        .then(result => {
            console.log(result)
            console.log(`Person ${name} ${number} added`)
            mongoose.connection.close()
            console.log("Database disconected...")
    })
}



