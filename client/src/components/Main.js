import React from 'react'
import {  Grid, TextField, Pagination } from '@mui/material'
import Footer from './common/Footer'
import Header from './common/Header'
import PostsList from './Main/PostsList'
import * as LocalStorageManager from '../utils/localStorageManager'
import NullElement from '../Null'

const gridSp = { xs: 6, md: 6, sm: 6 }

function Main() {
  // Check if credentials were typed in before going to main page
  const username = LocalStorageManager.read()

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
            <PostsList/>
            <Grid container columns={gridSp} spacing={gridSp} style={{marginTop: '40px'}}>
                <Grid item>
                    <Pagination
                      count={10}
                      variant="outlined"
                      color="primary"
                      onChange={(e) => console.log(parseInt(e.target.innerHTML))} />
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