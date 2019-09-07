import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { logout } from '../../../actions';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    background: '#252d3a'
  }
};


const renderRoute = (routes, onClick) => routes.map(route => (
  <MenuItem onClick={onClick(route.key)}>{route.title}</MenuItem>
  ));

function ButtonAppBar(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  const onMenuClick = where => () => {
    console.log(where);
    props.history.push(`/${where}`);
    setAnchorEl(null);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

 const nonAuth = [
    {
      title: 'Logowanie',
      key: 'signin'
    },
    {
      title: 'Rejestracja',
      key: 'signup'
    }
  ];

  const auth = [
    {
      title: 'Chat',
      key: 'chat'
    },
    {
      title: 'Profil',
      key: 'profile'
    },
    {
      title: 'Grupy',
      key: 'groups'
    }
  ];

  const onLogoutClick = () => {
    props.logout();
  };

  const routes = props.isAuth ? auth : nonAuth;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onClose}
          >

            {renderRoute(routes, onMenuClick)}
          </Menu>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            SpareShare
          </Typography>
          <IconButton onClick={onLogoutClick} className={classes.menuButton} color="inherit" aria-label="Log out">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}


ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isAuth: state.account.isAuth,
  });

const mapDispatch = dispatch => bindActionCreators({
    logout
  }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatch)(withStyles(styles)(ButtonAppBar)));
