/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";

import logo from "assets/img/AsgarDEVlogo.png"

// Subpages 
import Start from "site/pages/intro/start.jsx";
import Register from "site/pages/intro/register.jsx";
import WhoAreWe from "site/pages/intro/whoAreWe.jsx";
import Contact from "site/pages/intro/contact.jsx";
import AsgarDEVlogo from "assets/img/sidebar-2.jpg"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import { Button } from "@material-ui/core";

import classNames from "classnames";
// @material-ui/core components
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import { login } from "actions/userActions.jsx"

const IntroRoutes = [
	{ path: "/intro", component: Start },
	{ path: "/who-are-we", component: WhoAreWe },
	{ path: "/contact", component: Contact },
	{ path: "/register", component: Register },
	{ redirect: true, path: "*", to: "/intro", navbarName: "Redirect" }
];	

const switchRoutes = (
  <Switch>
    {IntroRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect exact from={prop.path} to={prop.to} key={key} />;
      return <Route exact path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class IntroPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			mobileOpen: false,
			user: "",
			pass: ""
		};
		this.resizeFunction = this.resizeFunction.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleToggle = () => {
		this.setState(({ open: true }));
	};

	handleClose = event => {
		if (!this.anchorEl.contains(event.target)) {
			this.setState({ open: false });
		}

	}; 

	handlePass = (event) => {
		this.setState({ pass: event.target.value })
	}

	handleUser = (event) => {
		this.setState({ user: event.target.value })
	}

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};

	resizeFunction() {
		if (window.innerWidth >= 960) {
		this.setState({ mobileOpen: false });
		}
	}

	componentDidUpdate(e) {
		if (e.history.location.pathname !== e.location.pathname) {
			this.refs.mainPanel.scrollTop = 0;
			if (this.state.mobileOpen) {
				this.setState({ mobileOpen: false });
			}
		}
	}

  	handleSubmit(e) {
		const { user, pass } = this.state;
		e.preventDefault();
		login(user, pass)
	}

	render() {
		const { classes, ...rest } = this.props;
		const { open } = this.state;
		const textStyle = { 
			fontSize: "20px",
			padding: "1px"
		};
		const buttonStyle = {
			backgroundColor: 'black',
			color: "white",
			width: "98%",
			fontSize: "100%",
			margin: '1%	'
		}
		const divStyle = {
			paddingTop: '2px',
			paddingLeft: '2px',
			paddingRight: '2px'
		}
		const buttonBigtStyle = {
			backgroundColor: 'black', 
			color:"white",
			fontSize:"120%"
		}    
		const smallButtonStyle = {
			backgroundColor: 'grey',
			fontSize: "100%",
			color: 'white',
			margin: '1px',
		}
		const header = { background: 'black' };
		return (
		<div style={{ backgroundSize: "cover", backgroundImage: "url(" + AsgarDEVlogo + ")" }} className={classes.wrapper}>
			<div style={{ width:"100%" }} className={classes.mainPanel} ref="mainPanel">
				<Header style={header} routes={IntroRoutes} handleDrawerToggle={this.handleDrawerToggle}{...rest}>
					<div className={classes.flex}><img src={logo} style={{ width: "30%"}}/></div>
					<div style={{ position: "absolute", right: "0px" }} className={classes.manager}>
							<Button href="/intro" style={buttonBigtStyle}>Introdução</Button>
							<Button href="/who-are-we" style={buttonBigtStyle}>Quem Somos</Button>
							<Button href="/contact" style={buttonBigtStyle}>Contato</Button>
							<Button style={smallButtonStyle}
								buttonRef={node => {
								this.anchorEl = node;
								}}
								onClick={this.handleToggle}
								className={classes.buttonLink}
							>Login
								<Hidden mdUp implementation="css">
									<p onClick={this.handleClick} className={classes.linkText}>
									</p>
								</Hidden>
							</Button>
							<Poppers
									open={open}
									anchorEl={this.anchorEl}
									transition
									disablePortal
									className={
									classNames({ [classes.popperClose]: !open }) +
									" " +
									classes.pooperNav
								}
								>{({ TransitionProps, placement }) => (
								<Grow {...TransitionProps} id="menu-list-grow"
									style={{transformOrigin: placement === "bottom" ? "center top" : "center bottom"}}>
									<Paper>
										<ClickAwayListener onClickAway={this.handleClose}>
											<div>
												<div style={divStyle} className={'form-group'}>
													<input style={textStyle} placeholder="Usuário" type="text" onChange={this.handleUser} value={this.state.user} name="username"  />
												</div>
												<div style={divStyle} className={'form-group'}>
													<input style={textStyle} placeholder="Senha" type="password" onChange={this.handlePass} value={this.state.pass}  name="password" />  
												</div>
												<div style={divStyle} className={'form-group'}>
													<input type="checkbox" style={{ width: "20px", height: "20px" }} name="remeberme"/>Lembrar Usuário  
												</div>                    
												<div className="form-group">
													<Button style={buttonStyle} onClick={this.handleSubmit}>Entrar</Button>
												</div>
											</div>
										</ClickAwayListener>
									</Paper>
								</Grow>
								)}
							</Poppers>
							<Button href="/register" style={smallButtonStyle}>Registrar</Button>
					</div>            
				</Header>
				<div className={classes.content}>
					<div className={classes.container}>{switchRoutes}</div>
				</div>
			</div>
		</div>
		);
	}
}

IntroPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const Intro = withStyles(dashboardStyle)(IntroPage);

export default Intro;
