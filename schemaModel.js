const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    
    await newUser.save();
    
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

addUserToDatabase({ username: 'Sam', email: 'sam@gmail.com' });
