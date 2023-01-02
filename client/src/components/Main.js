import React from 'react'
import {  Grid, TextField, Pagination } from '@mui/material'
import Footer from './common/Footer'
import Header from './common/Header'
import PostsList from './Main/PostsList'
import * as LocalStorageManager from '../utils/localStorageManager'
import doAPIRequest from '../utils/doAPIRequest'
import NullElement from '../Null' // does redirect to previous page (login normally)

const gridSp = { xs: 6, md: 6, sm: 6 }

function Main() {
  // Check if credentials were typed in before going to main page
  const username = LocalStorageManager.read()

  // Fetch posts, count pages
  const [posts, setPosts] = React.useState([]) 
  const [pages, setPages] = React.useState(1) 

  React.useEffect(() => {
     doAPIRequest('/post/page/' + pages).then(res => {
        setPosts(res.result)
        setPages(res.totalPages)
     }).catch(e => console.error(e));
  }, [pages]);

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
                  onChange={(e) => console.log(e.target.value)} />
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