import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts"
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import CustomInput from "components/CustomInput/CustomInput.jsx";
// core components
import { Button } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { userID, haveAccess, url } from "actions/userActions.jsx";

const axios = require("axios");

class DemandsHandlePage extends React.Component {
	constructor(props) {
		super(props);
		const access = haveAccess();
		const idUser = userID();
		this.state  = {
			user: sessionStorage.getItem("user"),
			idUser: sessionStorage.getItem("id"),
			demanda_id: sessionStorage.getItem("demanda_id"),
			enable: access === "1",
			cliente_id: parseInt(idUser, 10),
			cost: "R$0,00",
			status: "Não visualizado",
			problem: "",
			solution: ""
		};
	}

	componentDidMount() {
		const { demanda_id } = this.state;
		if(demanda_id > -1){
			axios.get(url + "demanda/" +  demanda_id).then(resp => this.setState({ demanda_id: resp.data.id, status: resp.data.status, cost: resp.data.custo, problem: resp.data.problema, solution: resp.data.solucao }));
		}
		sessionStorage.removeItem("demanda_id");
	}

	changeDemand = () => {	
		const { demanda_id, cliente_id, cost, status, problem, solution } = this.state
		var demanda = { cliente_id: cliente_id, custo: cost, status: status, problema: problem, solucao: solution };
		console.log(demanda);
		axios.put(url + "demanda/" + demanda_id, demanda).then(response => console.log(response.data)).catch(e => console.log(e));
	};
	
	createDemand(){
		const { idUser, cost, status, problem, solution } = this.state
		var demanda = { cliente_id: idUser, custo: cost, status: status, problema: problem, solucao: solution };
		axios.post(url + "demanda", demanda).then(response => console.log(response.data)).catch(e => console.log(e));
	}
	
	deleteDemand = () => {
		const { demanda_id } = this.state;
		axios.delete(url + "demanda/" + demanda_id).then(response => console.log(response.data));	
	}
	
	isSelected(classes) {
		var { demanda_id } = this.state;
		var title, labelText, body;
		if(demanda_id < 1){
			title = "Criar demanda";
			labelText = "Descreva seu Problema";
			body = 
				<CardBody>
					<CustomInput
						labelSize="25px"
						inputSize="20px"
						labelText={labelText}
						id="describe"
						formControlProps={{fullWidth: true}}
						inputProps={{
							onChange: (event => this.setState({ problem: event.target.value })), 
							value: this.state.problem,
							multiline: true, 
							rows: 6
						}}/>
					<center>
						<Button 
							href={"/main/demands"}
							onClick = {() => this.createDemand()}
							style={{ 	
								width: "30%", 
								color: "white", 
								backgroundColor: "black", 
								fontSize: "32px", 
							}}>Criar
						</Button>
						<Button
							href={"/main/demands"}
							style={{ 	
							margin: "5px",
							width: "30%", 
							color: "white", 
							backgroundColor: "black", 
							fontSize: "32px", 
							}}>Cancelar
						</Button>							
					</center>
				</CardBody>
		}
		else{
			title = "Demanda Número " + demanda_id;
			body =
			<CardBody>
				<CustomInput
					labelSize="25px"
					inputSize="20px"
					labelText="Custo"
					id="cost"
					formControlProps={{}}
					inputProps={{
						onChange: (event => this.setState({ cost: event.target.value })), 
						value: this.state.cost,
						readOnly: !this.state.enable
					}}
				/>
				<CustomInput
					labelSize="25px"
					inputSize="20px"
					labelText="Status"
					id="status"
					formControlProps={{}}
					inputProps={{
						onChange: (event => this.setState({ status: event.target.value })), 
						value: this.state.status,
						readOnly: !this.state.enable
					}}
				/>
				<CustomInput
					labelSize="25px"
					inputSize="20px"
					labelText="Descrição"
					id="describe"
					formControlProps={{
						fullWidth: true	
					}}
					inputProps={{
						readOnly: this.state.enable,
						onChange: (event => this.setState({ problem: event.target.value })), 
						value: this.state.problem,
						multiline: true,
						rows: 6
					}}
				/>
				<CustomInput
					labelSize="25px"
					inputSize="20px"
					labelText="Solução"
					id="solution"
					formControlProps={{
						fullWidth: true	
					}}
					inputProps={{
						readOnly: !this.state.enable,
						onChange: (event => this.setState({ solution: event.target.value })), 
						value: this.state.solution,
						multiline: true,
						rows: 6
					}}
				/>				
				<center>
					<Button 
						href={"/main/demands"}
						onClick={this.changeDemand}						
						style={{
						margin: "5px",
						width: "30%", 
						color: "white", 
						backgroundColor: "black", 
						fontSize: "32px", 
					}}>Modificar
					</Button>
					<Button 
						href={"/main/demands"}
						onClick={this.deleteDemand}						
						style={{
						margin: "5px",
						width: "30%", 
						color: "white", 
						backgroundColor: "black", 
						fontSize: "32px", 
					}}>Deletar
					</Button>					
					<Button
						href={"/main/demands"}
						style={{ 	
						margin: "5px",
						width: "30%", 
						color: "white", 
						backgroundColor: "black", 
						fontSize: "32px", 
					}}>Cancelar
					</Button>				
				</center>
			</CardBody>			
		}
		return (
			<Card>
			<CardHeader color="primary">
				<h1 className={classes.cardTitleWhite}>{title}</h1>
			</CardHeader>
				{body}
			</Card>
		) 
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<GridContainer>
					<GridItem md={12}>
						{this.isSelected(classes)}
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}


DemandsHandlePage.propTypes = {
	classes: PropTypes.object.isRequired
};


export default withStyles(dashboardStyle)(DemandsHandlePage);
