import React from 'react'
import { Grid } from "@mui/material"
import getCopyrightYear from '../../utils/getCopyrightYear'

function Footer() {
  const year = getCopyrightYear();
  return (
    <Grid container columns={{ md: 12 }}>
        <div>&copy; {year}</div>
    </Grid>
  )
}

export default Footer