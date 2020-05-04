const express = require('express');
const cors = require('cors')

const server = express();
server.use(express.json());

server.use(cors());

let userId = 3;

let userList = [
    {
        id: 1,
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane"
    },
    {
        id: 2,
        name: "John Doe",
        bio: "The name's Doe, and there's nothing else to know."
    },
]

server.get("/", (req, res) => {
    res.status(200).json({api: "Up and running!"});
})

server.get("/api/users", (req, res) => {
    if(userList){
        res.status(200).json(userList);
    }
    else{
        res.status(500).json({errorMessage: "The users information could not be retrieved"});
    }
})

server.post("/api/users", (req, res)=>{
    if(!req.body.name || !req.body.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user"})
    }
    if(req.body.name && req.body.bio){
        userList.push(
            {
                id: userId,
                name: req.body.name,
                bio: req.body.bio
            }
        )
        userId++;
        res.status(201).json(req.body)
    }
    else{
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    }
})

server.get("/api/users/:id", (req, res)=>{
    const id = req.params.id;

    const user = userList[id-1]
    if(!user){
        res.status(404).json({errorMessage: "The user with the specified ID does not exist"});
    }
    else if(user){
        res.status(200).json(user)
    }
    else{
        res.status(500).json({errorMessage: "The user information could not be retrieved"})
    }
})

server.delete("/api/users/:id", (req, res)=>{
    const id = req.params.id;
    if(userList[id-1]){
        userList = userList.filter(user=> user.id != id)
        res.status(200).json(userList)
    }
    else if(!userList[id-1]){
        res.status(404).json({errorMessage: "The user with the specified ID does not exist"})
    }
    else{
        res.status(500).json({errorMessage: "The user could not be removed"})
    }
})

server.put("/api/users/:id", (req, res)=>{
    const id = req.params.id;

    const user = userList[id-1]
    if(!user){
        res.status(404).json({errorMessage: "The user with the specified ID does not exist"});
    }
    else if(user){
        if(!req.body.name || !req.body.bio){
            res.status(400).json({errorMessage: "Please provide name and bio for the user"})
        }
        else if(req.body.name && req.body.bio){
            userList[id-1].name = req.body.name;
            userList[id-1].bio = req.body.bio;
            res.status(200).json(userList)
        }
    }
    else{
        res.status(500).json({errorMessage: "The user information could not be retrieved"})
    }
})

server.patch("/api/users/:id", (req, res)=>{
    const id = req.params.id;

    const user = userList[id-1]
    if(!user){
        res.status(404).json({errorMessage: "The user with the specified ID does not exist"});
    }
    else if(user){
        if(!req.body.name && req.body.bio){
            userList[id-1].bio = req.body.bio
            res.status(200).json(userList);
        }
        else if(req.body.name && !req.body.bio){
            userList[id-1].name = req.body.name
            res.status(200).json(userList);
        }
        else if(req.body.name && req.body.bio){
            userList[id-1].name = req.body.name;
            userList[id-1].bio = req.body.bio;
            res.status(200).json(userList)
        }
        else{
            res.status(400).json({errorMessage: "Please provide an update to the user"})
        }
    }
    else{
        res.status(500).json({errorMessage: "The user information could not be retrieved"})
    }
})

server.listen(8000, () => console.log("\n===Server running on port 8000==="))