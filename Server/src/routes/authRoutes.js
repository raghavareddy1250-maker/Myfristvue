const express = require('express');

const { jobs,updateJob, getJobById,deleteJob,addJob} = require('../controllers/jobs');


const router = express.Router();

router.get('/jobs', jobs);
router.get('/jobs/:id', getJobById);
router.delete('/jobs/:id', deleteJob);
router.post('/jobs', addJob);
router.put('/jobs/:id', updateJob);


module.exports = router;
