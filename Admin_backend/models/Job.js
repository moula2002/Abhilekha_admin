import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },

  category: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  driveLocation: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Remote'],
    default: 'Full-time',
  },
  salary: {
    type: String,
  },
  description: {
    type: String,
  },
  howToApply: {
    type: String,
    default: 'Click the Apply button below to submit your application through our online form.',
  },
  status: {
    type: String,
    enum: ['Open', 'Draft', 'Closed'],
    default: 'Open',
  },
  applicants: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
