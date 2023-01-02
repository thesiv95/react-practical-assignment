import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'


function PostsList() {

    const posts = useSelector((state) => state.posts.value)
    console.log(posts);

    return <div>
        {posts.length > 0 ? posts.map(
            post => <Post
                key={post.id} 
                title={post.title}
                author={post.username}
                votes={122}
                timestamp={post.date}
                image={post.imageSrc}
                comments={post.comments}
            />
        ) : "No posts!"}
    </div>
  
}

export default PostsList