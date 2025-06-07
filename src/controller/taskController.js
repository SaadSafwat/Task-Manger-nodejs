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
        res.status(200).json({count: tasks.length, tasks})
    }catch(err){
        res.status(500).json({message: "Search failed", error: err.message});
    }
}