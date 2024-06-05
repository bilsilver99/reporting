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
import { DatabaseNamesStore } from "./databaseNamesData";

const allowedPageSizes = [8, 12, 20];

const DatabaseNamesx = ({ companyCode }) => {
  const [databaseNamesStore, setdatabaseNamesStore] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [showFilterRow, setShowFilterRow] = useState(true);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("auto");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // if (companyCode) {
    const store = DatabaseNamesStore(companyCode);
    setdatabaseNamesStore(store);
    // }
  }, [companyCode, refreshKey]);

  const handleSelectionChanged = (e) => {
    setSelectedRowKeys(e.selectedRowKeys);
    if (e.selectedRowKeys.length > 0) {
      setCurrentRow(e.selectedRowKeys[0]); // update the current row
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  if (!databaseNamesStore) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-block dx-card responsive-paddings">
      <DataGrid
        dataSource={databaseNamesStore}
        showBorders={true}
        remoteOperations={false}
        //key={refreshKey} // This key will force a refresh when it changes
        keyExpr="UNIQUEID"
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
        <Column dataField="VALUE" caption="DDB Selector" />
        <Column dataField="DBNAME" caption="Database Name" />
        <Column dataField="DESCRIPTION" caption="Description" />
        <Column dataField="USERNAME" caption="User Name" />
        <Column dataField="PASSWORD" caption="Password" />
        <Column dataField="SERVERNAME" caption="Server Name" />
        <Paging defaultPageSize={8} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={allowedPageSizes}
        />
      </DataGrid>
    </div>
  );
};

export default function DatabaseNames() {
  const { user } = useAuth();
  return <DatabaseNamesx companyCode={user.companyCode} />;
}
