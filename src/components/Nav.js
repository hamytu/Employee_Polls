import { connect } from 'react-redux'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import PolicyIcon from '@mui/icons-material/Policy'
import Menu from '@mui/material/Menu'
import { Link } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import { Navigate } from 'react-router'
import React, { useState } from 'react'
import { handleLogout } from '../actions/authedUser'

const Nav = ({ user, dispatch }) => {
  const [anchorElUser, setAnchorElUser] = useState('')
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }
  const doHandleLogout = (e) => {
    dispatch(handleLogout(user.id)).then(() => {
      <Navigate to="/login" />
    })
  }
  return (<><LoadingBar scope='logout' />
    <Toolbar disableGutters>
      <PolicyIcon />
      <Typography
        variant='h6'
        noWrap
        component={Link}
        to='/'
        sx={{
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'black',
          textDecoration: 'none',
        }}
      >
        EPolls
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Button component={Link} key='Home' sx={{ color: 'black' }} to='/'>
          Home
        </Button>
        <Button
          component={Link}
          key='Leaderboard'
          sx={{ color: 'black' }}
          to='/leaderboard'
        >
          Leaderboard
        </Button>
        <Button component={Link} key='New' sx={{ color: 'black' }} to='/add'>
          New
        </Button>
      </Box>

      <Box sx={{ flexGrow: 0, display: 'flex' }}>
        <Typography
          sx={{
            mt: '15px',
            fontWeight: 700,
            color: 'grey',
            textDecoration: 'none',
          }}
        >
          {user?.name}
        </Typography>
        <Tooltip title='Logout'>
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar src={user?.avatarURL} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key='Logout' onClick={doHandleLogout}>
            <Typography textAlign='center'>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  </>
  )
}
const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    user: users[authedUser],
  }
}

export default connect(mapStateToProps)(Nav)