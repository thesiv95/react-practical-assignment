import React from 'react'
import { DateTime } from 'luxon'
import { Grid } from '@mui/material'
import Post from './Post/Post'
// import { getByPage } from '../redux/postsSlice'

const blankImageURL = 'img-placeholder.jpg'

function countVotes(likes = [], dislikes = []) {
    return likes.length - dislikes.length
}

function parseDate(dateMs = Date.now()) {
    dateMs = +dateMs
    return DateTime.fromMillis(dateMs).toFormat('yyyy LLL dd HH:mm')
}

function PostsList() {

    // const posts = useSelector((state) => state.posts.value)
    // const dispatch = useDispatch()
    // const postsList = dispatch(() => getByPage())
    // console.log(postsList);
    const posts = [
        {
            "id": 1,
            "title": "Tets 1",
            "username": "demo",
            "likes": [],
            "dislikes": [],
            "date": "1672661953277",
            "comments": []
        },
        {
            "id": 2,
            "title": "Tets 2",
            "username": "demo1",
            "likes": [],
            "dislikes": [],
            "date": "1672662288786",
            "comments": []
        },
        {
            "id": 3,
            "title": "Tets 2",
            "username": "demo1",
            "likes": [],
            "dislikes": [],
            "date": "1672662288786",
            "comments": []
        },
        {
            "id": 4,
            "title": "Tets 2",
            "username": "demo1",
            "likes": [],
            "dislikes": [],
            "date": "1672662288786",
            "comments": []
        }
    ]

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