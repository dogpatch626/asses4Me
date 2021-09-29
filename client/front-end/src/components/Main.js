import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import PostTable from './PostTable';
import { IdContext } from './UserContext';
function Main(props) {
    const {user,setUser} = useContext(UserContext)
    const {_id,setId} =useContext( IdContext)
    const [posts, getPosts] =useState([])

    useEffect(()=>{
        getAllPosts(); 
    }, []);
     const getAllPosts = async ()=>{
        axios.defaults.headers.common['Authorization'] = 
        'Bearer ' + localStorage.getItem('jwt');
        const allPosts = await axios.get('http://localhost:4000/issue')
    
        getPosts(allPosts.data)
     }

    return (
        <div>
            {posts.sort((a, b) => a.upvote > b.upvote ? -1 : 1).map((posts)=>{return <PostTable comments={posts.comments} title={posts.title} description={posts.description} upvote={posts.upvote} downvote={posts.downvote}  userId={posts.userID} id={posts._id}/>})}
            
        </div>
    );
}

export default Main;