import React from 'react'
import { DateTime } from 'luxon'
import { Grid } from '@mui/material'
import Post from './Post/Post'

const blankImageURL = 'img-placeholder.jpg'

function countVotes(likes = [], dislikes = []) {
    return likes.length - dislikes.length
}

function parseDate(dateMs = Date.now()) {
    dateMs = +dateMs
    return DateTime.fromMillis(dateMs).toFormat('yyyy LLL dd HH:mm')
}

function PostsList({ posts }) {
    if (!posts || posts.length === 0) return null
    const postsMapped = posts.map(post => {
        return (
            <Grid item key={post.id + 1}>
                <Post
                  key={post.id} 
                  title={post.title}
                  author={post.username}
                  votes={countVotes(post.likes, post.dislikes)}
                  timestamp={parseDate(post.date)}
                  image={post.imageSrc ? post.imageSrc : blankImageURL}
                  comments={post.comments}
                />
            </Grid>
        )
    })

    return posts.length > 0 ? 
        <Grid container spacing={{ xs: 2, md: 4,sm: 4 }} columns={{ xs: 4, sm: 8, md: 8 }}>
            {postsMapped}
        </Grid>
    
     : "No posts"
}

export default PostsList