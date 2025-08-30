import Box from '@mui/material/Box'
import React from 'react'

function Loader() {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'80vh'}>
      <img src='./Clouds.gif' width={300} height={300} alt="loader" />
    </Box>
  )
}

export default Loader