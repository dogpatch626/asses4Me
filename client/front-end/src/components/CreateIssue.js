import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import "./styles/create.css";
import axios from "axios";
function CreateIssue() {
  const [_id, setId] = useState(localStorage.getItem("_id"));
  const [description, setDescription] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const handleSubmit = async (event) => {

    const newIssue={title:title, description:description, upvote:0, downvote:0, userID:_id}
    
    const issue = await axios.post("http://localhost:4000/issue", newIssue).catch((err)=>{
        return false;    })

        if(issue){
            alert("Post Created")
        }else{
            alert("error try again ")
        }

        


  };
  return (
    <div className="home2-wrapper">
      <center>
          <h2>Time to create a new issue {user} </h2>
        <form onSubmit={handleSubmit} className="createForm">
          <h3>Create Issue</h3>
          <center>
          <label>
            Title
            <input
              type="textarea"
              className="textArea"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              required
            ></input>
          </label>
          <label> Description
            <input
              style={{ height: "100px", width: "200px" }}
              type="textarea"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></input>
          </label>
          </center>
          <hr />
          <input type="submit" value="Submit" />
        </form>
      </center>
    </div>
  );
}

export default CreateIssue;
