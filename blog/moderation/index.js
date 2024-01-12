const  express  = require( "express");
const bodyParser = require( "body-parser");
const axios = require( "axios");



const app=express();
app.use(bodyParser.json);

app.post("/events",async (req,res)=>{
    const {types,data} = req.body;

    if(types === "Createcomment"){
        const status = data.content.include("orange") ? "rejected" : "approved" ;

        await axios.post("http://localhost:4005/events",{
            id:data.id,
            postId:data.postId,
            status,
            content:data.content
        })
    }
})

app.listen(4003,()=>{
    console.log("Listing moderation on 4003");
})
