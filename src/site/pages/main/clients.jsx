import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { url } from "actions/userActions.jsx";

var axios = require("axios"); 

class ClientsPage extends React.Component {
	state = {
		info: [],
		value: 0
	};

	componentDidMount(){
		axios.get(url + "clientes").then(resp => this.setState({ info:resp.data })).catch(e => console.log(e))
	}

	filter(){
		return this.state.info;
	}

	render() {
		const { classes } = this.props;
		var filtered = this.filter()
		return (
			<div>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<Card>
							<CardHeader color="primary">
								<h1 className={classes.cardTitleWhite}>Clientes</h1>
								<p className={classes.cardCategoryWhite}>
									Tabela com descrição de todos os clientes participantes do sistema 
								</p>
							</CardHeader>
							<CardBody>
								<Table
									tableHeaderColor="primary"
									tableHead={["Nome", "Contato"]}
									tableData={ filtered.map(prop => { return [prop.empresa, prop.email] }) }
								/>
							</CardBody>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

ClientsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ClientsPage);
