import React from 'react'
import PostComment from './PostComment'

function showComments(comments = []) {
    if (comments.length > 0) {
            return comments.map(comment => 
            <PostComment
                text={comment.text}
                votes={comment.votes}
                date={comment.date}
            />
        )
    }
    return 'No comments for this post';
}

function Post({ title,author,votes,timestamp,image,comments }) {
  return (
    <>
    <div>Post</div>
    <div>
        {title} {author} {votes} {timestamp} {image} 
        <button>Add comment</button>
        <button>Edit post</button>
        <button>Delete post</button>
        <button>toggle post comments</button>

        {showComments(comments)}
    </div>
    </>
    
  )
}

export default Post