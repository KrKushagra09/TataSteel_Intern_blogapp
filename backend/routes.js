const express= require('express');
const router = express.Router();

const  mongoType = require('mongoose').Types;

const post = require('../backend/Models/post.js');
const { default: mongoose } = require('mongoose');
const connectDB = require('./db.js');
process.on('uncaughtException', function (err) {
    console.log(err);
  });
connectDB();
  
  
  // Call the async function

// routes defined here
//get all data from this API
router.get('/', async(req, res) => {
     await post.find((err,doc)=>
    {
        if(err)
        {
            console.log('error occured while fetching data'+err);
            res.status(404).send('Internal error',err);

        }
        {
            res.send(doc);
        }
    })

})
// create new Post
router.post('/create', (req, res) => {
    let Post = new post({
        title:req.body.title,
        content:req.body.content,
        username:req.body.username,
    })
    Post.save((err,doc)=> {
        if(err)
        {
            console.log('error occured internally');
            res.status(404).send('Internal Error'+err)
        }else{
            res.send(doc)
        }
})
})
 
//get data by ID
router.get('/:id',async(req,res)=>{
    if(mongoType.ObjectId.isValid(req.params.id)){
            post.findById(req.params.id , (err,doc)=>{
                if(err)
        {
            console.log('error occured internally');
            res.status(404).send('Internal Error'+err);
        }else{
            res.send(doc) ;
            }
    })
}else{
    res.status(400).send('No record Found by this Id:',id)
}
})
//delete data by ID
router.delete('/:id',(req,res)=>{
    if( mongoType.ObjectId.isValid(req.params.id)){
            post.findByIdAndRemove(req.params.id , (err,doc)=>{
                if(err)
        {
            console.log('error occured internally');
            res.status(404).send('Internal Error'+err);
        }else{
            res.send(doc) ;
            }
    })
}else{
    res.status(400).send('No record Found by this Id:',id)
}
})
//update data by ID
router.get('/:id',async(req,res)=>{
    let post = {
        title:req.body.title,
        content:req.body.content,
        username:req.body.username,
    }
    if(mongoType.ObjectId.isValid(req.params.id)){
            post.findByIdAndUpdate(req.params.id ,{$set:Post},{new:true} ,(err,doc)=>{
                if(err)
        {
            console.log('error occured internally');
            res.status(404).send('Internal Error'+err);
        }else{
            res.send(doc) ;
            }
    })
}else{
    res.status(400).send('No record Found by this Id:',id)
}
})
module.exports = router
