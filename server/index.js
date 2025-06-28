const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user');
const app = express();
const transactionRoutes = require('./routes/transaction');

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;

// Log the MongoDB URI for debugging
// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log("Database connected");
// Define routes (you'll create these later)
// app.use('/api/users', require('./routes/users'));
// app.use('/api/transactions', require('./routes/transactions'));
