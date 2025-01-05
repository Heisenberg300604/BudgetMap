import Transaction from '../Models/transaction.model.js';
import jwt from 'jsonwebtoken';
import Month from '../Models/month.model.js';

// Create a new transaction
export const createTransaction = async (req, res) => {
    const { userId, monthId, amount, type, category, description, date, time } = req.body;

    try {
        // Create the new transaction
        const newTransaction = new Transaction({
            userId,
            monthId,
            amount,
            type,
            category,
            description,
            date,
            time,
        });

        const savedTransaction = await newTransaction.save();

        // Update the month totals
        const month = await Month.findById(monthId);
        if (!month) {
            return res.status(404).json({ message: 'Month not found' });
        }

        // Update totals based on transaction type
        if (type.toLowerCase() === 'income') {
            month.totalIncome += amount;
        } else if (type.toLowerCase() === 'expense') {
            month.totalExpense += amount;
        }

        // Calculate net balance
        month.netBalance = month.totalIncome - month.totalExpense;

        // Calculate savings progress
        if (month.savingTarget > 0) {
            month.currentSavings = Math.max(0, month.netBalance); // Can't save negative amount
            month.savingsProgress = (month.currentSavings / month.savingTarget) * 100;
        }

        await month.save();

        res.status(201).json({
            transaction: savedTransaction,
            monthSummary: {
                totalIncome: month.totalIncome,
                totalExpense: month.totalExpense,
                netBalance: month.netBalance,
                savingTarget: month.savingTarget,
                currentSavings: month.currentSavings,
                savingsProgress: month.savingsProgress,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create transaction', error: error.message });
    }
};

export const getAllTransactions = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    const { monthId } = req.query; // Extract monthId from query parameters

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token and extract payload
        const userId = decoded._id; // Extract userId from JWT payload

        // Check if monthId is provided and filter by monthId as well
        const filter = { userId };
        if (monthId) {
            filter.monthId = monthId.trim(); // Trim any whitespace from monthId if provided
        }

        // Fetch all transactions for the user (and month if provided)
        const transactions = await Transaction.find(filter).sort({ date: -1 }); // Sort by date in descending order

        if (!transactions.length) {
            return res.status(404).json({ message: 'No transactions found' });
        }

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Invalid or expired token', error });
    }
};
