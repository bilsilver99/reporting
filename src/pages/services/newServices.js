import React from "react";
import SelectBox from "devextreme-react/select-box";
import DataGrid, { Column, Editing } from "devextreme-react/data-grid";

const dataSource = [
  { id: 1, name: "John", status: "Active" },
  { id: 2, name: "Jane", status: "Inactive" },
  { id: 3, name: "Bob", status: "Active" },
];

const statusOptions = [
  { value: "Active", text: "Active" },
  { value: "Inactive", text: "Inactive" },
];

class StatusEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    return (
      <SelectBox
        value={this.state.value}
        onValueChanged={this.handleChange}
        dataSource={statusOptions}
        valueExpr="value"
        displayExpr="text"
      />
    );
  }
}

class Services extends React.Component {
  render() {
    return (
      <DataGrid
        dataSource={dataSource}
        keyExpr="id"
        showBorders={true}
        columnAutoWidth={true}
        editing={{
          mode: "cell",
          allowUpdating: true,
        }}
      >
        <Column dataField="name" />
        <Column
          dataField="status"
          editCellTemplate={(cellElement, cellInfo) => (
            <StatusEditor value={cellInfo.value} onChange={cellInfo.setValue} />
          )}
        />
        <Editing mode="cell" />
      </DataGrid>
    );
  }
}

export default Services;
