
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

//add db
const connectDB = require('./config/db');


dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
connectDB();

//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.MONGODB_URI)

    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


