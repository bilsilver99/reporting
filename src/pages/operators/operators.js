import React, { useState, useEffect } from "react";
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { Item, EmptyItem } from "devextreme-react/form";
import "devextreme-react/text-area";
import "devextreme/data/data_source";
import { useAuth } from "../../contexts/auth";
import "./app.scss";
import {
  OperatorStore,
  CompanyStore,
  CompanyOperators,
  DatabaseNames,
} from "./operatordata";

function Operatorsx({ companyCode }) {
  const { user } = useAuth();
  const [operatorStore, setOperatorStore] = useState(null);
  const [companyCodes, setCompanyCodes] = useState([]);
  const [subTableData, setSubTableData] = useState([]);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  const [currentID, setCurrentID] = useState(null);
  const [databasenames, setdatabasenames] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const store = OperatorStore(companyCode);
      setOperatorStore(store);

      try {
        const data = await CompanyStore();
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

      try {
        const data = await DatabaseNames();
        if (data && Array.isArray(data)) {
          setdatabasenames(data);
        } else {
          console.error("Invalid data format:", data);
          setdatabasenames([]); // Ensure it's an array to avoid length errors
        }
      } catch (error) {
        console.error(
          "There was an error fetching the Database group data:",
          error
        );
        setdatabasenames([]); // Ensure it's an array to avoid length errors
      }
    };

    fetchData();
  }, [companyCode]);

  const handleEditingStart = (e) => {
    setCurrentID(e.data.UNIQUEID);
    fetchSubTableData(e.data.UNIQUEID);
  };

  const fetchSubTableData = async (uniqueId) => {
    try {
      const data = await CompanyOperators(uniqueId);
      setSubTableData(data);
    } catch (error) {
      console.error("Error fetching subtable data", error);
      setSubTableData([]); // Set an empty array on error
    }
  };

  const handleRowUpdating = (e) => {
    const { oldData, newData } = e;
    // Update logic here, e.g., call an API to update the data
    // Refresh the DataGrid's data source if necessary
  };

  const handleRowInserting = (e) => {
    console.log("current ID", currentID, "handleRowInserting", e);
    e.data.FPUSERSID = currentID;
  };

  useEffect(() => {
    console.log("companyCodes", companyCodes);
  }, [companyCodes]);

  return (
    <div className="content-block dx-card responsive-paddings">
      <DataGrid
        id="maindatagrid"
        dataSource={operatorStore}
        keyExpr="UNIQUEID"
        showBorders={false}
        remoteOperations={false}
        width={"100%"}
        columnAutoWidth={true}
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
            width={"60%"}
            height={700}
          />
          <Form colCount={4}>
            <Item itemType="group" colCount={3} colSpan={4} showBorders={true}>
              <Item dataField="USERNAME" />
              <Item dataField="USERPASSWORD" />
              <EmptyItem />
              <Item dataField="USERFIRSTNAME" />
              <Item dataField="USERLASTNAME" />
              <EmptyItem />
              <Item dataField="EMAILADDRESS" />
              <Item dataField="DBID" />
            </Item>
            <Item itemType="group" colCount={3} colSpan={1} showBorders={true}>
              <Item dataField="ADMINISTRATOR" />
              <Item dataField="STEEL" />
              {/* <Item dataField="INTERNAL" /> */}
            </Item>
            <EmptyItem />
            <EmptyItem />

            <EmptyItem />
            <Item colSpan={2}>
              <DataGrid
                dataSource={subTableData}
                keyExpr="FPUSERSID" // Use the appropriate key field for subTableData
                showBorders={true}
                onRowInserting={handleRowInserting}
                allowAdding={true}
                allowUpdating={true}
                allowDeleting={true}
              >
                <Editing
                  mode="cell"
                  allowUpdating={true}
                  allowAdding={true}
                  allowDeleting={true}
                />
                {/* <Column dataField="UNIQUEID" visible={false} />
                <Column dataField="FPUSERSID" caption="User ID" /> */}
                <Column dataField="COMPANIESID" caption="Company">
                  <Lookup
                    dataSource={companyCodes}
                    valueExpr="UNIQUEID"
                    displayExpr="COMNAME"
                  />
                </Column>
              </DataGrid>
            </Item>
          </Form>
        </Editing>
        <Column dataField="USERNAME" caption="Username" />
        <Column dataField="USERPASSWORD" caption="Password" />
        <Column dataField="USERFIRSTNAME" caption="First Name" />
        <Column dataField="USERLASTNAME" caption="Last Name" />
        <Column dataField="EMAILADDRESS" caption="Email" />
        <Column dataField="DBID" caption="Database ID">
          <Lookup
            dataSource={databasenames}
            valueExpr="UNIQUEID"
            displayExpr="DESCRIPTION"
          />
        </Column>
        <Column dataField="ACTIVE" caption="Active" dataType={"boolean"} />
        <Column dataField="STEEL" caption="Steel" dataType={"boolean"} />
        <Column
          dataField="ADMINISTRATOR"
          caption="Administrator"
          dataType={"boolean"}
        />
      </DataGrid>
    </div>
  );
}

export default function Operators() {
  const { user } = useAuth();
  return <Operatorsx companyCode={user.companyCode} />;
}
