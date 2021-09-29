import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import PostTable from './PostTable';
import { IdContext } from './UserContext';
function Account(props) {
    const {user,setUser} = useContext(UserContext)
    const {_id,setId} =useContext( IdContext)
    const [posts, getPosts] =useState([])

    useEffect(()=>{
        getAllPosts(); 
    }, []);
     const getAllPosts = async ()=>{
        const allPosts = await axios.get(`http://localhost:4000/issue/${localStorage.getItem('_id')}`)
    
        getPosts(allPosts.data)
     }

    return (
        <div>
            <h1>Account page, Welcome : {user}</h1>

            {posts.length ===0?<h1>No posts yet <span>😢</span></h1>:posts.map((posts)=>{return <PostTable comments={posts.comments} title={posts.title} description={posts.description} upvote={posts.upvote} downvote={posts.downvote}  userId={posts.userID}/>})}
            
        </div>
    );
}

export default Account;