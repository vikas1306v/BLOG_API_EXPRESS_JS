const express=require('express');  
const conectToMongoDb=require('./db/conn.js')
const app=express();
conectToMongoDb();
//importing port from constant.js
const PORT=process.env.PORT || 3000;

app.use(express.json());

//writing middleware of auth
app.use('/api/auth',require('./controllers/auth.js'))
app.use('/api/category',require('./controllers/categoryroutes.js'))

app.use('/api/blog',require('./controllers/blogroutes.js'))
app.use('/api/comment',require('./controllers/commentRoutes.js'))

app.use(express.urlencoded({ extended: true }));

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
} ); 