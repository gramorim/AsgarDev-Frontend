import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Star from "@material-ui/icons/StarRate"
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button  from "components/CustomButtons/Button.jsx";
import { url } from "actions/userActions.jsx"

const axios = require("axios");

const style = {
	fontSize: "20px",
	color: "white"
}

class DashboardPage extends React.Component {
	state = {
		user: sessionStorage.getItem("user"),
		id: sessionStorage.getItem("id"),
		service: [],
		client: "",
		provider: "",
		ser: "",
		date: "",
		objectClient: {},
		objectProvider: {}
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	handleStar = (newRank, key) => {
		var newService = this.state.service.slice();
		newService[key][3] = newRank
		this.setState({ service: newService});
	};

	handleSubmit = (key) => {
		var { service } = this.state;
		if(!window.confirm("Tem certeza que gostaria de votar agora?")) return;
		// Mandar rank
		alert("Obrigado pelo seu voto!")
		service.splice(key, 1);
		this.setState({ service });
	}

	create = () => {
		var { client, provider, date } = this.state;
		axios.all(
			[
				axios.get(url + "clientes"),
				axios.get(url + "fornecedores")
			]
		).then(axios.spread((resClients, resProviders) => { 
			const rClient = resClients.data.filter((value) => value.empresa.toLowerCase() === client.toLowerCase())[0];
			const rProvider = resProviders.data.filter((value) => value.empresa.toLowerCase() === provider.toLowerCase())[0];
			console.log(rClient);
			console.log(rProvider);
			var service = { 
				id_cliente: rClient.id, id_fornecedor: rProvider.id, 
				servico: rProvider.servico, contato_cliente: rClient.email, 
				contato_fornecedor: rProvider.email, data: date };
			axios.post(url + "servico", service).then(r => console.log(r)).catch(e => console.log(e));
		})).catch(e => console.log(e));
	}

	handleProvider = (e) => {
		this.setState({ provider:e.target.value });
	}

	handleDate = (e) => {
		this.setState({ date:e.target.value });
	}

	handleClient = (e) => {
		this.setState({ client:e.target.value });
	}

	componentDidMount(){
		const { id, user } = this.state;
		if(user.toString() === '1'){
			axios.get(url + "servicos").then(response => { 
				this.setState({ service:response.data }, () => { console.log(this.state.service)});
			}).catch(e => console.log(e));				
		}
		else{
			axios.get(url + "servicos?id=" + id + "&tipo=" + user).then(response => { 
				this.setState({ service:response.data }, () => { console.log(this.state.service)});
			}).catch(e => console.log(e));		
		}
	}

	createService(classes){
		return (
			<GridItem xs={12} sm={6} md={3}>
				<Card>
					<CardHeader>
						<CardIcon color="info">
							<h1 className={classes.cardTitle}>Criar Serviço</h1>
						</CardIcon>
					</CardHeader>
					<CardBody>
						<CustomInput
							labelText="Empresa Cliente"
							id="client"
							formControlProps={{
								fullWidth: true
							}}
							inputProps={{
								type: "text",
								value: this.state.client,
								onChange: this.handleClient,
								style: { fontSize: "20px" }
							}}							
						/>
						<CustomInput
							labelText="Empresa Fornecedora"
							id="provider"
							formControlProps={{
								fullWidth: true
							}}
							inputProps={{
								type: "text",
								value: this.state.provider,
								onChange: this.handleProvider,
								style: { fontSize: "20px" }
							}}
						/>	
						<CustomInput
							labelText="dd/mm/aaaa"
							id="date"
							formControlProps={{
								fullWidth: true
							}}
							inputProps={{
								type: "text",
								value: this.state.date,
								onChange: this.handleDate,
								style: { fontSize: "20px" }
							}}
						/>
						<Button onClick={() => this.create()} color="primary">Criar serviço!</Button>												
					</CardBody>
				</Card>
			</GridItem>
		)
	}

	handleService(classes){ 
		var components = this.state.service.map((props, key) =>
		{
			var actualDate = new Date()
			var serviceDate = new Date(props.data); 
			var rest = Math.ceil((serviceDate - actualDate)/86400000);
			if(rest < 0) {
				var starStyle = (id) => { return {color: (id < props[3] ? "RGB(205, 205, 0)" : "RGB(220, 220, 220)") , fontSize: "30"} }
				return (
					<GridItem key={key} xs={12} sm={6} md={3}>
						<Card>
							<CardHeader color="info" stats icon>
								<CardIcon color="info">
									<h1 style={style}>Rankear serviço</h1>
								</CardIcon>
							</CardHeader>
							<CardBody>
								<h3 className={classes.cardTitle}>{props.servico}</h3>
								<h3 className={classes.cardTitle}>{props.contato_cliente}</h3>
								<h3 className={classes.cardTitle}>{props.contato_fornecedor}</h3>
								<Star
									onClick={() => this.handleSubmit(key)}
									onMouseLeave={() => this.handleStar(0, key)} 
									onMouseEnter={() => this.handleStar(1, key)} 
									style={ starStyle(0) }/>
								<Star
									onClick={() => this.handleSubmit(key)}
									onMouseEnter={() => this.handleStar(2, key)} 
									style={ starStyle(1) }/>
								<Star 
									onClick={() => this.handleSubmit(key)}							
									onMouseEnter={() => this.handleStar(3, key)} 
									style={ starStyle(2) }/>
								<Star 
									onClick={() => this.handleSubmit(key)}
									onMouseEnter={() => this.handleStar(4, key)} 
									style={ starStyle(3) }/>
								<Star 
									onClick={() => this.handleSubmit(key)}
									onMouseEnter={() => this.handleStar(5, key)} 
									style={ starStyle(4) }/>
							</CardBody> 
						</Card>
					</GridItem>					
					)
				}
				var color = "";
				var dateMessage = ""
				if(serviceDate.getDate() === actualDate.getDate() && rest <= 1.0 ){
					color = 'danger';
					dateMessage = "Hoje!";
				}
				else if(rest >= 0 && rest < 7.0 ){
					color = "warning";
					dateMessage = "Em " +  rest + " dia" + (rest > 1 ? "s": "");
				}
				else if(rest >= 7.0 ){
					color = "success";
					dateMessage = "Em " +  rest + " dias";
				}				
				return(
					<GridItem key={key} xs={12} sm={6} md={3}>
						<Card>
							<CardHeader color="success" stats icon>
								<CardIcon color={color}>
									<Icon>info_outline</Icon>
								</CardIcon>
								<p className={classes.cardCategory}>Agendamento de serviço</p>
							</CardHeader>
							<CardBody>
								<h3 className={classes.cardTitle}>{props.servico}</h3>
								<h3 className={classes.cardTitle}>{props.contato_cliente}</h3>
								<h3 className={classes.cardTitle}>{props.contato_fornecedor}</h3>
							</CardBody> 
							<CardFooter stats>
								<div className={classes.stats}>
									<DateRange/>{dateMessage}
								</div>
							</CardFooter>
						</Card>
					</GridItem>
				)
			}
		) 
		return components;
	}

	viewService(classes){ 
		var components = this.state.service.map((props, key) =>
		{
			var actualDate = new Date()
			var rest = Math.ceil((props[4] - actualDate)/86400000);
			if(rest < 0) return null;
			var color = "";
			var dateMessage = ""
			var data = new Date(props.data)
			if(data.getDate() === actualDate.getDate() && rest <= 1.0 ){
				color = 'danger';
				dateMessage = "Hoje!";
			}
			else if(rest >= 0 && rest < 7.0 ){
				color = "warning";
				dateMessage = "Em " +  rest + " dia" + (rest > 1 ? "s": "");
			}
			else if(rest >= 7.0 ){
				color = "success";
				dateMessage = "Em " +  rest + " dias";
			}				
			return(
				<GridItem key={key} xs={12} sm={6} md={3}>
					<Card>
						<CardHeader color="success" stats icon>
							<CardIcon color={color}>
								<Icon>info_outline</Icon>
							</CardIcon>
							<p className={classes.cardCategory}>Agendamento de serviço</p>
						</CardHeader>
						<CardBody>
							<h3 className={classes.cardTitle}>{props[0]}</h3>
							<h3 className={classes.cardTitle}>{props[1]}</h3>
							<h3 className={classes.cardTitle}>{props[2]}</h3>
						</CardBody> 
						<CardFooter stats>
							<div className={classes.stats}>
								<DateRange/> {dateMessage}
							</div>
						</CardFooter>
					</Card>
				</GridItem>
			)
		}) 
		return components;
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<GridContainer>
					{console.log(this.state.user)}
					{this.state.user.toString() === '1' ? this.createService(classes) : null}
					{this.state.user.toString() === '3' || this.state.user.toString() === '2' ? this.handleService(classes) : null}
				</GridContainer>
			 </div>
		);
	}
}

DashboardPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DashboardPage);
