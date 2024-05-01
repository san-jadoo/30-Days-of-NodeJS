const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Category = mongoose.model('Category', categorySchema);

const Product = mongoose.model('Product', productSchema);

mongoose.connect('mongodb://localhost:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate('Category');
    return products;
  } catch (error) {
    console.error('Error retrieving products with populated category:', error);
    throw error;
  }
}

async function test() {
  try {
    const productsWithCategory = await getProductsPopulatedWithCategory();
    console.log(productsWithCategory);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
