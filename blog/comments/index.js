const express = require('express');
const {randomBytes} = require("crypto");
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId={};

app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments',async (req,res)=>{
    const commentId=randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id:commentId , content,status:"pending"});

    commentsByPostId[req.params.id]=comments;

    await axios.post('http://localhost:4005/events',{
        types:"Createcomment",
        data:{
            id:commentId,
            content,
            postId:req.params.id,
            status:"pending",
        }
    });

    res.send(commentsByPostId[req.params.id]);
})

app.post('/events',(req,res)=>{
    console.log("Received event "+req.body.types);
})

app.listen(4001,()=>{
    console.log("Listing comments on 4001");
})