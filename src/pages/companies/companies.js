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
import { OperatorStore } from "./companiesdata";
import "./companies.scss";

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
    <div className="content-block4 dx-card responsive-paddings">
      <DataGrid
        dataSource={operatorStore}
        showBorders={true}
        remoteOperations={false}
        key={refreshKey} // This key will force a refresh when it changes
        onSelectionChanged={handleSelectionChanged}
        //onEditingStart={handleEditingStart}
        // width={"60%"}
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
        <Column
          dataField="COMPANYNUMBER"
          caption="Company Number"
          width={100}
        />
        <Column dataField="COMPANYNAME" caption="Name" />
        <Column
          dataField="ACTIVE"
          caption="Active"
          dataType={"boolean"}
          editorType="dxCheckBox"
        />
        <Column
          dataField="STEEL"
          caption="Steel"
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

// import React, { useEffect, useState } from "react";
// import DataGrid, {
//   Column,
//   Paging,
//   Pager,
//   Editing,
//   FilterRow,
//   HeaderFilter,
//   SearchPanel,
// } from "devextreme-react/data-grid";
// import { useAuth } from "../../contexts/auth";
// import { CompaniesStore } from "./companiesdata";

// const allowedPageSizes = [8, 12, 20];

// const Companiesx = ({ companyCode }) => {
//   const [companiesStore, setCompaniesStore] = useState(null);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [currentRow, setCurrentRow] = useState(0);
//   const [showFilterRow, setShowFilterRow] = useState(true);
//   const [showHeaderFilter, setShowHeaderFilter] = useState(true);
//   const [currentFilter, setCurrentFilter] = useState("auto");
//   const [refreshKey, setRefreshKey] = useState(0);

//   useEffect(() => {
//     // if (companyCode) {
//     const store = CompaniesStore(companyCode);
//     setCompaniesStore(store);
//     // }
//   }, [companyCode, refreshKey]);

//   const handleSelectionChanged = (e) => {
//     setSelectedRowKeys(e.selectedRowKeys);
//     if (e.selectedRowKeys.length > 0) {
//       setCurrentRow(e.selectedRowKeys[0]); // update the current row
//       setRefreshKey((prevKey) => prevKey + 1);
//     }
//   };

//   //   const handleEditingStart = (e) => {
//   //     console.log("Editing is starting for row", e.data);

//   //     // You can access the data of the row that is being edited
//   //     const rowToBeEdited = e.data;

//   //     // Perform any checks or logic you want here.
//   //     // For example, you might want to prevent editing if a certain condition is met:
//   //     if (rowToBeEdited.someField === "someValue") {
//   //       e.cancel = true; // Prevents the editing from starting
//   //     }
//   //   };

//   if (!CompaniesStore) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="content-block dx-card responsive-paddings">
//       <DataGrid
//         dataSource={CompaniesStore}
//         showBorders={true}
//         remoteOperations={false}
//         key={refreshKey} // This key will force a refresh when it changes
//         onSelectionChanged={handleSelectionChanged}
//         //onEditingStart={handleEditingStart}
//       >
//         <FilterRow visible={showFilterRow} applyFilter={currentFilter} />
//         <HeaderFilter visible={showHeaderFilter} />
//         <SearchPanel visible={true} width={240} placeholder="Search..." />
//         <Paging enabled={true} />
//         <Editing
//           mode="cell"
//           allowUpdating={true}
//           allowAdding={true}
//           allowDeleting={true}
//         />
//         <Column dataField="UNIQUEID" allowEditing={false} visible={false} />
//         <Column
//           dataField="COMPANYNUMBER"
//           caption="Company Number"
//           width={100}
//         />
//         <Column dataField="COMPANYNAME" caption="Name" />
//         <Column
//           dataField="ACTIVE"
//           caption="Active"
//           dataType={"boolean"}
//           editorType="dxCheckBox"
//         />
//         <Paging defaultPageSize={8} />
//         <Pager
//           showPageSizeSelector={true}
//           allowedPageSizes={allowedPageSizes}
//         />
//       </DataGrid>
//     </div>
//   );
// };

// export default function Companies() {
//   const { user } = useAuth();
//   return <Companiesx companyCode={user.companyCode} />;
// }
