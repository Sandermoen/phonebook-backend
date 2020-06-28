const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

let persons = [
  {
    name: 'bob1',
    number: '923491993',
    id: 1,
  },
  {
    name: 'bob2',
    number: '234329329',
    id: 2,
  },
  {
    name: 'bob3',
    number: '98592923',
    id: 3,
  },
];

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  morgan.token('body', function (req, res) {
    return JSON.stringify(req.body);
  });
  app.use(
    morgan(
      ':method :url :status :response-time ms - :body - :req[content-length]'
    )
  );
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.get('/api/persons', (req, res) => {
  res.send(persons);
});
app.get('/api/persons/:personId', (req, res) => {
  const { personId } = req.params;
  const person = persons.find((person) => person.id === Number(personId));
  if (!person) {
    return res.status(404).end();
  }
  return res.send(person);
});

app.get('/info', (req, res) => {
  const date = new Date(Date.now());
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>
  `);
});

app.delete('/api/persons/:personId', (req, res) => {
  const { personId } = req.params;
  const person = persons.find((person) => person.id === Number(personId));
  if (!person) {
    return res.status(404).end();
  }
  persons = persons.filter((person) => person.id !== Number(personId));
  return res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  const person = persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );
  if (!name || !number) {
    return res.status(400).send({ error: 'Include both a name and a number.' });
  }
  if (person) {
    return res
      .status(400)
      .send({ error: 'That person already exists memory.' });
  }
  const id = Math.floor(Math.random() * 99999);
  persons.push({ name, number, id });
  return res.status(201).end();
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
