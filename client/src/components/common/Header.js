import React from 'react'

function Header({ username='Guest', isLogin = false }) {
  return (
    isLogin ? null : <div>User: {username}</div>
  )
}

export default Header