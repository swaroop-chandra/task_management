const Task=require('../model/task')

module.exports.list=(req,res)=>{
    // console.log('hi')
    Task.find({user:req.user._id}).populate('label')
    .then(task=>{
        res.json(task)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const task=new Task(body)
    task.user=req.user.id
    task.save()
        .then(task=>{
            res.json(task)
        })
        .catch(err=>{
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id 
    Task.findOne({_id:id,user:req.user._id}).populate('label')
        .then((task) => {
            if(task) { 
                res.json(task)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id 
    const body = req.body 
    Task.findOneAndUpdate({_id:id,user:req.user._id}, body, { new: true, runValidators: true })
        .then((task) => {
            if(task) {
                res.json(task)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id 
    Task.findOneAndDelete({_id:id,user:req.user._id})
        .then((task) => {
            if(task) {
                res.json(task)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}