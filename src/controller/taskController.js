import { validationResult } from "express-validator";

// filterTasks

// Create Task

export const createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, dueDate, priority, status, category } = req.body;

        const newTask = new Task({
        title,
        description,
        dueDate,
        priority,
        status,
        category,
        user: req.user._id
        });

        const savedTask = await newTask.save();

        res.status(201).json({ status: "success", data: savedTask });
    } catch (err) {
        res.status(400).json({ error: "Server error", details: err.message });
    }
};

// update task

export const updateTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        req.body,
        { new: true } // Return the updated task
        );

        if (!updatedTask) {
        return res.status(404).json({ status: "fail", data: "Task not found" });
        }

        res.json({ task: updatedTask });
    } catch (err) {
        res.status(400).json({ error: "Server error", details: err.message });
    }
};





export const filterTasks = async (req,res) => {
    try{
        const {category,priority,status} = req.query;

        const query ={
            user_id: req.user._id,
        }

    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (status) query.status = status;

    const tasks = await taskModel.find(query);

    res.status(200).json({count: tasks.length, tasks});

    }catch(err){
        res.status(500).json({message: "Error fetching tasks", error: err.message});
    }
}


// searchTasks

export const searchTasks = async (req,res) => {
    try{
        const {search} = req.query;
        if(!search){
            return res.status(400).json({message: "Search term is required"});
        }

        const tasks = await taskModel
        .find({
            user_id:req.user._id,
            $or:[
                { title:{$regex:search, $option:"i"}},
                { description:{$regex:search, $option:"i"}},
                { category:{$regex:search, $option:"i"}}
            ],
        })
        res.status(200).json({count: tasks.length, tasks});
    }catch(err){
        res.status(500).json({message: "Search failed", error: err.message});
    }
}