import React, { useState } from "react";
import "./App.css";
import DataGrid, { Column } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

function Services() {
  // eslint-disable-next-line
  const [data, setData] = useState([
    { id: 1, name: "John", age: 30, address: "123 king street" },
    { id: 2, name: "Bob", age: 25, address: "456 any street" },
    { id: 3, name: "Mary", age: 35, address: "666 my street" },
  ]);

  const headerCell = (cellInfo) => {
    return (
      <th style={{ fontSize: "20px", fontWeight: "bold" }}>
        {cellInfo.column.caption}
      </th>
    );
  };

  const dataCell = (cellInfo) => {
    return <td style={{ fontSize: "16px" }}>{cellInfo.value}</td>;
  };

  return (
    <div className="App">
      <DataGrid
        dataSource={data}
        keyExpr="id"
        showBorders={true}
        customizeColumns={(columns) => {
          return columns.map((col) => {
            return {
              ...col,
              headerCssClass: "dx-header-cell-custom",
              cssClass: "dx-data-cell-custom",
            };
          });
        }}
      >
        <Column
          dataField="id"
          caption="ID"
          allowEditing={false}
          headerCell={headerCell}
          cell={dataCell}
        />
        <Column
          dataField="name"
          caption="Name"
          headerCell={headerCell}
          cell={dataCell}
        />
        <Column
          dataField="age"
          caption="Age"
          headerCell={headerCell}
          cell={dataCell}
        />
        <Column
          dataField="address"
          caption="Age"
          headerCell={headerCell}
          cell={dataCell}
        />
      </DataGrid>
    </div>
  );
}

export default Services;
