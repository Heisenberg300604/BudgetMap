import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name should be at least 3 characters'],
      maxlength: [50, 'Name should be less than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password should be at least 6 characters'],
      select: false, // Password should not be returned by default in queries
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const User = mongoose.model('User', userSchema);

export default User;
