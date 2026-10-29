const express = require('express');
const {jobs,
    updateJob,getJobById,deleteJob,addJob} = require('../controllers/jobs');

    const {tasks,updateTask,deleteTask,addTask} = require('../controllers/tasks');
const router = express.Router();

router.get('/jobs',jobs);
router.get('/jobs/:id',getJobById);
router.delete('/jobs/:id',deleteJob);
router.post('/jobs',addJob);
router.put('/jobs/:id',updateJob);

router.get('/tasks',tasks);
router.delete('/tasks/:id',deleteTask);
router.post('/tasks',addTask);
router.put('/tasks/:id',updateTask);

module.exports = router;
