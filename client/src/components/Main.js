import React from 'react'
import {  Grid, TextField, Pagination } from '@mui/material'
import Footer from './common/Footer'
import Header from './common/Header'
import PostsList from './Main/PostsList'
import * as LocalStorageManager from '../utils/localStorageManager'
import * as PostsRequest from '../api/postsRequest'
import NullElement from '../Null' // does redirect to previous page (login normally)

const gridSp = { xs: 6, md: 6, sm: 6 }

function Main() {
  // Check if credentials were typed in before going to main page
  const username = LocalStorageManager.read()

  // Fetch posts, count pages
  const [posts, setPosts] = React.useState([])
  const [pages, setPages] = React.useState(1)
  const [keyWord, setKeyWord] = React.useState('')

  const handleKeyword = (keyword) => {
    setKeyWord(keyword)
    if (keyword === '') return
    PostsRequest.getByQuery(keyword).then(res => setPosts(res.result)).catch(e => console.error(e))
  }

  React.useEffect(() => {
    PostsRequest.getByPage(pages).then(res => {
        setPosts(res.result)
        setPages(res.totalPages)
     }).catch(e => console.error(e))
  }, [pages])

  return (
    <>
        {username ? 
        <Grid container>
            <Header username={username} />
            <TextField
                  id="search-field"
                  fullWidth
                  label="Find a post..."
                  variant="outlined"
                  style={{marginBottom: '50px'}}
                  value={keyWord}
                  onChange={(e) => handleKeyword(e.target.value)} />
            <PostsList posts={posts} />
            <Grid container columns={gridSp} spacing={gridSp} style={{marginTop: '40px'}}>
                <Grid item>
                    <Pagination
                      count={pages}
                      variant="outlined"
                      color="primary"
                      onChange={(e) => setPages(parseInt(e.target.innerHTML))} />
                </Grid>
                <Grid item>
                     <Footer />
                </Grid>
            </Grid>  
        </Grid> 
        : <NullElement />}
    </>
  )
}

export default Main