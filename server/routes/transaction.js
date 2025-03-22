const express = require('express');
const Transaction = require('../models/transaction');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Create a transaction 
router.post('/', protect, async (req, res) => {
    try {
        const { type, category, amount } = req.body;
        const newTransaction = new Transaction({
            userId: req.user.id, 
            type,
            category,
            amount,
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all transactions for logged-in user 
router.get('/', protect, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a transaction 
router.delete('/:id', protect, async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findById(req.params.id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Ensure user owns the transaction
        if (deletedTransaction.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await deletedTransaction.deleteOne();
        res.json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;