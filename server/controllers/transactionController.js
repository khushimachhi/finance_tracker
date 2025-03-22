const Transaction = require('../models/transaction');

// Add Transaction
exports.addTransaction = async (req, res) => {
    try {
        const { amount, type, category, description, date } = req.body;

        const transaction = new Transaction({
            user: req.user.id,
            amount,
            type,
            category,
            description,
            date
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Transactions
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
