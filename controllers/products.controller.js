const Product = require('../models/product.model');

exports.getAllProducts = async (req, res) => {
  try{
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandomProduct = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);
    const pro = await Product.findOne().skip(random);
  
    if(!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getProductById = async (req, res) => {
  try {
    const pro = await Product.findById(req.params.id);
    
    if(!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.addProduct = async (req, res) => {
  const { name, client } = req.body;
  
  try {
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.editProduct = async (req, res) => {
  const { name, client } = req.body;
  
  try {
    const pro = await Product.findById(req.params.id);
  
    if(pro) {
      await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }  
}

exports.deleteProduct = async (req, res) => {
  try {
    const pro = await Product.findById(req.params.id);
  
    if(pro) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}