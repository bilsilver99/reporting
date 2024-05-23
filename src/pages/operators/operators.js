import React, { useEffect, useState } from "react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { useAuth } from "../../contexts/auth";
import { OperatorStore } from "./operatordata";

const allowedPageSizes = [8, 12, 20];

const Operatorsx = ({ companyCode }) => {
  const [operatorStore, setOperatorStore] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [showFilterRow, setShowFilterRow] = useState(true);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("auto");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // if (companyCode) {
    const store = OperatorStore(companyCode);
    setOperatorStore(store);
    // }
  }, [companyCode, refreshKey]);

  const handleSelectionChanged = (e) => {
    setSelectedRowKeys(e.selectedRowKeys);
    if (e.selectedRowKeys.length > 0) {
      setCurrentRow(e.selectedRowKeys[0]); // update the current row
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  //   const handleEditingStart = (e) => {
  //     console.log("Editing is starting for row", e.data);

  //     // You can access the data of the row that is being edited
  //     const rowToBeEdited = e.data;

  //     // Perform any checks or logic you want here.
  //     // For example, you might want to prevent editing if a certain condition is met:
  //     if (rowToBeEdited.someField === "someValue") {
  //       e.cancel = true; // Prevents the editing from starting
  //     }
  //   };

  if (!operatorStore) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-block dx-card responsive-paddings">
      <DataGrid
        dataSource={operatorStore}
        showBorders={true}
        remoteOperations={false}
        key={refreshKey} // This key will force a refresh when it changes
        onSelectionChanged={handleSelectionChanged}
        //onEditingStart={handleEditingStart}
      >
        <FilterRow visible={showFilterRow} applyFilter={currentFilter} />
        <HeaderFilter visible={showHeaderFilter} />
        <SearchPanel visible={true} width={240} placeholder="Search..." />
        <Paging enabled={true} />
        <Editing
          mode="cell"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />
        <Column dataField="UNIQUEID" allowEditing={false} visible={false} />
        <Column dataField="USERNAME" caption="Username" />
        <Column dataField="USERPASSWORD" caption="Password" />
        <Column dataField="USERFIRSTNAME" caption="First Name" />
        <Column dataField="USERLASTNAME" caption="Last Name" />
        <Column dataField="EMAILADDRESS" caption="Email" />
        <Column
          dataField="ACTIVE"
          caption="Active"
          dataType={"boolean"}
          editorType="dxCheckBox"
        />
        <Column
          dataField="INTERNAL"
          caption="Internal"
          dataType={"boolean"}
          editorType="dxCheckBox"
        />
        <Column
          dataField="ADMINISTRATOR"
          caption="Administrator"
          dataType={"boolean"}
          editorType="dxCheckBox"
        />
        <Paging defaultPageSize={8} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={allowedPageSizes}
        />
      </DataGrid>
    </div>
  );
};

export default function Operators() {
  const { user } = useAuth();
  return <Operatorsx companyCode={user.companyCode} />;
}
