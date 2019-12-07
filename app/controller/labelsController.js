const Label=require('../model/label')

module.exports.list=(req,res)=>{
    // console.log('hi')
    Label.find({user:req.user._id})
    .then(label=>{
        res.json(label)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const label=new Label(body)
    label.user=req.user._id
    label.save()
        .then(label=>{
            res.json(label)
        })
        .catch(err=>{
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id 
    Label.findOne({_id:id,user:req.user._id})
        .then((label) => {
            if(label) { 
                res.json(label)
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
    Label.findOneAndUpdate({_id:id,user:req.user._id}, body, { new: true, runValidators: true })
        .then((label) => {
            if(label) {
                res.json(label)
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
    Label.findOneAndDelete({_id:id,user:req.user._id})
        .then((label) => {
            if(label) {
                res.json(label)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.insert_all=(req,res)=>{
    const body=req.body
    let labels=[]
    body.map(bod=>{
        labels.push(Object.assign(bod,{user:req.user._id}))
    })
    Label.insertMany(labels)
        .then(labels=>{
            res.json(labels)
        })
        .catch(err=>{
            res.json(err)
        })
}