import React, { useEffect, useState, useCallback } from "react";
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
  CompanyStore,
  ReportGroupsStore,
  UpdateScript,
  GetScript,
  ExecuteScript,
  SubTableDataStore,
} from "./reportListData";
import { Popup, FileUploader } from "devextreme-react";
import { SelectBox, TagBox } from "devextreme-react";
import DataSource from "devextreme/data/data_source";
import Button from "devextreme-react/button";
import { exportDataGrid } from "devextreme/excel_exporter";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import "./reportList.css"; // Make sure to import your CSS file
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

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

const allowedPageSizes = [8, 12, 20];

const ReportListx = ({ companyCode }) => {
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
  const [selectedDb, setSelectedDb] = useState("db3");

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

  useEffect(() => {
    const fetchData = async () => {
      const store = ReportListStore(companyCode);
      const dataSource = new DataSource(store);
      setDataSource(dataSource);

      try {
        const data = await CompanyStore();
        if (data && Array.isArray(data)) {
          setCompanyCodes(data);
        } else {
          setCompanyCodes([]);
        }
      } catch (error) {
        setCompanyCodes([]);
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
  }, [companyCode]);

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
          // console.log(
          //   "Updating the SCRIPT field",
          //   fileContent.length,
          //   fileContent
          // );
          await UpdateScript(currentRow, fileContent);
          setRefreshKey((prevKey) => prevKey + 1);
        } catch (error) {
          console.error("Error updating the SCRIPT field", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const executeScript = async () => {
    if (currentRow !== null) {
      try {
        const scriptContent = await GetScript(currentRow);
        const result = await ExecuteScript(scriptContent, selectedDb);
        setScriptResults(result);
        setXKey(Object.keys(result[0] || [])[0]); // Set default X key
        setYKeys([Object.keys(result[0] || [])[1]]); // Set default Y keys
      } catch (error) {
        console.error("Error executing the script", error);
        setScriptResults([]); // Set an empty array on error
      }
    }
    setRefreshKey((prevKey) => prevKey + 1);
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

  const dataGridRef = React.useRef();

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
    { value: "db1", description: "Reporting DB" },
    { value: "db2", description: "Steel 057" },
    { value: "db3", description: "KineticPilot1" },
  ];

  const subTableStore = (parentId) =>
    new DataSource({
      key: "UNIQUEID",
      load: (loadOptions) => {
        let params = "?";
        [
          "skip",
          "take",
          "requireTotalCount",
          "requireGroupCount",
          "sort",
          "filter",
          "totalSummary",
          "group",
          "groupSummary",
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params += `${i}=${JSON.stringify(loadOptions[i])}&`;
          }
        });

        params = params.slice(0, -1);
        var requestoptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json;",
          },
          body: JSON.stringify({
            SentID: parentId,
            Parameters: params,
          }),
        };
        const url = `${process.env.REACT_APP_BASE_URL}/ReturnScriptFilterList`;
        return fetch(url, requestoptions)
          .then((response) => {
            if (!response.ok) {
              return {
                companyname: "System did not respond",
                returnaddress: " ",
              };
            }
            return response.json();
          })
          .then((json) => {
            //console.log("types: ", json.user_response.bankq);
            return {
              data: json.user_response.bankq,
              totalCount: json.user_response.totalCount,
              key: json.user_response.keyname,
            };
          });
      },
      insert: (values) => {
        //console.log("values: ", values, "parentId", parentId);
        var requestoptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json;",
          },
          body: JSON.stringify({
            ThisFunction: "insert",
            keyvaluepair: values,
            sentcompany: parentId,
          }),
        };
        const url = `${process.env.REACT_APP_BASE_URL}/UpdateScriptFilterList`;
        return fetch(url, requestoptions)
          .then((response) => {
            if (!response.ok) {
              return {
                companyname: "System did not respond",
                returnaddress: " ",
              };
            }
            return response.json();
          })
          .then((json) => {
            return {};
          });
      },
      remove: (key) => {
        var requestoptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json;",
          },
          body: JSON.stringify({
            sentcompany: key,
            ThisFunction: "delete",
          }),
        };
        const url = `${process.env.REACT_APP_BASE_URL}/UpdateScriptFilterList`;
        return fetch(url, requestoptions)
          .then((response) => {
            if (!response.ok) {
              return {
                companyname: "System did not respond",
                returnaddress: " ",
              };
            }
            return response.json();
          })
          .then((json) => {
            return {};
          });
      },
      update: (key, values) => {
        // console.log("key: ", key);
        // console.log("values: ", values);
        var requestoptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json;",
          },
          body: JSON.stringify({
            ThisFunction: "change",
            sentcompany: key,
            keyvaluepair: values,
          }),
        };
        const url = `${process.env.REACT_APP_BASE_URL}/UpdateScriptFilterList`;
        return fetch(url, requestoptions)
          .then((response) => {
            if (!response.ok) {
              return {
                companyname: "System did not respond",
                returnaddress: " ",
              };
            }
            return response.json();
          })
          .then((json) => {
            return {};
          });
      },
    });

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="content-block dx-card responsive-paddings">
      {scriptResults === "" && (
        <>
          <SelectBox
            items={dbItems}
            value={selectedDb}
            onValueChanged={(e) => setSelectedDb(e.value)}
            displayExpr="description"
            valueExpr="value"
          />
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
              allowAdding={true}
              allowDeleting={true}
            >
              <Popup
                title="Edit Report"
                showTitle={true}
                width={700}
                height={525}
              />
              <Form colCount={2}>
                <Item dataField="COMPANYNUMBER" />
                <Item dataField="GROUPCODE" />
                <Item dataField="DESCRIPTION" colSpan={2} />
                <Item
                  dataField="SCRIPT"
                  editorType="dxTextArea"
                  colSpan={1}
                  editorOptions={{
                    height: 200,
                    stylingMode: "outlined",
                    inputAttr: {
                      style: { textAlign: "left", paddingTop: "0px" },
                      maxLength: 10000, // Increase maxLength
                    },
                  }}
                />
                <Item colSpan={1}>
                  <DataGrid
                    dataSource={subTableData}
                    keyExpr={"UniqueID"} // Change this to your actual key field
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
                <Item colSpan={2}>
                  <FileUploader
                    selectButtonText="Select File"
                    labelText=""
                    accept=".sql"
                    uploadMode="useForm"
                    onValueChanged={handleFileUpload}
                  />
                </Item>
                <Item colSpan={2}>
                  <Button
                    text="Execute Script"
                    onClick={executeScript}
                    width="100%"
                    type="default"
                  />
                </Item>
                <Item dataField="ACTIVE" colSpan={2} />
              </Form>
            </Editing>
            <Column dataField="UNIQUEID" allowEditing={false} visible={false} />
            <Column
              dataField="COMPANYNUMBER"
              caption="Company"
              allowEditing={true}
            >
              <Lookup
                dataSource={companyCodes}
                valueExpr="COMNUMBER"
                displayExpr="COMNAME"
              />
            </Column>
            <Column dataField="GROUPCODE" caption="Group Code">
              <Lookup
                dataSource={reportGroups}
                valueExpr="GROUPCODE"
                displayExpr="DESCRIPTION"
              />
            </Column>
            <Column dataField="DESCRIPTION" caption="Description" />
            <Column dataField="SCRIPT" caption="Script" />
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
        </>
      )}

      {scriptResults && (
        <>
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
          </>
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
  return <ReportListx companyCode={user.companyCode} />;
}
