import express from 'express';
import Month from '../Models/month.model.js';
import jwt from 'jsonwebtoken';

// Create a new month
 
export const createMonth = async (req, res) => {
    const { userId, month, year, totalIncome, savingTarget } = req.body;
  
    try {
      const newMonth = new Month({
        userId,
        month,
        year,
        totalIncome,
        savingTarget
      });
  
      const savedMonth = await newMonth.save();
      res.status(201).json(savedMonth);
    } catch (error) {
      console.error('Error details:', error);  
      res.status(500).json({ message: 'Failed to create month', error: error.message });
    }
  }

// get detail of all months based on the userId
export const getMonths = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token and extract payload
        const userId = decoded._id; // Extract userId from JWT payload

        // Fetch all months for the specific userId
        const months = await Month.find({ userId }).sort({ year: -1, month: -1 }); // Sort by year and month descending

        if (!months.length) {
            return res.status(404).json({ message: 'No months found for this user' });
        }

        res.status(200).json(months);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch months', error });
    }
};


// Get Detail for particular month 
export const getMonthDetails = async (req, res) => {
  const { monthId } = req.query; // Extract monthId from query parameters

  try {
      // Check if monthId is provided
      if (!monthId) {
          return res.status(400).json({ message: 'MonthId is required' });
      }

      // Trim any whitespace or newlines in the monthId
      const trimmedMonthId = monthId.trim();
      console.log("Querying for monthId:", trimmedMonthId);

      // Fetch the month details by ID
      const month = await Month.findById(trimmedMonthId);

      // Check if the month record exists
      if (!month) {
          return res.status(404).json({ message: 'Month not found' });
      }

      // Return the month details
      res.status(200).json({
          _id: month._id,
          userId: month.userId,
          month: month.month,
          year: month.year,
          budget: month.budget,
          savingTarget: month.savingTarget,
          createdAt: month.createdAt,
          currentSavings: month.currentSavings,
          netBalance: month.netBalance,
          savingsProgress: month.savingsProgress,
          totalExpense: month.totalExpense,
          totalIncome: month.totalIncome,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch month details', error: error.message });
  }
};

export const getMonthSummary = async (req, res) => {
  const { monthId } = req.params;
  
  try {
      const month = await Month.findById(monthId);
      if (!month) {
          return res.status(404).json({ message: 'Month not found' });
      }
      
      // Calculate remaining amount needed to reach savings target
      const remainingToSave = Math.max(0, month.savingTarget - month.currentSavings);
      
      res.status(200).json({
          totalIncome: month.totalIncome,
          totalExpense: month.totalExpense,
          netBalance: month.netBalance,
          savingTarget: month.savingTarget,
          currentSavings: month.currentSavings,
          savingsProgress: month.savingsProgress,
          remainingToSave: remainingToSave,
          isTargetAchieved: month.currentSavings >= month.savingTarget
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch month summary', error });
  }
};

// Add endpoint to update saving target
// export const updateSavingTarget = async (req, res) => {
//     const { monthId } = req.params;
//     const { savingTarget } = req.body;
    
//     try {
//         const month = await Month.findById(monthId);
//         if (!month) {
//             return res.status(404).json({ message: 'Month not found' });
//         }
        
//         month.savingTarget = savingTarget;
//         // Recalculate savings progress with new target
//         if (savingTarget > 0) {
//             month.savingsProgress = (month.currentSavings / savingTarget) * 100;
//         }
        
//         await month.save();
        
//         res.status(200).json({
//             savingTarget: month.savingTarget,
//             currentSavings: month.currentSavings,
//             savingsProgress: month.savingsProgress
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to update saving target', error });
//     }
// };