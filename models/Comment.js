const mongoose =require('mongoose')
const {Schema}=mongoose
const commentSchema=new Schema({
    comment:{
        type:String,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    blog_id:{

        type:Schema.Types.ObjectId,
        ref:'blog',
    }
 
  
}
)
module.exports=mongoose.model('comment',commentSchema)