import React from 'react'
import getCopyrightYear from '../../utils/getCopyrightYear'

function Footer() {
  const year = getCopyrightYear();
  return (
    <div>Footer &copy; {year}</div>
  )
}

export default Footer