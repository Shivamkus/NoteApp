const router = require('express').Router();
const User = require('../models/user');
const List = require('../models/list');


// create Task
router.post('/addTask', async(req,res)=>{
    try {
       const {title, body, email} = req.body;
       const existingUser = await User.findOne({email});
       if(existingUser){
        const list = new List({title, body, user:existingUser});
        await list.save().then(() => res.status(200).json({list}));
        existingUser.list.push(list);
        existingUser.save();
       } 
    } catch (error) {
        console.log(error);
    }
});

// edit task
router.put('/updateTask/:id', async(req,res)=>{
    try {
       const {title, body, email} = req.body;
       const existingUser = await User.findOne({email});
       if(existingUser){
        const list = await List.findByIdAndUpdate(req.params.id, {title, body});
        list.save().then(() => res.status(200).json({message: "task updated" }));
       } 
    } catch (error) {
        console.log(error);
    }
});

// delete task
router.delete('/deleteTask/:id', async(req,res)=> {
    try {
       const { email} = req.body;
       const existingUser = await User.findOneAndUpdate({email}, {$pull:{list: req.params.id}});
       if(existingUser){
        await List.findByIdAndDelete(req.params.id).then(() => 
        res.status(200).json({message: "task deleted" })
        );
       } else{
        console.log("error on deleting");
       }
    } catch (error) {
        console.log(error);
    }
});

//get All task
router.get('/getTasks/:id', async (req, res) => {
    try {
      const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
      if (list.length !== 0) {
        res.status(200).json({ list: list });
      } else {
        res.status(200).json({ message: "No tasks added" });
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error occurred while fetching tasks:", error);
      // Handle the error and send an appropriate response
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;