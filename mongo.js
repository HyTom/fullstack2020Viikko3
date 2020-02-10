require('dotenv').config()
const Person = require('./models/person')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =

    `mongodb+srv://fullstack:${password}@cluster0-gearx.mongodb.net/persons-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({  
  name: String,
  number: String,
})

const Person = mongoose.model('Persons', personSchema)

//HAKEMINEN:
// person.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person)
//     })
//     mongoose.connection.close()
//   })

const para1 = process.argv[3]
const para2 = process.argv[4]
if (typeof para1 === 'undefined' | typeof para2 === 'undefined') {
    console.log('Returning phonebook:')
     Person.find({}).then(result => {
     result.forEach(person => {
       console.log(person.name, person.number)
     })
     mongoose.connection.close()
   })
} else {

    const person = new Person({
        name: para1,
        number: para2,
    })

    person.save().then(response => {
    console.log('added ', para1, ' number ', para2, ' to phonebook');
    mongoose.connection.close();
    })
}