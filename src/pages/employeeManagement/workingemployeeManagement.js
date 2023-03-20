import React, { useState } from "react";
import DataGrid, { Column, MasterDetail } from "devextreme-react/data-grid";

// Sample data
const orders = [
  {
    id: 1,
    customerName: "John Doe",
    orderDate: new Date(2022, 2, 9),
    products: [
      { name: "Product A", quantity: 2 },
      { name: "Product B", quantity: 3 },
    ],
  },
  {
    id: 2,
    customerName: "Jane Smith",
    orderDate: new Date(2022, 2, 8),
    products: [
      { name: "Product C", quantity: 1 },
      { name: "Product D", quantity: 4 },
    ],
  },
];

const EmployeeManagement = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const onExpandedRowKeysChange = (keys) => {
    setExpandedRowKeys(keys);
  };

  const renderOrderDetail = ({ data }) => {
    return (
      <div>
        <h4>Products</h4>
        <DataGrid dataSource={data.products} showBorders={true}>
          <Column dataField="name" caption="Name" />
          <Column dataField="quantity" caption="Quantity" />
        </DataGrid>
      </div>
    );
  };

  return (
    <div>
      <h2>Orders</h2>
      <DataGrid
        dataSource={orders}
        showBorders={true}
        columnAutoWidth={true}
        onRowClick={onExpandedRowKeysChange}
        onCellClick={onExpandedRowKeysChange}
        focusedRowEnabled={true}
        keyExpr="id"
        expandedRowKeys={expandedRowKeys}
      >
        <Column dataField="id" caption="ID" />
        <Column dataField="customerName" caption="Customer Name" />
        <Column
          dataField="orderDate"
          caption="Order Date"
          dataType="date"
          format="shortDate"
        />
        <MasterDetail enabled={true} render={renderOrderDetail} />
      </DataGrid>
    </div>
  );
};

export default EmployeeManagement;
