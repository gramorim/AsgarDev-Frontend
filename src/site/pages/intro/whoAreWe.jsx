import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

function WhoAreWePage(props) {
	const { classes } = props;
	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={6} md={10}>
					<Card chart>
						<CardHeader color="primary">
							<center> 
								<h4 style={{ fontSize: '50px', color: "RGB(182,167,104)" }} className={classes.cardTitle}>AsgarDEV</h4>
							</center>
						</CardHeader>
						<CardBody style={{ margin:"5px" }}>
							<center>
								<text style={{ color: "black", fontSize: '20px' }}>Um Grupo de 3 alunos da Escola Politécnica de São Paulo
									que se uniu em 2018 para desenvolver um sistema para solucionar problemas de pequenas, médias e grandes 
									empresas seguindo nossa filosofia de ser eficiente, rápido, ágil. Nosso sistema oferece integração entre 
									empresas que buscam soluções e empresas que oferecerem serviços. Nosso método permite que as empresas que 
									solicitam por serviços resolvem seus problemas de maneira rápida e lucrativa enquanto que as empresas que 
									forneceram os serviços consigam aumentar sua produtividade e lucrar rapidamente sem perder tempo 
									procurando quem oferecer seus serviços. Por questões de sigilo e para aumentar a eficiência dos serviços 
									oferecidos, as empresas fornecedoras competem entre si anonimamente.
								</text>
							</center>
						</CardBody>
					</Card>            
				</GridItem>
			</GridContainer>
		</div>
	);
}

const WhoAreWe = withStyles(dashboardStyle)(WhoAreWePage)
export default WhoAreWe;
