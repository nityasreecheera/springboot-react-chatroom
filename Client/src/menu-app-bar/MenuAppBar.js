
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';



import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './MenuAppBar.css'

import Badge from '@material-ui/core/Badge';
import Notifications from '../NotificationsComponent'
import BellIcon from 'react-bell-icon';





export default class MenuAppBar extends React.Component {


  constructor(props) {
    super(props);
    this.state =
      {
        openNotifications: false,
        anchorEl: null,
      };
  }

  handleOpenNotifications = () => {
    this.setState({
      openNotifications: true
    })
  }

  handleCloseNotifications = () => {
    this.setState({
      openNotifications: false
    })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = () => {
    window.location.reload();
  };

  render() {
    
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="">
        {/* <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton className="" color="inherit" aria-label="Menu">
              <MenuIcon onClick={this.handleClick} />
            </IconButton>
            <Typography variant="title" color="inherit" className="">
              {this.props.username} <span> </span> <span className="status green"></span>
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>

              </div>
            )}
          </Toolbar>
          <div>

            <Badge className="badge" badgeContent={this.props.roomNotification.length} color="secondary" onClick={this.handleOpenNotifications}>
              <BellIcon active={this.props.bellRing} animate={this.props.bellRing} color="white" width="25px" />
            </Badge>
            <Notifications open={this.state.openNotifications} handleClose={this.handleCloseNotifications}
              notifications={this.props.roomNotification} roomMessages={this.props.broadcastMessage} />

          </div>
        </AppBar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Broadcast </MenuItem>
          <MenuItem onClick={this.handleClose}>Starred </MenuItem>
          <MenuItem onClick={this.handleLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}



