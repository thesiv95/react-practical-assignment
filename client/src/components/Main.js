import React from 'react'
import { useDispatch } from 'react-redux'
import {  TextField, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import Footer from './common/Footer'
import Header from './common/Header'
import PostsList from './Main/PostsList'
import { getByPage } from '../redux/postsSlice'
import * as LocalStorageManager from '../utils/localStorageManager'
import NullElement from '../Null'

function Main() {
  // Check if credentials were typed in before going to main page
  const username = LocalStorageManager.read()

  const dispatch = useDispatch()
  return (
    <>
        {username ? 
        <>
            <Header username={username} />
            <Link to="/" onClick={() => LocalStorageManager.clear()}>Logout</Link><div>Main</div><TextField
                  id="search-field"
                  label="Find a post..."
                  variant="outlined"
                  onChange={(e) => console.log(e.target.value)} /><PostsList pageNumber={1} /><Pagination
                      count={10}
                      variant="outlined"
                      color="primary"
                      onChange={(e) => dispatch(() => getByPage(parseInt(e.target.innerHTML)))} /><Footer /></> 
        : <NullElement />}
    </>
  )
}

export default Main