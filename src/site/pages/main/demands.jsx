import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts"
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import DemandsHandlePage from "site/pages/main/demands/handleDemands";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { url } from "actions/userActions.jsx";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/LibraryAdd";

const axios = require("axios");


class DemandsPage extends React.Component {
	constructor(props){
		super(props); 	
		this.state = {
			id: -2,
			info: [],
			user: sessionStorage.getItem("user"),
			idUser: sessionStorage.getItem("id")	
		};
	}

	goTo = index => {
		this.setState({id: this.state.info[index].id});
	};
	
	view() { 
		return this.state.info.map((prop) => {return [prop.id, prop.custo, prop.status]} );
	}

	componentDidMount(){
		const { user, idUser } = this.state; 
		if(user === '1'){
			axios.get(url + "demandas").then(response => { 
				this.setState({ info:response.data }, () => { console.log(this.state.info)});
			}).catch(e => console.log(e));		

		}		
		if(user === '3' || user === '4'){
			axios.get(url + "demandas?id=" + idUser).then(response => { 
				this.setState({ info:response.data }, () => { console.log(this.state.info)});
			}).catch(e => console.log(e));		
		}
	}

	render() {
		const info = this.view();
		const { classes } = this.props;
		console.log(this.state.id);
		if(this.state.id > -1){
			sessionStorage.setItem("demanda_id", this.state.id)
			return 	(<DemandsHandlePage/>);
		}
		else if(this.state.id === -1){;
			sessionStorage.setItem("demanda_id", 0)			
			return (<DemandsHandlePage/>);
		}
		return (
			<div>		
				<GridContainer>
					<GridItem md={12}>
						<Card>
							<CardHeader color="primary">
								<h1 className={classes.cardTitleWhite}>Demandas</h1>
							</CardHeader>
							<CardBody style={{ fontSize: "20px" }}>
								{this.state.user === '3' || this.state.user === '4' ? 
									<IconButton onClick={() => {this.setState({ id: -1 })}}>
										<Add/>
										<h5 style={{ marginLeft: "10px"}}>Criar demanda</h5> 
									</IconButton> : null
								}	
								<Table
									onClick={this.goTo}
									tableHead={["Número da Demanda", "Custo", "Status"]}
									tableData={info}>						
								</Table> 
							</CardBody>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}


DemandsPage.propTypes = {
	classes: PropTypes.object.isRequired
};


export default withStyles(dashboardStyle)(DemandsPage);
