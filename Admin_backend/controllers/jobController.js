import Job from '../models/Job.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public (or Private depending on needs)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate('client', 'name');
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};




// @desc    Create a job
// @route   POST /api/jobs
// @access  Private
export const createJob = async (req, res) => {
  const { title, client, category, experience, education, jobLocation, driveLocation, type, salary, description, howToApply, status } = req.body;

  const job = new Job({
    title,
    client,
    category,
    experience,
    education,
    jobLocation,
    driveLocation,
    type,
    salary,
    description,
    howToApply,
    status
  });

  const createdJob = await job.save();
  res.status(201).json(createdJob);
};


// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
export const updateJob = async (req, res) => {
  const { title, client, category, experience, education, jobLocation, driveLocation, type, salary, description, howToApply, status } = req.body;

  const job = await Job.findById(req.params.id);

  if (job) {
    job.title = title || job.title;
    job.client = client || job.client;
    job.category = category || job.category;
    job.experience = experience || job.experience;
    job.education = education || job.education;
    job.jobLocation = jobLocation || job.jobLocation;
    job.driveLocation = driveLocation || job.driveLocation;
    job.type = type || job.type;
    job.salary = salary || job.salary;
    job.description = description || job.description;
    job.howToApply = howToApply || job.howToApply;
    job.status = status || job.status;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
};


// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
export const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
};
