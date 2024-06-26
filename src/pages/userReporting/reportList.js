import React, { useEffect, useState, useCallback, useRef } from "react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Item,
  Form,
  Selection,
  Toolbar,
  ColumnChooser,
  Export,
} from "devextreme-react/data-grid";
import { EmptyItem, SimpleItem } from "devextreme-react/form";
import { useAuth } from "../../contexts/auth";
import {
  ReportListStore,
  ReportGroupsStore,
  UpdateScript,
  GetScript,
  ExecuteScript,
  SubTableDataStore,
  ReturnOperatorInfo,
  ReturnParams,
  CompanyStore,
  updatethisline,
} from "./reportListData";
import { Popup, SelectBox, TagBox } from "devextreme-react";
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
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Loading from "react-loading"; // Import the spinner component

const allowedPageSizes = [8, 12, 20];

const fetchDropdownData = async (selectedCompanyCode, tableName, fieldName) => {
  const requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      tableName: tableName,
      fieldName: fieldName,
      selectedCompanyCode: selectedCompanyCode,
    }),
  };
  const url = `${process.env.REACT_APP_BASE_URL}/ReturnDropDownList`;
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => json.user_response.bankq)
    .catch((error) => {
      console.error("Error fetching dropdown data:", error);
      return [];
    });
};

