const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts={};
app.get('/posts',(req,res)=>{
    res.send(posts)
}); 

app.post('/events',(req,res)=>{
    const {types,data} = req.body;
    // console.log(types,data);
    if(types==="Postcreate"){
        const {id,title} = data;
        posts[id]={id,title,comments:[]};
    }

    if(types==="Createcomment"){
        const {id,content,postId}=data;
        
        const post=posts[postId];
        // console.log(post);
        post.comments.push({id,content});
    }
    console.log(posts);
    res.send({});
});

app.listen(4002,()=>{
    console.log("Listing query on 4002");
})