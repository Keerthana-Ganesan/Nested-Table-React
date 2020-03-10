import React from 'react';
import NestedTable from "./table";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      headerConfig: [
        { title: 'name', field: 'name' },
        { title: 'companyName', field: 'companyName' },
      ],
      tableData: [
        { companyName: 'Hudson, Rohan and Shanahan', id: 1, name: { firstname: 'John ', lastname: 'Jacobs' } },
        { companyName: 'ABC', id: 2, name: { firstname: 'Jansi ', lastname: 'Rani' } },
        { name: 'Candace Jast', companyName: 'Schuppe, Jerde and Mann', id: 3 },
        { name: 'Menaga', companyName: 'prematix', id: 4 },
        { name: 'Aadharsha', companyName: 'QWE', id: 5 },
        { name: 'Lashmi', companyName: 'QWE', id: 6 },
        { name: 'Keerthi', companyName: 'QWE-I', id: 7 },
        { name: 'Rohini', companyName: 'PST', id: 8 },
        { name: 'Yogesh', companyName: 'LTN', id: 9 },
        { name: 'Indhumathi', companyName: 'HTM', id: 10 },
        { name: 'Ramya', companyName: 'QWE', id: 11 },
      ],
      nestedColumns: [
        { title: 'First Name', field: 'firstname' },
        { title: 'Last Name', field: 'lastname' },
      ],
    }
  }
  render() {
    const { tableData, headerConfig, nestedColumns } = this.state;
    return (
      <React.Fragment>
        <NestedTable tableData={tableData} headerConfig={headerConfig} nestedColumns={nestedColumns} />
      </React.Fragment >
    )
  }

}

export default App;
