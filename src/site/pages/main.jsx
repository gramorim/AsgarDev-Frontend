/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

import Header from "components/Header/Header.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import { haveAccess, logout} from "actions/userActions.jsx"

// icons
import image from "assets/img/backGroundBlack.png";
import logo from "assets/img/AsgarDEVlogo.png";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import Company from "@material-ui/icons/WorkOutline";
import Account from "@material-ui/icons/AccountBox";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// Subpages
import DashboardPage from "site/pages/main/dashboard.jsx";
import ProvidersPage from "site/pages/main/providers.jsx";
import MyCompanyPage from "site/pages/main/mycompany.jsx";
import ClientsPage from "site/pages/main/clients.jsx";
import DemandsPage from "site/pages/main/demands.jsx";

const pMain = "/main";

function Lout() {
	logout()
	return <div></div>;
}

const providerRoutes = [
	{
		path: pMain + "/dashboard",
		sidebarName: "Dashboard",
		icon: Dashboard,
		component: DashboardPage
	},
	{
		path: pMain + "/my-company",
		sidebarName: "Minha empresa",
		icon: Account,
		component: MyCompanyPage
	},
	{
		path: pMain + "/logout",
		sidebarName: "Sair",
		icon: PowerSettingsNew,
		component: Lout
	},	
	{ redirect: true, path: pMain, to: pMain + "/dashboard", navbarName: "Redirect" }
];

const clientRoutes = [
	{
		path: pMain + "/dashboard",
		sidebarName: "Dashboard",
		icon: Dashboard,
		component: DashboardPage
	},
	{
		path: pMain + "/demands",
		sidebarName: "Demandas",
		icon: LibraryBooks,
		component: DemandsPage
	},
	{
		path: pMain + "/my-company",
		sidebarName: "Minha empresa",
		icon: Account,
		component: MyCompanyPage
	},
	{
		path: pMain + "/logout",
		sidebarName: "Sair",
		icon: PowerSettingsNew,
		component: Lout
	},	
	{ redirect: true, path: pMain, to: pMain + "/dashboard", navbarName: "Redirect" }
];

const admRoutes = [
	{
		path: pMain + "/dashboard",
		sidebarName: "Dashboard",
		icon: Dashboard,
		component: DashboardPage
	},
	{
		path: pMain + "/demands",
		sidebarName: "Demandas",
		icon: LibraryBooks,
		component: DemandsPage
	},
	{
		path: pMain + "/clients",
		sidebarName: "Clientes",
		icon: Person,
		component: ClientsPage
	},
	{
		path: pMain + "/providers",
		sidebarName: "Fornecedores",
		icon: Company,
		component: ProvidersPage
	},
	{
		path: pMain + "/logout",
		sidebarName: "Sair",
		icon: PowerSettingsNew,
		component: Lout
	},	
	{ redirect: true, path: pMain, to: pMain + "/dashboard", navbarName: "Redirect" }
];

const routes = {"1": admRoutes, "3": clientRoutes, "2": providerRoutes, "4": clientRoutes};

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		const user = haveAccess();
		this.state = {
			mobileOpen: false,
			routes: routes[user? user : "1"]
		};
		this.resizeFunction = this.resizeFunction.bind(this);
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
	
	render() {
		const { classes, ...rest } = this.props;
		const switchRoutes = (
			<Switch>
				{this.state.routes.map((prop, key) => {
					if (prop.redirect)
						return <Redirect from={prop.path} to={prop.to} key={key} />;
					return <Route path={prop.path} component={prop.component} key={key} />;
				})}
			</Switch>
		);
		return (
			<div style={{ backgroundSize: "cover"}} className={classes.wrapper}>
				<div className={classes.mainPanel} ref="mainPanel"></div>
				<Sidebar
					routes={this.state.routes}
					logo={logo}
					image={image}
					handleDrawerToggle={this.handleDrawerToggle}
					open={this.state.mobileOpen}
					color="blue"
					{...rest}
				/>
				<div className={classes.mainPanel} ref="mainPanel">
					<Header
						style={{ background: "black"}} 
						routes={this.state.routes}
						handleDrawerToggle={this.handleDrawerToggle}
						{...rest}/>
						<div className={classes.content}>
							<div className={classes.container}>{switchRoutes}</div>
						</div>
				</div>
			</div>
		);
	}
}
	
MainPage.propTypes = {
	classes: PropTypes.object.isRequired
};

const Main = withStyles(dashboardStyle)(MainPage)

export default Main;
	