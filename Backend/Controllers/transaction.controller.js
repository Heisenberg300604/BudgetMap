import express from 'express';
import Transaction from '../Models/transaction.model.js';

// Create a new transaction

export const createTransaction = async (req, res) => {
    const { userId, monthId, amount, type, category, description,date, time } = req.body;

    try {
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
        res.status(201).json(savedTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create transaction', error });
    }
}
