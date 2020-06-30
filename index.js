const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const Person = require('./models/Person');
const { response } = require('express');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  require('dotenv').config();
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

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    return res.json(persons);
  });
});

app.get('/api/persons/:personId', (req, res) => {
  const { personId } = req.params;
  Person.findById(personId).then((person) => {
    if (!person) {
      return res.status(404).end();
    }
    return res.json(person);
  });
});

app.get('/info', (req, res) => {
  const date = new Date(Date.now());
  Person.find({}).then((persons) => {
    res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `);
  });
});

app.delete('/api/persons/:personId', (req, res, next) => {
  const { personId } = req.params;
  Person.findByIdAndRemove(personId)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).send({ error: 'Include both a name and a number.' });
  }
  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then(() => {
      res.status(201).send({ error: false, id: person._id.toString() });
    })
    .catch((err) => next(err));
});

app.put('/api/persons/:personId', (req, res, next) => {
  const { personId } = req.params;
  const { number } = req.body;
  Person.findByIdAndUpdate(personId, { number }, { runValidators: true })
    .then((update) => {
      console.log(update);
      res.status(200).end();
    })
    .catch((err) => next(err));
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message });
  }
  next(err);
};

app.use(errorHandler);
