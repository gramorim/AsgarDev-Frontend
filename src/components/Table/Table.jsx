import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from '@material-ui/core/TableFooter';
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5,
	},
});
	
class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = event => {
		this.props.onChangePage(event, 0);
	};
	
	handleBackButtonClick = event => {
		this.props.onChangePage(event, this.props.page - 1);
	};
	
	handleNextButtonClick = event => {	
		this.props.onChangePage(event, this.props.page + 1);
	};
	
	handleLastPageButtonClick = event => {
		this.props.onChangePage(
			event,
			Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
			);
	};
	
	render() {
		const { classes, count, page, rowsPerPage, theme } = this.props;
	
		return (
		<div className={classes.root}>
			<IconButton
			onClick={this.handleFirstPageButtonClick}
			disabled={page === 0}
			aria-label="First Page"
			>
			{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
			onClick={this.handleBackButtonClick}
			disabled={page === 0}
			aria-label="Previous Page"
			>
			{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
			onClick={this.handleNextButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			aria-label="Next Page"
			>
			{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
			onClick={this.handleLastPageButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			aria-label="Last Page"
			>
			{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
		);
	}
}
	
TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired,
};
	
const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
	TablePaginationActions,
);

class CustomTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			page: 0,
			rowsPerPage: 5,
		}
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};
	
	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};	
	
	render() {
		const { classes, tableHead, tableData, tableHeaderColor, onClick } = this.props;
		const { rowsPerPage, page } = this.state;
		return (
			<div className={classes.tableResponsive}>
				<Table className={classes.table}>
					{tableHead !== undefined ? (
						<TableHead className={classes[tableHeaderColor + "TableHeader"]}>
							<TableRow>
								{tableHead.map((prop, key) => {
									return (
										<TableCell
											className={classes.tableCell + " " + classes.tableHeadCell}
											key={key}
										>{prop}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
					) : null}
					<TableBody>
						{tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prop, key) => {
							return (
								<TableRow hover onClick={onClick !== undefined ? () => onClick(page * rowsPerPage + key) : null} key={key}>
									{prop.map((prop, key) => {
										return (
											<TableCell style={{ fontSize: "20px" }} className={classes.tableCell} key={key}>
												{prop}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								count={tableData.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActionsWrapped}/>
						</TableRow>							
					</TableFooter> 
				</Table>
			</div>
);
	}
}

CustomTable.defaultProps = {
	tableHeaderColor: "gray"
};

CustomTable.propTypes = {
	classes: PropTypes.object.isRequired,
	tableHeaderColor: PropTypes.oneOf([
		"warning",
		"primary",
		"danger",
		"success",
		"info",
		"rose",
		"gray"
	]),
	tableHead: PropTypes.arrayOf(PropTypes.string),
	tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
