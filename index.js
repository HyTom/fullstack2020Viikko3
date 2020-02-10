
const express = require('express')
const app = express()

const morgan = require('morgan')

const cors = require('cors')

app.use(express.static('build'))
app.use(cors()) 
app.use(express.json(), morgan('tiny')) 

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "lol ",
      "number": "joo",
      "id": 7
    },
    {
      "name": "hahaajoo",
      "number": "joo",
      "id": 8
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
      res.json(person)  
    } else {
      res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId * Math.random(100)
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name | !body.number) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  const identical = persons.find(person => person.name === body.name)
  if (identical) {
    return res.status(400).json({ 
      error: 'name must be unique'  
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  res.json(person)
})

  app.get('/info', (req, res) => {
    const date = new Date()
    res.send('<p>Phonebook has info for ' + persons.length +' people</p>' +
             date)
    res.send('<p>JOOOOOOOOOOOOO</p>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
