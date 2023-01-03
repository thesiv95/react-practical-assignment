import {useEffect} from 'react'
import {Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import './App.css'
import doAPIRequest from './utils/doAPIRequest'
import Main from './components/Main'
import Login from './components/Login'
import NullElement from './Null' // empty page


function App() {

  useEffect(() => {
    // TEST API, it might be removed
    doAPIRequest('/live').then(res => console.log(res)).catch(e => console.error(e))
  }, [])

  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="posts" element={<Main />} />
          <Route path="*" element={<NullElement />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
