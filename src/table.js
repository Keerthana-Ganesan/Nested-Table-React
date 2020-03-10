import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css";

class NestedTable extends React.Component {
  render() {
    if (this.props.data) {
      const { headerConfig, nestedColumns } = this.props;
      let columns = [
        <TableHeaderColumn dataField="id" isKey dataSort={true}>
          ID
        </TableHeaderColumn>
      ];
      let nestedColumnsConfig = [
        <TableHeaderColumn dataField="id" isKey dataSort={true}>
          ID
        </TableHeaderColumn>
      ];
      headerConfig.map((hConfig) => {
        columns.push(
          <TableHeaderColumn dataField={hConfig.field} dataSort={true}>{hConfig.title}</TableHeaderColumn>,
        )
      });
      nestedColumns.map((hConfig) => {
        nestedColumnsConfig.push(
          <TableHeaderColumn dataField={hConfig.field} dataSort={true}>{hConfig.title}</TableHeaderColumn>,
        )
      });
      if (this.props.isNestedData) {
        return (
          <BootstrapTable data={this.props.data}>
            {nestedColumnsConfig}
          </BootstrapTable>
        );
      }
      return (
        <BootstrapTable data={this.props.data}>
          {columns}
        </BootstrapTable>
      );
    } else {
      return <p>?</p>;
    }
  }
}


export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      nestedTableData: []
    };
    this.expandedRows = {};
  }

  componentWillMount = () => {
    let { tableData } = this.props;
    let nestedTableData = [];
    tableData = tableData.map((stateData) => {
      if (stateData.name instanceof Object) {
        nestedTableData.push({ firstname: stateData.name.firstname, lastname: stateData.name.lastname, id: stateData.id });
        stateData.name = stateData.name.firstname;
      }
      return stateData;
    });
    this.setState({ tableData, nestedTableData });
  }

  expandComponent = (row) => {
    var isNestedData = false;
    if (this.expandedRows[row.id]) {
      if (this.count) {
        this.count.innerText = +this.count.innerText + 1;
      }
      let nestedData = this.state.tableData;
      if (this.state.nestedTableData.filter((nestData) => nestData.id === row.id).length) {
        nestedData = this.state.nestedTableData.filter((nestData) => nestData.id === row.id);
        isNestedData = true;
      }
      return (
        <div>
          <NestedTable data={nestedData} isNestedData={isNestedData} headerConfig={this.props.headerConfig}
            nestedColumns={this.props.nestedColumns} />
        </div>
      );
    }
  }
  handleExpand = (rowKey, isExpand) => {
    this.expandedRows[rowKey] = isExpand;
  }

  render() {
    const { headerConfig } = this.props;
    const columns = [
      <TableHeaderColumn dataField="id" isKey dataSort={true}>
        ID
      </TableHeaderColumn>
    ];
    headerConfig.map((hConfig) => {
      columns.push(
        <TableHeaderColumn dataField={hConfig.field} dataSort={true} >{hConfig.title}</TableHeaderColumn>,
      )
    });
    const tableOptions = {
      expandRowBgColor: "#f9f9fc",
      expandBy: "column",
      onExpand: this.handleExpand
    };

    const expandColumnOptions = {
      expandColumnVisible: true
    };

    return (
      <React.Fragment>
        <h4>Dynamic NestedTable </h4>
        <div className="container">
          <BootstrapTable
            options={tableOptions}
            data={this.state.tableData}
            pagination             
            expandableRow={() => true}
            expandComponent={this.expandComponent}
            expandColumnOptions={expandColumnOptions}
          >
            {columns}
          </BootstrapTable>
        </div>
      </React.Fragment>

    );
  }
}
