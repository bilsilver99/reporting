import React from "react";
import DataGrid, { Column, Editing, Lookup } from "devextreme-react/data-grid";

const dataSource = [
  { id: 1, name: "John", status: "Active" },
  { id: 2, name: "Jane", status: "Inactive" },
  { id: 3, name: "Bob", status: "Active" },
];

const statusOptions = [
  { id: 1, value: "Active" },
  { id: 2, value: "Inactive" },
];

const onValueChanged = (e) => {
  dataSource.value = e.value;
  console.log(e.previousValue);
  console.log(e.value);
};

class Services extends React.Component {
  render() {
    return (
      <DataGrid
        dataSource={dataSource}
        keyExpr="id"
        showBorders={true}
        columnAutoWidth={true}
      >
        <Editing mode="row" allowUpdating={true} allowAdding={true}></Editing>
        <Column dataField="name" />

        <Column dataField="status" caption="Status">
          <Lookup
            dataSource={statusOptions}
            displayExpr="value"
            valueExpr="id"
            placeholder={dataSource.status}
            onValueChanged={onValueChanged}
          />
        </Column>
      </DataGrid>
    );
  }
}

export default Services;
