const express = require("express");
require("dotenv").config();
let router = express.Router();
const uuid = require("uuidv4");
const bcrypt = require("bcrypt");
const resolver = require("../resolvers/resolver");
const jwt = require("jsonwebtoken");

router.use(express.json());

// user routes
router
  .route("/user")
  .get(async (req, res) => {
    const users = await resolver.Query.users();
    res.send(users);
  })
  .post(async (req, res) => {
    const _id = uuid.uuid();
    
    const pass = req.body.password;
    const username = req.body.username;
    const admin = req.body.admin;
    const doesExist = await resolver.Query.userByName("_",{username })
    
    if(doesExist.length === 0 ){
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pass, salt, (err, hash) => {
          let password = hash;
          resolver.Mutation.createUser("_", { username, password, admin, _id })
            .then(res.status(200).send("user created"))
            .catch((err) => {
              res.status(400).send(err);
            });
        });
      });
    }else{
      
      res.status(400).send("User exists")
    }
   
  
  });

router
  .route("/user/:id")
  .get(async (req, res) => {
    
    const _id = req.params.id;
    const user = await resolver.Query.userByID("_", { _id });
    res.status(200).send(user);
  })
  .delete(async (req, res) => {
    const _id = req.params.id;
    const deleted = await resolver.Mutation.deleteUser("_", { _id });
    if (deleted) {
      res.status(200).send("User Deleted");
    } else {
      res.status(400).send("User Not deleted");
    }
  });

//issue routes
function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    
    
    next();
  });
}
router
  .route("/issue")
  .get(authToken,async (req, res) => {
    const issue = await resolver.Query.issues();
    res.send(issue);
  })
  .post( async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const upvote = req.body.upvote;
    const downvote = req.body.downvote;
    const userID = req.body.userID;
    resolver.Mutation.createIssue("_", {
      title,
      description,
      upvote,
      downvote,
      userID,
    })
      .then(res.status(200).send("Post Created"))
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router
  .route("/issue/:id")
  .get(async (req, res) => {
    //getting by user id
    const _id = req.params.id;
    const issues = await resolver.Query.issueById("_", { _id });
    res.status(200).send(issues);
  })
  .delete(async (req, res) => {
    const _id = req.params.id;
    const deletedIssue = resolver.Mutation.deleteIssue("_", { _id });
    if (deletedIssue) {
      res.status(200).send("Issue Deleted");
    } else {
      res.status(400).send("Error deleted, potentially not found");
    }
  })
  .put(async (req, res) => {
    const comment = req.body.comment;
    const _id = req.params.id;
    const commentUpdate = await resolver.Mutation.commentIssue("_", {
      _id,
      comment,
    });
    if (commentUpdate) {
      res.status(200).send("Comment added");
    } else {
      res.status(400).send("comment could not be added");
    }
  });

//login
router
  .route("/login")
  .post(async (req,res)=>{
    const username = req.body.username;
    const user = { name: username, password:req.body.password };
    const hashPass = await resolver.Query.userByName("_",{username})
    if(hashPass.length === 0){
      res.status(404).send("user not found")
    }else{
      
      const _id = hashPass[0]._id
      const match = await bcrypt.compare(req.body.password, hashPass[0].password)
      if(match){
        const access = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({access, username,_id})
      }else{
        res.status(400).send(false)
      }
    }
    
  })
router
  .route("/vote")
  .put(async (req,res)=>{
    const vote = req.body.vote;
    const _id = req.body.id;  
    const userID = req.body.user; 
    const voted = await resolver.Mutation.upvote("_",{_id, vote, userID })
    
    if(!voted){
      res.status(400).send(false)
    }else{
      res.status(200).send(true)
    }
   
  })



  
module.exports = router;
