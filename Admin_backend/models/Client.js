import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['IT', 'Non-IT', 'E-Commerce', 'Financial Services', 'Other'],
    default: 'Other'
  },
  image: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});


const Client = mongoose.model('Client', clientSchema);

export default Client;
