const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }
});
const User = mongoose.model('User', userSchema);
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const app = express();
// Function to add a new user to the MongoDB database with validation
async function addUserWithValidation(user) {
    // Create a new user instance
    const newUser = new User(user);
  
    try {
      // Attempt to save the user to the database
      await newUser.save();
      console.log('User added successfully!');
    } catch (err) {
      // If there's an error, log the error message
      console.error('Error saving user:', err.message);
    }
  }
  
  // Example usage
  
  addUserWithValidation({ username: 'sam', email: 'sam@gmail.com' });
  addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });
 
