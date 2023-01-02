import React from 'react'

function PostComment({ text, votes, date}) {
  return (
    <>
    <div>{text} {votes} {date}</div>
    <button>Like</button>
    <button>DisLike</button>
    <button>Edit</button>
    <button>Remove</button>
    </>
  )
}

export default PostComment