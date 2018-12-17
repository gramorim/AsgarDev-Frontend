import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import {
  demandChart,
  providerChart,
  clientChart,
  returnChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Start extends React.Component {
  state = {
    value: 0
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    const headerStyle = { fontSize: "35px", color: "white"};
    const bodyStyle = { fontSize: "15px" };
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="primary">
                  <h4 style={headerStyle} className={classes.cardTitle}>Seja um Cliente</h4>
                </CardHeader>
                <CardBody style={bodyStyle}>
                  <h4 className={classes.cardTitle}>E encontre as melhores soluções para seus problemas em nosso sistema!</h4>
                  </CardBody>
              </Card>            
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="primary">
                  <h4 style={headerStyle} className={classes.cardTitle}>Seja um Fornecedor</h4>
                </CardHeader>
                <CardBody style={bodyStyle}>
                  <h4 className={classes.cardTitle}>E forneça seus serviços para qualquer empresa e renda como nunca!</h4>
                  </CardBody>
              </Card>            
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="primary">
                  <h4 style={headerStyle} className={classes.cardTitle}>Ou seja ambos!</h4>
                </CardHeader>
                <CardBody style={bodyStyle}>
                  <h4 className={classes.cardTitle}>E aproveite com o melhor que nossos sistema tem a oferecer!</h4>
                  </CardBody>
              </Card>            
            </GridItem>                         
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={returnChart.data}
                  type="Line"
                  options={returnChart.options}
                  listener={returnChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h1 className={classes.cardTitle}>Retorno</h1>
                </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={demandChart.data}
                  type="Bar"
                  options={demandChart.options}
                  responsiveOptions={demandChart.responsiveOptions}
                  listener={demandChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h1 className={classes.cardTitle}>Número de Demands</h1>
             </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={clientChart.data}
                  type="Line"
                  options={clientChart.options}
                  listener={clientChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h1 className={classes.cardTitle}>Número de Clientes</h1>
              </CardBody>
            </Card>
          </GridItem>     
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={providerChart.data}
                  type="Line"
                  options={providerChart.options}
                  listener={providerChart.animation}
                />
              </CardHeader>
              <CardBody >
                <h1 className={classes.cardTitle}>Número de Fornecedores</h1>
              </CardBody>
            </Card>
          </GridItem>            
        </GridContainer>
      </div>
    );
  }
}

Start.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Start);
