const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongoURI = 'mongodb://localhost:27017';

const sampleSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Sample = mongoose.model('Sample', sampleSchema);

function connectToMongoDB() {

  mongoose.connect(mongoURI);

  const db = mongoose.connection;

  db.on('error', err => {
    console.error('MongoDB connection error:', err);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB successfully');
  });
}

connectToMongoDB();

app.get('/', async (req, res) => {

  const sampleDocument = new Sample({
    name: 'John Doe',
    age: 30
  });

  try {
    await sampleDocument.save();
    res.send('Document inserted into MongoDB successfully');
  } catch (error) {
    console.error('Error inserting document into MongoDB:', error);
    res.status(500).send('Error inserting document into MongoDB');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
