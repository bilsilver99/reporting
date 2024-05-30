import React, { useState, useEffect } from "react";

//
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
  Pager,
  FilterRow,
  HeaderFilter,
  Search,
  SearchPanel,
  MasterDetail,
} from "devextreme-react/data-grid";
import { Item } from "devextreme-react/form";
import "devextreme-react/text-area";
import "devextreme/data/data_source";
import { useAuth } from "../../contexts/auth";
import "./app.scss";

import { Button } from "devextreme-react/button";
import "whatwg-fetch";

import { OperatorStore, CompanyStore } from "./operatordata";

let pageoption = 90;

//const allowedPageSizes = [8, 12, 24];

//let pageoption = 90;

function Operatorsx({ companyCode }) {
  const { user } = useAuth();

  ////////////////////////////////
  const [operatorStore, setOperatorStore] = useState(null);

  const [currentFilter, setCurrentFilter] = useState("auto");
  const [companyCodes, setCompanyCodes] = useState([]);

  /////////////////////////////////

  const [currentRow, setCurrentRow] = useState(0);
  const [filterValue, setFilterValue] = useState("90");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [myClient, setMyClientcode] = useState(user.thisClientcode);

  //const companyCode,SentCompanyCode]=useState(1)

  const [showFilterRow, setShowFilterRow] = useState(true);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  //const [currentFilter, setCurrentFilter] = useState(applyFilterTypes[0].key);

  const [currentID, setCurrentID] = useState(0);
  const [currentStock, setCurrentStock] = useState("");
  const [rowToBeEdited, setRowToBeEdited] = useState(0);
  //const [refreshKey, setRefreshKey] = useState(props.sharedValue);
  const [buildMonthly, setBuildMonthly] = useState(false);

  const handleRowUpdating = (e) => {
    const { oldData, newData } = e;
    // Update logic here, e.g., call an API to update the data
    // Refresh the DataGrid's data source if necessary
  };

  useEffect(() => {
    const fetchData = async () => {
      const store = OperatorStore(companyCode);
      setOperatorStore(store);

      try {
        const data = await CompanyStore();
        console.log("companies js", data);

        if (data && Array.isArray(data)) {
          setCompanyCodes(data);
        } else {
          console.error("Invalid data format:", data);
          setCompanyCodes([]); // Ensure it's an array to avoid length errors
        }
      } catch (error) {
        console.error(
          "There was an error fetching the company group data:",
          error
        );
        setCompanyCodes([]); // Ensure it's an array to avoid length errors
      }
    };

    fetchData();
  }, [companyCode]);

  const handleEditingStart = (e) => {
    console.log("editing start", e);
    setRowToBeEdited(e.data.UNIQUEID);
    setCurrentID(e.data.UNIQUEID);
    setCurrentStock(e.data.INVESTMENTNAME);
  };

  // const refreshData = () => {
  //   setRefreshKey((oldKey) => oldKey + 1);
  // };

  // const BuildMonthlyFlag = () => {
  //   setBuildMonthly(true);
  // };
  // const handleMappingUpdated = () => {
  //   setBuildMonthly(false);
  //   // Do something with the value, like updating the state
  // };
  return (
    <div className="content-block2 dx-card ">
      <p> </p>
      <DataGrid
        id="maindatagrid"
        dataSource={operatorStore}
        keyExpr="UNIQUEID"
        //key={refreshKey}
        showBorders={false}
        remoteOperations={false}
        width={"100%"}
        columnAutoWidth={true}
        //height={"auto"}
        onEditingStart={handleEditingStart}
        onRowUpdating={handleRowUpdating}
      >
        <HeaderFilter visible={showHeaderFilter} />
        <SearchPanel visible={false} width={240} placeholder="Search..." />
        <Paging enabled={true} />

        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup
            title="Operator Info"
            showTitle={true}
            width={"100%"}
            height={900}
          />
          <Form colCount={4}>
            <Item itemType="group" colCount={4} colSpan={2} showBorders={true}>
              <Item dataField="USERNAME" />
              <Item dataField="USERPASSWORD" />
              <Item dataField="USERFIRSTNAME" />
              <Item dataField="USERLASTNAME" />
              <Item dataField="EMAILADDRESS" />
              <Item dataField="ACTIVE" />
              <Item dataField="INTERNAL" />
              <Item dataField="ADMINISTRATOR" />
            </Item>
          </Form>
        </Editing>
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
      </DataGrid>
    </div>
  );
}

//export default ClientInvestments;

export default function Operators() {
  const { user } = useAuth();
  return <Operatorsx companyCode={user.companyCode} />;
}
