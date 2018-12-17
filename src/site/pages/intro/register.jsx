import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { url } from "actions/userActions.jsx";

const axios = require("axios");

const styles = {
  cardCategoryWhite: {
	color: "rgba(255,255,255,.62)",
	margin: "0",
	fontSize: "14px",
	marginTop: "0",
	marginBottom: "0"
  },
  cardTitleWhite: {
	color: "#FFFFFF",
	marginTop: "0px",
	minHeight: "auto",
	fontWeight: "300",
	fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	marginBottom: "3px",
	textDecoration: "none"
  }
};

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state  = {
			company: '',
			email: '',
			password: '',
			name: '',
			cnpj: '',
			address: '',
			type: '',
			service: ''
	  } 
  };

	handleCompany = (event) => {
		this.setState({ company: event.target.value });
	};

	handleCNPJ = (event) => {
		this.setState({ cnpj: event.target.value });
	};	

	handleEmail = (event) => {
		this.setState({ email: event.target.value });
	};

	handlePassword = (event) => {
		this.setState({ password: event.target.value });
	};

	handleName = (event) => {
		this.setState({ name: event.target.value });
	};

	handleAddress = (event) => {
		this.setState({ address: event.target.value });
	};

	handleType = (event) => {
		this.setState({ type: event.target.value });
	}	

	handleService = (event) => {
		this.setState({ service: event.target.value });
	}	

  register() {
		const { company, email, name, cnpj, password, address, type, service } = this.state;
		var user;
		if(type.toLowerCase() === 'fornecedor'){
			user = { empresa: company, senha: password, email: email, nome: name, endereco: address, cnpj: cnpj, tipo: 2, servico: service };
			axios.post(url + "fornecedor", user).then(resp => {alert("Conta criada!"); console.log(resp.data)})
			.catch(e => {alert("Não foi possível criar")});
		}  
		else if(type.toLowerCase() === 'cliente'){
			user = { empresa: company, senha: password, email: email, nome: name, endereco: address, cnpj: cnpj, tipo: 3 };
			axios.post(url + "cliente", user).then(resp => {alert("Conta criada!"); console.log(resp.data)})
			.catch(e => {alert("Não foi possível criar")});
		}
		else if(type.toLowerCase() === "ambos"){
			user = { empresa: company, senha: password, email: email, nome: name, endereco: address, cnpj: cnpj, tipo: 4 };
			axios.post(url + "cliente", user).then(resp => {alert("Conta criada!"); console.log(resp.data)})
			.catch(e => {alert("Não foi possível criar")});
		}
		
  }

  render(){
	const { classes } = this.props;
	var { company, email, password, name, cnpj, address, type, service } = this.state; 
	return (
	  <div>
		<GridContainer>
		  <GridItem xs={12} sm md>
			<Card>
			  <CardHeader color="primary" background="linear-gradient(60deg, #594615, #000000)">
				<h4 className={classes.cardTitleWhite}>Cadastro</h4>
				<p className={classes.cardCategoryWhite}>Diga-nos quem você é!</p>
			  </CardHeader>
			  <CardBody>
				<GridContainer>
				  <GridItem xs={12} sm={12} md={5}>
					<CustomInput
					  labelText="Empresa"
					  id="company"
					  formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							type: "text",
							value: company,
							onChange: this.handleCompany,
							style: { fontSize:"20px" }
						}}						
					/>
				  </GridItem>
				  <GridItem xs={12} sm={12} md={4}>
					<CustomInput
					  labelText="Email"
					  id="email"
					  formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							type: "text",
							value: email,
							onChange: this.handleEmail,
							style: { fontSize:"20px" }
						}}								
					/>
				  </GridItem>
				  <GridItem xs={12} sm={12} md={4}>
					<CustomInput
					  labelText="Senha"
					  id="password"
					  formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							type: "password",
							value: password,
							onChange: this.handlePassword,
							style: { fontSize:"20px" }
						}}								
					/>
				  </GridItem>                  
				</GridContainer>
				<GridContainer>
				  <GridItem xs={12} sm={12} md={6}>
					<CustomInput
					  labelText="Nome"
					  id="name"
					  formControlProps={{
						fullWidth: true
						}}
						inputProps={{
							type: "text",
							value: name,
							onChange: this.handleName,
							style: { fontSize:"20px" }
						}}								
					/>
				  </GridItem>
				  <GridItem xs={12} sm={12} md={6}>
					<CustomInput
					  labelText="CNPJ"
					  id="cnpj"
					  formControlProps={{
						fullWidth: true
						}}
						inputProps={{
							type: "text",
							value: cnpj,
							onChange: this.handleCNPJ,
							style: { fontSize:"20px" }
						}}								
					/>
				  </GridItem>
				</GridContainer>
				<GridContainer>
				  <GridItem xs={12} sm={12} md={4}>
					<CustomInput
					  labelText="Endereço"
					  id="address"
					  formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							type: "text",
							value: address,
							onChange: this.handleAddress,
							style: { fontSize:"20px" }
						}}								
					/>
				  </GridItem>
				  <GridItem xs={12} sm={12} md={4}>
					<CustomInput
					  labelText="Tipo (Cliente ou Fornecedor ou ambos)"
					  id="type"
					  formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							type: "text",
							value: type,
							onChange: this.handleType,
							style: { fontSize:"20px" }
						}}								
					/>
				  </GridItem>
				  <GridItem xs={12} sm={12} md={4}>
					<CustomInput
					  labelText="Serviço oferecido (Fornecedor apenas)"
					  id="service"
					  formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							type: "text",
							value: service,
							onChange: this.handleService,
							style: { fontSize:"20px" }
						}}								
					/>
				  </GridItem>				  
				</GridContainer>
				{<br />}
			  </CardBody>
			  <CardFooter>
				<Button onClick={() => this.register()} color="primary">Criar conta</Button>
			  </CardFooter>
			</Card>
		  </GridItem>
		</GridContainer>
	  </div>
	  );
	}
}

export default withStyles(styles)(Register);
