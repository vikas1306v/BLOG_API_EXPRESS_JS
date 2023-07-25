const mongoose =require('mongoose')
const {Schema}=mongoose
const blogSchema=new Schema({
    blog_title:{
        type:String,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    category_id:{
        type:Schema.Types.ObjectId,
        ref:'category',
    }
  
}
)
module.exports=mongoose.model('blog',blogSchema)