import mongoose from 'mongoose';

const monthSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  month: {
    type: String, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  budget: { 
    type: Number, 
    // required: true 
  },
  totalIncome: { // Remove this
    type: Number,
    default: 0
  },
  totalExpense: {
    type: Number,
    default: 0
  },
  netBalance: { // use math for this 
    type: Number,
    default: 0
  },
  savingTarget: {
    type: Number,
    required: true
  },
  currentSavings: { // ignore 
    type: Number,
    default: 0
  },
  savingsProgress: { //ignore
    type: Number,
    default: 0  // Percentage of savings target achieved
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Month = mongoose.model('Month', monthSchema);
export default Month;
