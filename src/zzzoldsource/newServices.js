import React from "react";
import DataGrid from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";

const data = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Bob Johnson", age: 45 },
];

const columns = [
  { dataField: "id", caption: "ID" },
  { dataField: "name", caption: "Name" },
  { dataField: "age", caption: "Age" },
];

const cellStyle = {
  fontSize: "16px",
};

const Services = () => {
  const cellRender = (data) => {
    return <div style={cellStyle}>{data.value}</div>;
  };

  return (
    <div className="custom-container">
      <DataGrid
        dataSource={data}
        columns={columns}
        rowAlternationEnabled={true}
        cellRender={cellRender}
      />
    </div>
  );
};

export default Services;
