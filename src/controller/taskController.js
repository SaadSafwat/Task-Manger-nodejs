// filterTasks

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