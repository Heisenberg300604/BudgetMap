import express from 'express';
import Month from '../Models/month.model.js';

// Create a new month
 
export const createMonth = async (req, res) => {
    const { userId, month, year, budget, savingTarget } = req.body;
  
    try {
      const newMonth = new Month({
        userId,
        month,
        year,
        budget,
        savingTarget
      });
  
      const savedMonth = await newMonth.save();
      res.status(201).json(savedMonth);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create month', error });
    }
  }

