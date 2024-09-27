const Project = require("../models/Project")
const Task = require("../models/Task")

exports.volunteerDashboard = async (_req, res, user) => {
  try {
    const userId = user.id
    console.log({ userId });

    // Volunteer projects

    const projects = await Project.find({ volunteers: userId });

    // Fetch tasks assigned to the volunteer
    const tasks = await Task.find({ volunteer: userId }).populate('project', 'title');
    // Calculate total hours worked and number of completed tasks
    const completedTasks = tasks.filter(task => task.status === 'completed');
    const totalHoursWorked = tasks.reduce((acc, task) => acc + task.estimatedHours, 0);

    console.log({
      projects,
      tasks,
      totalHoursWorked,
      completedTasksCount: completedTasks.length,
    });

    res.json({
      projects,
      tasks,
      totalHoursWorked,
      completedTasksCount: completedTasks.length,
    })
  } catch (error) {
    console.error(error);
    throw new Error("Server Error");

  }
}