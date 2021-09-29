import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import axios from "axios";
import "./styles/posts.css";
class PostTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
      upvote: props.upvote,
      downvote: props.downvote,
      userId: props.userId,
      newComment: "",
      comments: props.comments,
      _id: props.id,

      extUserID: localStorage.getItem("_id"),
    };
  }

  render() {
    const handleSubmit = async (event) => {
      const comment = { comment: this.state.newComment, id: this.state._id };
      const commentReq = axios
        .put(`http://localhost:4000/issue/${this.state._id}`, comment)
        .catch((err) => {
          return false;
        });
      if (commentReq) {
        alert("comment made");
      } else {
        alert("comment failed");
      }
    };
    return (
      <div id="contentArea">
        <div>
          <table>
            <tr>
              <th>title </th>
              <th>Description </th>
              <th>upvote </th>
              <th>downvote </th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td>{this.state.title}</td>

              <td style={{ width: "200px" }}>{this.state.description}</td>
              <td>
                <button
                  className="needHover"
                  onClick={() => {
                    const voted = {
                      vote: 1,
                      id: this.state._id,
                      user: this.state.extUserID,
                    };
                    axios
                      .put(`http://localhost:4000/vote`, voted)
                      .catch((err) => {
                        alert("you cant vote again silly");
                      });
                   
                  }}
                >
                  {this.state.upvote}
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    const voted = {
                      vote: 0,
                      id: this.state._id,
                      user: this.state.extUserID,
                    };
                    axios
                      .put(`http://localhost:4000/vote`, voted)
                      .catch((err) => {
                        alert("you cant vote again silly");
                      });
                  
                  }}
                >
                  {this.state.downvote}
                </button>
              </td>

              <td>
                {this.state.userId === localStorage.getItem("_id") ? (
                  <button
                    onClick={() => {
                      axios
                        .delete(
                          `http://localhost:4000/todo/single/${this.state.id}`
                        )
                        .then((res) => {
                          console.log("success");
                          window.location.reload(true);
                        });
                    }}
                  >
                    delete
                  </button>
                ) : (
                  <span></span>
                )}
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <th>Comments </th>
            </tr>
            <tr>
              <td>
                {this.state.comments.map((comment) => {
                  return <p>{comment}</p>;
                })}
              </td>
            </tr>
          </table>

          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              marginTop: "200px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <input
                style={{
                  height: "100px",
                  width: "200px",
                  marginBottom: "50px",
                }}
                type="textarea"
                onChange={(event) => {
                  this.setState({ newComment: event.target.value });
                }}
              ></input>

              <center>
                <input
                  style={{ display: "block" }}
                  type="submit"
                  value="Submit"
                ></input>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PostTable);
