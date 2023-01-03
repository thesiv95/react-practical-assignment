import React from 'react'
import { CardContent, Collapse, Button }  from '@mui/material';
import { ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import * as CommentsRequest from '../../../api/commentsRequest' 

function PostComment({ postId = 1, text, date = Date.now(), expanded}) {

    let [likes, setLikes] = React.useState(0)
    let [dislikes, setDisLikes] = React.useState(0)
  
    const handleThumbUp = () => setLikes(likes += 1)
    const handleThumbDown = () => setDisLikes(dislikes -= 1)
    const handleEdit = async (postId) => {
        const newText = prompt(`New text for post ${postId}`, text)
        return CommentsRequest.update(postId, newText, likes, dislikes)
     }
     const handleDelete = async (postId) => {
        return CommentsRequest.remove(postId)
     }

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div style={{fontSize: '14px'}}>Date: {date} Votes: {likes - dislikes}</div>
          <div style={{fontSize: '16px'}}>{text}</div>
          <Button onClick={() => handleThumbUp}><ThumbUpIcon /></Button>
          <Button onClick={() => handleThumbDown}><ThumbDownIcon /></Button>
          <Button onClick={() => handleEdit(postId)}><EditIcon /></Button>
          <Button onClick={() => handleDelete(postId)}><DeleteIcon /></Button>
        </CardContent>
      </Collapse>
  )
}

export default PostComment