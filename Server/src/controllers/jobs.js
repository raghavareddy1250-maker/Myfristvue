const fs = require('fs').promises;
const path = require('path');

const jobs = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../jobs.json');

    const data = await fs.readFile(filePath, 'utf8');
    const results = JSON.parse(data);

    return res.status(200).json({
      success: true,
      jobs: results.jobs
    });
  } catch (err) {
    console.error('Get jobs error:', err);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching jobs',
    });
  }
};

module.exports = { jobs };


const getJobById = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../jobs.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const results = JSON.parse(fileData);
    const jobs = results.jobs;
    

  const job = jobs.find(
      item => String(item.id) === String(req.params.id)
    );



    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error('Get job error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching job'
    });
  }
};


const deleteJob = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../jobs.json');

    const fileData = await fs.readFile(filePath, 'utf8');
    const results = JSON.parse(fileData);
      const jobs = results.jobs;

    const jobIndex = jobs.findIndex(
      job => String(job.id) === req.params.id
    );

    if (jobIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    jobs.splice(jobIndex, 1);
results.jobs = jobs;
    await fs.writeFile(
      filePath,
      JSON.stringify(results, null, 2),
      'utf8'
    );

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while deleting job'
    });
  }
};

const addJob = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../jobs.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const results = JSON.parse(fileData);

     const jobs = results.jobs;

    const { title, company, location, description } = req.body;

    if (!title || !company || !location) {
      return res.status(400).json({
        success: false,
        message: 'Title, company, and location are required'
      });
    }

    const newJob = {
      id: jobs.length
        ? Math.max(...jobs.map(job => Number(job.id) || 0)) + 1
        : 1,
      title,
      company,
      location,
      description: description || ''
    };

    jobs.push(newJob);
    results.jobs = jobs;
    await fs.writeFile(
      filePath,
      JSON.stringify(results, null, 2),
      'utf8'
    );

    return res.status(201).json({
      success: true,
      message: 'Job added successfully',
      job: newJob
    });
  } catch (error) {
    console.error('Add job error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while adding job'
    });
  }
};




const updateJob = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../jobs.json');

    const fileData = await fs.readFile(filePath, 'utf8');
    
  const data = JSON.parse(fileData);
      const jobs = data.jobs;

    const jobIndex = jobs.findIndex(
      job => String(job.id) === req.params.id
    );

    if (jobIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    const existingJob = data.jobs[jobIndex];
    const { title, type, location, description, salary, company } = req.body;

    data.jobs[jobIndex] = {
      ...existingJob,
      ...(title !== undefined && { title }),
      ...(type !== undefined && { type }),
      ...(location !== undefined && { location }),
      ...(description !== undefined && { description }),
      ...(salary !== undefined && { salary }),
      ...(company !== undefined && {
        company: {
          ...existingJob.company,
          ...company
        }
      })
    };

    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      'utf8'
    );

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job: data.jobs[jobIndex]
    });
  } catch (error) {
    console.error('Update job error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while updating job'
    });
  }
};



module.exports = {
  jobs,
  getJobById,
  addJob,
  deleteJob,
  updateJob
};