const CellTemplate = ({ value, data, selectedCompanyCode }) => {
  const { setValue } = useFormContext();
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(value);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fileString = data.data.FILESTRING;
      if (fileString) {
        const [tableName, fieldName] = fileString.split(".");
        try {
          const fetchedData = await fetchDropdownData(
            selectedCompanyCode,
            tableName,
            fieldName
          );
          setDropdownData(fetchedData);
        } catch (error) {
          console.error("Error fetching dropdown data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [data.data.FILESTRING, selectedCompanyCode]);

  const handleValueChange = (newValue) => {
    if (newValue === undefined || newValue === null) {
      return;
    }
    data.data.FILESTRINGVALUE = newValue;
    updatethisline(data.data.UNIQUEID, newValue);
    setValue("FILESTRINGVALUE", newValue);
    setSelectedValue(newValue);
  };

  if (!data.data.FILESTRING) {
    return null;
  }

  return (
    <div>
      {loading ? (
        <Loading type="spin" color="#000" height={20} width={20} />
      ) : (
        <SelectBox
          dataSource={dropdownData}
          value={selectedValue}
          displayExpr="CODE"
          valueExpr="CODE"
          searchEnabled={true}
          onValueChanged={(e) => handleValueChange(e.value)}
        />
      )}
    </div>
  );
};

const CustomCellComponent = ({ data, value }) => {
  return data.data.FILESTRING === "" ? (
    <input type="text" value={value} readOnly />
  ) : (
    <span></span>
  );
};

const ReportListx = ({ companyCode, administrator }) => {
  const { user } = useAuth();
  const methods = useForm();
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
  const [selectedDb, setSelectedDb] = useState("");
  const [selectedCompanyCode, setSelectedCompanyCode] = useState("");
  const [subTableData, setSubTableData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [xKey, setXKey] = useState("");
  const [yKeys, setYKeys] = useState([]);
  const [parameters, setParameters] = useState({});
  const [events, setEvents] = useState([]);
  const [operatorID, setOperatorID] = useState(0);

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

  const fetchOperatorInfo = useCallback(async () => {
    try {
      const operatorData = await ReturnOperatorInfo(user.uniqueid);
      setOperatorInfo(operatorData);
      setOperatorID(operatorData.OperatorID);
      setSelectedDb(operatorData.DBValue);
    } catch (error) {
      console.error("Error fetching operator info: ", error);
      setOperatorInfo(null);
    }
  }, [user.uniqueid]);

  const fetchReportGroups = useCallback(async (operatorID) => {
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
  }, []);

  const fetchCompanyCodes = useCallback(async (operatorID) => {
    try {
      const data = await CompanyStore(operatorID);
      if (data && Array.isArray(data)) {
        setCompanyCodes(data);
      } else {
        setCompanyCodes([]);
      }
    } catch (error) {
      setCompanyCodes([]);
    }
  }, []);

  useEffect(() => {
    fetchOperatorInfo();
  }, [fetchOperatorInfo]);

  useEffect(() => {
    if (operatorID) {
      fetchReportGroups(operatorID);
      fetchCompanyCodes(operatorID);
    }
  }, [operatorID, fetchReportGroups, fetchCompanyCodes]);

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

  const handleParametersUpload = async (e) => {
    const file = e.value[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        try {
          const parameters = JSON.parse(fileContent);
          setScriptParameters(parameters);
        } catch (error) {
          console.error("Error parsing parameters file", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const [scriptParameters, setScriptParameters] = useState({});

  const executeScript = async (params = {}) => {
    const { row = currentRow, db = selectedDb, refresh = true } = params;
    if (row !== null) {
      try {
        const scriptContent = await GetScript(row);
        const updatedScript = await injectParameters(
          scriptContent,
          scriptParameters,
          row
        );
        const result = await ExecuteScript(updatedScript, db);
        setScriptResults(result);
        setXKey(Object.keys(result[0] || [])[0]);
        setYKeys([Object.keys(result[0] || [])[1]]);
      } catch (error) {
        console.error("Error executing the script", error);
        setScriptResults([]);
      }
    }
    if (refresh) {
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  const injectParameters = async (script, parameters, row) => {
    try {
      const data = await ReturnParams(row);
      if (data && Array.isArray(data)) {
        const processedParams = {};
        data.forEach((param) => {
          const type = param.FILTERTYPE.trim();
          const key = param.FILTERVALUE.trim();
          const value = param.FILTERDATABASEVALUE.trim();
          processedParams[key] = { value, type };
        });
        parameters = { ...parameters, ...processedParams };
      } else {
        parameters = {};
      }
    } catch (error) {
      parameters = {};
    }

    let updatedScript = script;

    Object.keys(parameters).forEach((key) => {
      const trimmedKey = key.trim();
      const regex = new RegExp(`${trimmedKey}`, "g");
      const { value, type } = parameters[trimmedKey];

      if (updatedScript.match(regex)) {
        updatedScript = updatedScript.replace(
          regex,
          type === "value" ? value : `'${value}'`
        );
      }
    });

    return updatedScript;
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
      const data = await SubTableDataStore(
        uniqueId,
        currentRow,
        selectedCompanyCode
      );
      setSubTableData(data);
    } catch (error) {
      setSubTableData([]);
    }
  };

  const dbItems = [
    { value: "db1", description: "CER Reporting" },
    { value: "db2", description: "Steel Live" },
    { value: "db3", description: "KineticPilot1" },
  ];

  const toggleChart = () => {
    const items = Object.keys(scriptResults[0] || {}).map((key) => ({
      value: key,
      label: key,
    }));
    console.log("items in chart header", items);

    setShowChart(!showChart);
  };

  const setCompanyCode = (e) => {
    setSelectedCompanyCode(e.value);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <FormProvider {...methods}>
      <div className="content-block dx-card responsive-paddings">
        {scriptResults === "" && (
          <>
            <div className="form-row">
              <p>Company</p>
              <SelectBox
                items={companyCodes}
                value={selectedCompanyCode}
                onValueChanged={setCompanyCode}
                displayExpr="COMNAME"
                valueExpr="COMNUMBER"
                className="select-box"
              />
            </div>
            {selectedCompanyCode && (
              <DataGrid
                dataSource={dataSource}
                keyExpr={"UNIQUEID"}
                showBorders={true}
                remoteOperations={false}
                key={refreshKey}
                onEditingStart={handleEditingStart}
                width={"50%"}
              >
                <Selection mode="single" />
                <FilterRow
                  visible={showFilterRow}
                  applyFilter={currentFilter}
                />
                <HeaderFilter visible={showHeaderFilter} />
                <SearchPanel
                  visible={true}
                  width={240}
                  placeholder="Search..."
                />
                <Paging enabled={true} />
                <Editing
                  mode="popup"
                  allowUpdating={true}
                  allowAdding={false}
                  allowDeleting={false}
                >
                  <Popup
                    title="Edit Report"
                    showTitle={true}
                    width={900}
                    height={525}
                  />
                  <Form colCount={4}>
                    <Item dataField="GROUPCODE" />
                    <Item dataField="DESCRIPTION" />
                    <Item
                      dataField="STEEL"
                      visible={true}
                      dataType={"boolean"}
                    />
                    <Item></Item>
                    <Item colSpan={4}>
                      <DataGrid
                        dataSource={subTableData}
                        keyExpr={"UniqueID"}
                        showBorders={true}
                      >
                        <Editing
                          mode="cell"
                          allowUpdating={true}
                          allowAdding={false}
                          allowDeleting={false}
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

                        <Column
                          dataField="FILTERDATABASEVALUE"
                          caption="Value"
                          editCellComponent={(cellProps) => (
                            <CustomCellComponent
                              data={cellProps.data}
                              value={cellProps.value}
                            />
                          )}
                        />

                        <Column
                          dataField="FILESTRINGVALUE"
                          caption="Selected Value"
                          value={"FILESTRINGVALUE"}
                          editCellComponent={(cellProps) => {
                            return cellProps.data.FILESTRING !== "" ? (
                              <CellTemplate
                                value={cellProps.value}
                                data={cellProps.data}
                                selectedCompanyCode={selectedCompanyCode}
                              />
                            ) : null;
                          }}
                        />
                      </DataGrid>
                    </Item>
                    <EmptyItem colSpan={2} />
                    <Item colSpan={1}>
                      <Button
                        text="Run"
                        onClick={executeScript}
                        width="100%"
                        type="default"
                      />
                    </Item>
                  </Form>
                </Editing>
                <Column
                  dataField="UNIQUEID"
                  allowEditing={false}
                  visible={false}
                />
                <Column
                  dataField="GROUPCODE"
                  caption="Group Code"
                  allowEditing={false}
                ></Column>
                <Column
                  dataField="DESCRIPTION"
                  caption="Description"
                  allowEditing={false}
                />
                <Paging defaultPageSize={8} />
                <Pager
                  showPageSizeSelector={true}
                  allowedPageSizes={allowedPageSizes}
                />
              </DataGrid>
            )}
          </>
        )}

        {scriptResults && (
          <div>
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
                <FilterRow
                  visible={showFilterRow}
                  applyFilter={currentFilter}
                />
                <HeaderFilter visible={showHeaderFilter} />
                <SearchPanel
                  visible={true}
                  width={240}
                  placeholder="Search..."
                />
                {Object.keys(scriptResults[0] || {}).map((key) => (
                  <Column key={key} dataField={key} caption={key} />
                ))}
              </DataGrid>
            )}
            {showChart && (
              <div className="chart-container">
                <SelectBox
                  items={Object.keys(scriptResults[0] || {}).map((key) => ({
                    value: key,
                    label: key,
                  }))}
                  value={xKey}
                  onValueChanged={(e) => setXKey(e.value)}
                  //placeholder="Select X Axis Key"
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
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default function ReportList() {
  const { user } = useAuth();
  return <ReportListx companyCode={user.companynumber} administrator="N" />;
}
