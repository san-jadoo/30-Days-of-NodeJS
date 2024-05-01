const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

async function createProduct(product) {
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    return newProduct;
  } catch (err) {
    throw new Error(`Error creating product: ${err}`);
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    throw new Error(`Error retrieving products: ${err}`);
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  } catch (err) {
    throw new Error(`Error updating product: ${err}`);
  }
}

async function deleteProduct(productId) {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  } catch (err) {
    throw new Error(`Error deleting product: ${err}`);
  }
}


const newProduct = { name: 'Laptop', price: 1000, quantity: 5 };
createProduct(newProduct)
  .then(product => console.log(`Created product: ${product}`))
  .catch(err => console.error(err));

getAllProducts()
  .then(products => console.log(products))
  .catch(err => console.error(err));

const updatedProduct = { price: 1200 };
updateProduct('productId', updatedProduct)
  .then(product => console.log(`Updated product: ${product}`))
  .catch(err => console.error(err));

// Delete a product
deleteProduct('productId')
  .then(product => console.log(`Deleted product: ${product}`))
  .catch(err => console.error(err));
