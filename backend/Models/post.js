const mongoose= require('mongoose');



const post = mongoose.model('post',{
    title:{type:String},
    Content:{type:String},
    username:{type:String},
})

module.exports = post