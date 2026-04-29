import express from 'express';
import { getJobs, createJob, updateJob, deleteJob } from '../controllers/jobController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getJobs) // Publicly accessible to show on website
  .post(protect, createJob);

router.route('/:id')
  .put(protect, updateJob)
  .delete(protect, deleteJob);

export default router;
