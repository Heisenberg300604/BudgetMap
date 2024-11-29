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
    required: true 
  },
  savingTarget: { 
    type: Number, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Month = mongoose.model('Month', monthSchema);
export default Month;
