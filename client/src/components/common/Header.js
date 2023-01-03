import React from "react"
import { Link } from "react-router-dom"
import { Button, Grid } from "@mui/material"
import * as LocalStorageManager from "../../utils/localStorageManager"

function Header({ username = "Guest", isLogin = false }) {
  return isLogin ? null : (
    <Grid container columns={{ md: 12 }} spacing={{ md: 6 }}>
      <Grid item columns={{ md: 8 }}>
        <div>
          Username: <strong>{username}</strong>
        </div>
      </Grid>
      <Grid item columns={{ md: 4 }} alignItems='end' style={{textAlign: 'center'}}>
        <Link to="/" onClick={() => LocalStorageManager.clear()} style={{textDecoration: 'none'}}>
          <Button style={{fontSize: '75%'}}>Log out</Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Header
