const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/Database1', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

const productSchema = new mongoose.Schema({
  name: { type: String},
  description: { type: String},
  price: { type: Number },
});

const Product = mongoose.model('Products', productSchema);

function createProductNameIndex() {
    Product.collection.createIndex({ "name": 1 }, (err) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index on 'name' field created successfully");
      }
    });
  }

app.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });
  product.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/products', (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  Product.findByIdAndUpdate(id, { name, description, price }, { new: true })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await createProductNameIndex();
});