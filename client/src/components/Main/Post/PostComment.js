import React from 'react'
import { CardContent, Collapse }  from '@mui/material';

function PostComment({ text, votes = 0, date = Date.now(), expanded}) {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {date}
          {text}
          {votes}
        </CardContent>
      </Collapse>
  )
}

export default PostComment