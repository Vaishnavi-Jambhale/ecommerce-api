
const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const product = new Product({ ...req.body, user: req.user.id });
    await product.save();
    res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
    const products = await Product.find().populate('user', 'username');
    res.json(products);
};

exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('user', 'username');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
};

exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
};

exports.deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
};
