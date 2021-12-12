// use express
const express = require('express');

// create express app
const app = express();

// JSON parseri, express middleware
app.use(express.json());

// määritetään portti
const port = 3000;

// mongoose käyttöön
const mongoose = require('mongoose');
// connection string - EDIT YOUR OWN HERE
const mongoDB =
  'mongodb+srv://joonaska:r0kr0k1986@joonaskacluster.yeqox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// connect mongodb
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// check connection - ok or error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database test connected');
});

// new schema
const userSchema = new mongoose.Schema({
  name: String,
});
// new model
const User = mongoose.model('User', userSchema, 'users');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  email: String,
});
// määritetään endpointit
app.get('/', (request, response) => {
  response.send('Hello from server side!');
});

// muutellaan gettiä mongolle sopivaksi

app.get('/users', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

// get pyyntö myöskin mongolle sopivaksi

app.get('/users/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) response.json(user);
  else response.status(404).end();
});

// PUT metodilla päivitetään käyttäjä tietoja
app.put('/users/:id', (request, response) => {
  //const id = request.params.id
  const { id } = request.params;
  // const name = request.query.name
  const { name } = request.query;
  const user = users.find((user) => user.id === id);
  if (user) {
    user.name = name;
    response.status(200).end();
  } else {
    response.status(204).end();
  }
});

// luodaan uusi käyttäjä generoidaan käyttäjälle id
// create a new user
app.post('/users', async (request, response) => {
  // Get name from request
  const { name } = request.body;

  // Create a new user
  const user = new User({
    name: name,
  });

  // Save to db and send back to caller
  const savedUser = await user.save();
  response.json(savedUser);
});

// poisto mongosopivaksi
app.delete('/users/:id', async (request, response) => {
  const deletedUser = await User.findByIdAndRemove(request.params.id);
  if (deletedUser) response.json(deletedUser);
  else response.status(404).end();
});

// start web-server and listen port 3000
app.listen(port, () => {
  console.log('Example app listening on port 3000');
});
