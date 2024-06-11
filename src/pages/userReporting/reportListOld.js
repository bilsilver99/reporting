import React, { useEffect, useState, useCallback, useRef } from "react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Lookup,
  Item,
  Form,
  Selection,
  Toolbar,
  ColumnChooser,
  Export,
} from "devextreme-react/data-grid";
import { useAuth } from "../../contexts/auth";
import {
  ReportListStore,
  ReportGroupsStore,
  UpdateScript,
  GetScript,
  ExecuteScript,
  SubTableDataStore,
  ReturnOperatorInfo,
} from "./reportListData";
import { Popup, FileUploader, SelectBox, TagBox } from "devextreme-react";
import DataSource from "devextreme/data/data_source";
import Button from "devextreme-react/button";
import { exportDataGrid } from "devextreme/excel_exporter";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import "./reportList.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const allowedPageSizes = [8, 12, 20];

const ReportListx = ({ companyCode, administrator }) => {
  const { user } = useAuth();
  const [dataSource, setDataSource] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [showFilterRow, setShowFilterRow] = useState(true);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("auto");
  const [refreshKey, setRefreshKey] = useState(0);
  const [companyCodes, setCompanyCodes] = useState([]);
  const [reportGroups, setReportGroups] = useState([]);
  const [scriptResults, setScriptResults] = useState("");
  const [selectedDb, setSelectedDb] = useState(""); // Initialize as empty string
  const [selectedCompanyCode, setSelectedCompanyCode] = useState("");

  const [subTableData, setSubTableData] = useState([]); // Subtable data
  const [showChart, setShowChart] = useState(false); // State to control chart visibility
  const [xKey, setXKey] = useState("");
  const [yKeys, setYKeys] = useState([]);

  const [events, setEvents] = useState([]);
  const logEvent = useCallback((eventName) => {
    setEvents((previousEvents) => [eventName, ...previousEvents]);
  }, []);
  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  const ClearScriptResults = () => {
    setScriptResults("");
    setXKey("");
    setYKeys([]);
  };

  const [operatorInfo, setOperatorInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const operatorData = await ReturnOperatorInfo(user.uniqueid);
        setOperatorInfo(operatorData);
        setSelectedDb(operatorData.DBValue); // Set the initial value for the SelectBox here
      } catch (error) {
        console.error("Error fetching operator info: ", error);
        setOperatorInfo(null);
      }

      try {
        const data = await ReportGroupsStore();
        if (data && Array.isArray(data)) {
          setReportGroups(data);
        } else {
          setReportGroups([]);
        }
      } catch (error) {
        setReportGroups([]);
      }
    };

    fetchData();
  }, [companyCode, user.uniqueid]);

  useEffect(() => {
    const fetchCompanyCodes = async () => {
      if (operatorInfo) {
        try {
          const data = await CompanyStore(operatorInfo.OperatorID);
          if (data && Array.isArray(data)) {
            setCompanyCodes(data);
          } else {
            setCompanyCodes([]);
          }
        } catch (error) {
          console.error("Error fetching company data: ", error);
          setCompanyCodes([]);
        }
      }
    };

    if (operatorInfo) {
      fetchCompanyCodes();
    }
  }, [companyCode, administrator, operatorInfo]);

  useEffect(() => {
    if (operatorInfo) {
      const store = ReportListStore(
        companyCode,
        administrator,
        operatorInfo.OperatorID
      );
      const dataSource = new DataSource(store);
      setDataSource(dataSource);
    }
  }, [companyCode, administrator, operatorInfo]);

  const handleEditingStart = (e) => {
    setCurrentRow(e.data.UNIQUEID);
    fetchSubTableData(e.data.UNIQUEID);
  };

  const handleFileUpload = async (e) => {
    const file = e.value[0];
    if (file && currentRow !== null) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileContent = event.target.result;
        try {
          await UpdateScript(currentRow, fileContent);
          setRefreshKey((prevKey) => prevKey + 1);
        } catch (error) {
          console.error("Error updating the SCRIPT field", error);
        }
      };
      reader.readAsText(file);
    }
  };

  // const executeScript = async () => {
  //   if (currentRow !== null) {
  //     try {
  //       const scriptContent = await GetScript(currentRow);
  //       const result = await ExecuteScript(scriptContent, selectedDb);
  //       setScriptResults(result);
  //       setXKey(Object.keys(result[0] || [])[0]); // Set default X key
  //       setYKeys([Object.keys(result[0] || [])[1]]); // Set default Y keys
  //     } catch (error) {
  //       console.error("Error executing the script", error);
  //       setScriptResults([]); // Set an empty array on error
  //     }
  //   }
  //   setRefreshKey((prevKey) => prevKey + 1);
  // };

  const executeScript = async (params = {}) => {
    const { row = currentRow, db = selectedDb, refresh = true } = params;

    if (row !== null) {
      try {
        const scriptContent = await GetScript(row);
        const result = await ExecuteScript(scriptContent, db);
        setScriptResults(result);
        setXKey(Object.keys(result[0] || [])[0]); // Set default X key
        setYKeys([Object.keys(result[0] || [])[1]]); // Set default Y keys
      } catch (error) {
        console.error("Error executing the script", error);
        setScriptResults([]); // Set an empty array on error
      }
    }

    if (refresh) {
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  const exportGridToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");

    exportDataGrid({
      component: dataGridRef.current.instance,
      worksheet: worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "DataGrid.xlsx"
        );
      });
    });
  };

  const dataGridRef = useRef();

  if (!dataSource) {
    return <div>Loading...</div>;
  }

  const fetchSubTableData = async (uniqueId) => {
    try {
      const data = await SubTableDataStore(uniqueId);
      setSubTableData(data);
    } catch (error) {
      console.error("Error fetching subtable data", error);
      setSubTableData([]); // Set an empty array on error
    }
  };

  const dbItems = [
    { value: "db1", description: "CER Reporting" },
    { value: "db2", description: "Steel Live" },
    { value: "db3", description: "KineticPilot1" },
  ];

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const setCompanyCode = (e) => {
    setSelectedCompanyCode(e.value);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="content-block dx-card responsive-paddings">
      {scriptResults === "" && (
        <>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            {operatorInfo && (
              <p>
                User: {operatorInfo.Fullname} Steel User {operatorInfo.DBValue}
              </p>
            )}
            <p style={{ marginRight: "10px", marginLeft: "10px" }}>Database</p>
            <SelectBox
              items={dbItems}
              value={selectedDb}
              onValueChanged={(e) => setSelectedDb(e.value)}
              displayExpr="description"
              valueExpr="value"
              style={{ width: "150px" }} // Set the width of the SelectBox
            />
            <p style={{ marginRight: "10px", marginLeft: "30px" }}>Company</p>
            <SelectBox
              items={companyCodes}
              value={selectedCompanyCode}
              onValueChanged={setCompanyCode}
              displayExpr="COMNAME" // Ensure this matches the key in your data
              valueExpr="COMNUMBER" // Ensure this matches the key in your data
              style={{ width: "150px" }} // Set the width of the SelectBox
            />
          </div>
          <DataGrid
            dataSource={dataSource}
            keyExpr={"UNIQUEID"}
            showBorders={true}
            remoteOperations={false}
            key={refreshKey}
            onEditingStart={handleEditingStart}
          >
            <Selection mode="single" />
            <FilterRow visible={showFilterRow} applyFilter={currentFilter} />
            <HeaderFilter visible={showHeaderFilter} />
            <SearchPanel visible={true} width={240} placeholder="Search..." />
            <Paging enabled={true} />
            <Editing
              mode="popup"
              allowUpdating={true}
              allowAdding={administrator === "Y"}
              allowDeleting={administrator === "Y"}
            >
              <Popup
                title="Edit Report"
                showTitle={true}
                width={700}
                height={525}
              />
              <Form colCount={4}>
                <Item dataField="GROUPCODE" />
                <Item dataField="DESCRIPTION" />
                <Item dataField="STEEL" visible={true} dataType={"boolean"} />
                <Item></Item>
                <Item
                  colSpan={2}
                  dataField="SCRIPT"
                  editorType="dxTextArea"
                  editorOptions={{
                    height: 200,
                    stylingMode: "outlined",
                    inputAttr: {
                      style: { textAlign: "left", paddingTop: "0px" },
                      maxLength: 10000,
                    },
                  }}
                />
                <Item colSpan={2}>
                  <DataGrid
                    dataSource={subTableData}
                    keyExpr={"UniqueID"}
                    showBorders={true}
                  >
                    <Editing
                      mode="popup"
                      allowUpdating={true}
                      allowAdding={true}
                      allowDeleting={true}
                    ></Editing>
                    <Column
                      dataField="UNIQUEID"
                      caption="Uniqueid"
                      allowEditing={false}
                      visible={false}
                    />
                    <Column
                      dataField="SCRIPTFILEID"
                      caption="Script File ID"
                      allowEditing={false}
                      visible={false}
                    />
                    <Column dataField="DESCRIPTION" caption="Description" />
                    <Column dataField="FILTERVALUE" caption="Filter Value" />
                    <Column
                      dataField="FILTERDATABASEVALUE"
                      caption="Filter DB Value  "
                    />
                  </DataGrid>
                </Item>
                <Item colSpan={4}>
                  <FileUploader
                    selectButtonText="Select File"
                    labelText=""
                    accept=".sql"
                    uploadMode="useForm"
                    onValueChanged={handleFileUpload}
                  />
                </Item>
                <Item colSpan={1}>
                  <Button
                    text="Execute Script"
                    onClick={executeScript}
                    width="100%"
                    type="default"
                  />
                </Item>
              </Form>
            </Editing>
            <Column dataField="UNIQUEID" allowEditing={false} visible={false} />
            <Column dataField="GROUPCODE" caption="Group Code">
              <Lookup
                dataSource={reportGroups}
                valueExpr="GROUPCODE"
                displayExpr="DESCRIPTION"
              />
            </Column>
            <Column dataField="DESCRIPTION" caption="Description" />
            <Column dataField="STEEL" caption="Steel" dataType={"boolean"} />
            {administrator === "Y" && (
              <Column dataField="SCRIPT" caption="Script" />
            )}
            <Paging defaultPageSize={8} />
            <Pager
              showPageSizeSelector={true}
              allowedPageSizes={allowedPageSizes}
            />
          </DataGrid>
        </>
      )}

      {scriptResults && (
        <>
          <div className="button-container">
            <Button
              text="Close"
              onClick={ClearScriptResults}
              width="20%"
              type="default"
            />
            <Button
              text="Export to Excel"
              onClick={exportGridToExcel}
              width="20%"
              type="default"
            />
            <Button
              text="Show/Hide Chart"
              onClick={toggleChart}
              width="20%"
              type="default"
            />
          </div>
          {!showChart && (
            <DataGrid
              ref={dataGridRef}
              dataSource={scriptResults}
              showBorders={true}
              className="custom-header"
              allowColumnReordering={true}
              allowColumnResizing={true}
            >
              <ColumnChooser enabled={true} />
              <Toolbar>
                <Item name="columnChooserButton" />
              </Toolbar>
              <FilterRow visible={showFilterRow} applyFilter={currentFilter} />
              <HeaderFilter visible={showHeaderFilter} />
              <SearchPanel visible={true} width={240} placeholder="Search..." />
              {Object.keys(scriptResults[0] || {}).map((key) => (
                <Column key={key} dataField={key} caption={key} />
              ))}
            </DataGrid>
          )}
          {showChart && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SelectBox
                items={Object.keys(scriptResults[0] || {}).map((key) => ({
                  value: key,
                  label: key,
                }))}
                value={xKey}
                onValueChanged={(e) => setXKey(e.value)}
                placeholder="Select X Axis Key"
              />
              <TagBox
                items={Object.keys(scriptResults[0] || {}).map((key) => ({
                  value: key,
                  label: key,
                }))}
                value={yKeys}
                onValueChanged={(e) => setYKeys(e.value)}
                placeholder="Select Y Axis Keys"
                showSelectionControls={true}
                applyValueMode="useButtons"
                multiline={false}
              />
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={scriptResults}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Array.isArray(yKeys) &&
                    yKeys.map((key) => (
                      <Bar key={key} dataKey={key} fill="#8884d8" />
                    ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function ReportList() {
  const { user } = useAuth();
  return (
    <ReportListx
      companyCode={user.companynumber}
      administrator={user.administrator}
    />
  );
}

export const CompanyStore = async (OperatorID) => {
  var myClient = 1;
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      sentclientcode: myClient,
      OperatorID: OperatorID,
    }),
  };
  const url = `${process.env.REACT_APP_BASE_URL}/ReturnCompaniesList`;
  const response = await fetch(url, requestoptions);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const json = await response.json();
  console.log("Companies sql", json);
  return json.user_response.bankq;
};
