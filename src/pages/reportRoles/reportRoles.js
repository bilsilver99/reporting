import React, { useEffect, useState } from "react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Popup,
  Form,
  Lookup,
} from "devextreme-react/data-grid";
import { Item, EmptyItem } from "devextreme-react/form";
import { useAuth } from "../../contexts/auth";
import {
  RoleGroups,
  ReportStore,
  ReportRolesStore,
  fetchReportGroups,
} from "./reportRolesData";

const allowedPageSizes = [8, 12, 20];

const ReportRolesx = ({ companyCode }) => {
  const [reportrolesStore, setReportrolesStore] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [showFilterRow, setShowFilterRow] = useState(true);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("auto");
  const [refreshKey, setRefreshKey] = useState(0);
  const [reportGroups, setReportGroups] = useState([]);

  const [subTableData, setSubTableData] = useState([]);
  const [currentID, setCurrentID] = useState(null);

  useEffect(() => {
    const store = ReportRolesStore(companyCode);
    setReportrolesStore(store);
    const fetchData = async () => {
      try {
        const data = await fetchReportGroups();
        if (data && Array.isArray(data)) {
          setReportGroups(data);
        } else {
          console.error("Invalid data format:", data);
          setReportGroups([]); // Ensure it's an array to avoid length errors
        }
      } catch (error) {
        console.error(
          "There was an error fetching the company group data:",
          error
        );
        setReportGroups([]); // Ensure it's an array to avoid length errors
      }
    };

    fetchData();
  }, [companyCode]);

  useEffect(() => {
    console.log("ReportGroups", reportGroups);
  }, [reportGroups]);

  const handleSelectionChanged = (e) => {
    setSelectedRowKeys(e.selectedRowKeys);
    if (e.selectedRowKeys.length > 0) {
      setCurrentRow(e.selectedRowKeys[0]); // update the current row
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  if (!reportrolesStore) {
    return <div>Loading...</div>;
  }

  const handleEditingStart = (e) => {
    setCurrentID(e.data.UNIQUEID);
    fetchSubTableData(e.data.UNIQUEID);
  };

  const fetchSubTableData = async (uniqueId) => {
    try {
      const data = await RoleGroups(uniqueId);
      setSubTableData(data);
    } catch (error) {
      console.error("Error fetching subtable data", error);
      setSubTableData([]); // Set an empty array on error
    }
  };

  const handleRowInserting = (e) => {
    console.log("current ID", currentID, "handleRowInserting", e);
    e.data.ROLEID = currentID;
  };

  return (
    <div className="content-block dx-card responsive-paddings">
      <DataGrid
        dataSource={reportrolesStore}
        showBorders={true}
        remoteOperations={false}
        key={refreshKey} // This key will force a refresh when it changes
        onSelectionChanged={handleSelectionChanged}
        width={"50%"}
        onEditingStart={handleEditingStart}
      >
        <FilterRow visible={showFilterRow} applyFilter={currentFilter} />
        <HeaderFilter visible={showHeaderFilter} />
        <SearchPanel visible={true} width={240} placeholder="Search..." />
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
            <Item itemType="group" colSpan={2} showBorders={true}>
              <Item dataField="ROLECODE" />
              <Item dataField="DESCRIPTION" />
              <EmptyItem />
            </Item>
            <EmptyItem />
            <EmptyItem />

            <Item colSpan={2}>
              <DataGrid
                dataSource={subTableData}
                keyExpr="UNIQUEID" // Use the appropriate key field for subTableData
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
                {/* <Column dataField="UNIQUEID" caption={"Unique ID"} />
                <Column dataField="FPUSERSID" caption="User ID" /> */}
                <Column dataField="GROUPID" caption="Groups">
                  <Lookup
                    dataSource={reportGroups}
                    valueExpr="UNIQUEID"
                    displayExpr="DESCRIPTION"
                  />
                </Column>
              </DataGrid>
            </Item>
          </Form>
        </Editing>

        <Column dataField="UNIQUEID" allowEditing={false} visible={false} />
        <Column dataField="ROLECODE" caption="Role Code" width={200} />
        <Column dataField="DESCRIPTION" caption="Description" />
        <Column
          dataField="ACTIVE"
          caption="Active"
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

export default function ReportRoles() {
  const { user } = useAuth();
  return <ReportRolesx companyCode={user.companyCode} />;
}
