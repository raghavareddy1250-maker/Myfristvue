const fs = require('fs').promises;
const path = require('path');


const addTask = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../tasks.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const results = JSON.parse(fileData);

     const tasks = results.tasks;

    const { title, type } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title, company, and location are required'
      });
    }

    const newtask = {
      id: tasks.length
        ? Math.max(...tasks.map(task => Number(task.id) || 0)) + 1
        : 1,
      title,
      type
    };
console.log(newtask);
    tasks.push(newtask);
    results.tasks = tasks;
    await fs.writeFile(
      filePath,
      JSON.stringify(results, null, 2),
      'utf8'
    );

    return res.status(201).json({
      success: true,
      message: 'task added successfully',
      tasks: results.tasks
    });
  } catch (error) {
    console.error('Add task error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while adding task'
    });
  }
};

const tasks = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../tasks.json');

    const data = await fs.readFile(filePath, 'utf8');
    const results = JSON.parse(data);

    return res.status(200).json({
      success: true,
      tasks: results.tasks
    });
  } catch (err) {
    console.error('Get tasks error:', err);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks',
    });
  }
};


const updateTask = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../tasks.json');

    const fileData = await fs.readFile(filePath, 'utf8');
    
  const data = JSON.parse(fileData);
      const tasks = data.tasks;

    const taskIndex = tasks.findIndex(
      task => String(task.id) === req.params.id
    );

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'task not found'
      });
    }

    const existingtask = data.tasks[taskIndex];
    const { title, type } = req.body;

    data.tasks[taskIndex] = {
      ...existingtask,
      ...(title !== undefined && { title }),
      ...(type !== undefined && { type })
      
    };

    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      'utf8'
    );

    return res.status(200).json({
      success: true,
      message: 'task updated successfully',
      task: data.tasks[taskIndex]
    });
  } catch (error) {
    console.error('Update task error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while updating task'
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../tasks.json');

    const fileData = await fs.readFile(filePath, 'utf8');
    const results = JSON.parse(fileData);
      const tasks = results.tasks;

    const taskIndex = tasks.findIndex(
      task => String(task.id) === req.params.id
    );

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'task not found'
      });
    }

    tasks.splice(taskIndex, 1);
results.tasks = tasks;
    await fs.writeFile(
      filePath,
      JSON.stringify(results, null, 2),
      'utf8'
    );

    return res.status(200).json({
      success: true,
      message: 'task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while deleting task'
    });
  }
};



module.exports = {
  tasks,
  addTask,
  deleteTask,
  updateTask
};

