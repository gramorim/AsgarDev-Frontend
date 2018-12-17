import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { url,  } from "actions/userActions.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const axios = require("axios");

class MyCompanyPage extends React.Component {
	constructor(props) {
		super(props);
		this.state  = {
			company: '',
			email: '',
			password: '',
			name: '',
			cnpj: '',
			address: '',
      service: '',
      user: sessionStorage.getItem("user"),
			id: sessionStorage.getItem("id")
	  } 
  };

	componentDidMount(){
    const { user, id } = this.state;     
		if(user === '2'){
			axios.get(url + "fornecedor/" + id).then(r => { 
        this.setState({ company:r.data.empresa, email: r.data.email, 
          password: r.data.senha, name: r.data.nome, 
          cnpj: r.data.cnpj,address: r.data.endereco,
          service: r.data.servico
        }, () => { console.log(this.state.info)});
			}).catch(e => console.log(e));
		}		
		if(user === '3' || user === '4'){
			axios.get(url + "cliente/" + id).then(r => { 
        this.setState({ company:r.data.empresa, email: r.data.email, 
          password: r.data.senha, name: r.data.nome, 
          cnpj: r.data.cnpj,address: r.data.endereco
        }, () => { console.log(this.state.info)});
			}).catch(e => console.log(e));	
		}
	}

	handleCompany = (event) => {
		this.setState({ company: event.target.value });
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

	handleService = (event) => {
		this.setState({ service: event.target.value });
	}	

  change = () => {
    const { user, id, company, service, password, name, cnpj, address, email } = this.state; 
		if(user === '2'){
      var provider = { empresa: company, email: email, senha: password, nome: name, 
        cnpj: cnpj, endereco: address, servico: service, tipo: 2 };
			axios.put(url + "fornecedor/" + id, provider).then(r => { console.log(r.data); alert("Dados atualizados com sucesso!")}).catch(e => console.log(e));
		}		
		if(user === '3' || user === '4'){
      var client = {empresa: company, email: email, senha: password, nome: name, cnpj: cnpj, endereco: address, tipo: 3}; 
			axios.put(url + "cliente/" + id, client).then(r => { console.log(r.data); alert("Dados atualizados com sucesso!")}).catch(e => console.log(e));	
		}    
  }

  render(){
    const { classes } = this.props;
    var { company, email, password, name, cnpj, address, service } = this.state; 
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
                type: "text",
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
                onChange: this.handleCnpj,
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
              labelText="Serviço oferecido (Para ser um Fornecedor preencha este campo)"
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
          <Button onClick={() => this.change()} color="primary">Alterar</Button>
          </CardFooter>
        </Card>
        </GridItem>
      </GridContainer>
      </div>
      );
    }
}

MyCompanyPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(MyCompanyPage);
