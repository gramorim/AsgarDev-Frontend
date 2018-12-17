import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';

function Contact(props) {
	const { classes } = props;
	return (
		<div>
        <GridContainer>
			<GridItem xs={12} sm={6} md={4}>
				<Card chart>
					<CardHeader color="primary">
						<center> 
							<h4 style={{ color: "white", fontSize: '30px' }} className={classes.cardTitle}>Central de Atendimento</h4>
						</center>
					</CardHeader>
					<CardBody style={{ margin:"5px" }}>
						<center>
							<Typography style={{ color: "gray", fontSize: '50px' }}>{"11 4002 8922   "}</Typography>
							<Typography style={{ color: "gray", fontSize: '30px' }}>helpdesk@asgardev.com</Typography>
						</center>
					</CardBody>
              	</Card>            
            </GridItem>
        </GridContainer>
        <GridContainer>
			<GridItem xs={12} sm={6} md={4}>
				<Card chart>
					<CardHeader color="primary">
						<center> 
							<h4 style={{ color: "white", fontSize: '29px' }} className={classes.cardTitle}>Reclamações ou Sugestões</h4>
						</center>
					</CardHeader>
					<CardBody style={{ margin:"5px" }}>
						<center>
							<Typography style={{ color: "gray", fontSize: '50px' }}>{"11 60606060"}</Typography>
						</center>
					</CardBody>
              	</Card>            
            </GridItem>
        </GridContainer>
      </div>		
	);
}

export default withStyles(dashboardStyle)(Contact);