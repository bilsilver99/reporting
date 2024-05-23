// src/App.js
import React, { useState } from "react";
import FileUpload from "./fileUpload";
import { TextBox, Button, SelectBox } from "devextreme-react";
import DataGrid, { Column } from "devextreme-react/data-grid";
import axios from "axios";

const Reporting = () => {
  const [sqlScript, setSqlScript] = useState("");
  const [executionResult, setExecutionResult] = useState([]);
  const [error, setError] = useState("");
  const [selectedDb, setSelectedDb] = useState("db1");

  const handleFileUpload = (content) => {
    setSqlScript(content);
  };

  const handleExecute = async () => {
    try {
      const response = await axios.post("http://localhost:5000/execute-sql", {
        db: selectedDb,
        sql: sqlScript,
      });
      setExecutionResult(response.data);
      setError("");
    } catch (error) {
      setError(`Error: ${error.message}`);
      setExecutionResult([]);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-excel",
        { db: selectedDb, sql: sqlScript },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "results.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <SelectBox
        items={["db1", "db2", "db3"]}
        value={selectedDb}
        onValueChanged={(e) => setSelectedDb(e.value)}
      />
      <FileUpload onFileUpload={handleFileUpload} />
      <TextBox
        value={sqlScript}
        onValueChanged={(e) => setSqlScript(e.value)}
        height={200}
        readOnly
      />
      <Button text="Execute SQL" onClick={handleExecute} />
      <Button text="Download Excel" onClick={handleDownloadExcel} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <h3>Execution Result:</h3>
        {executionResult.length > 0 ? (
          <DataGrid dataSource={executionResult} showBorders={true}>
            {executionResult.length > 0 &&
              Object.keys(executionResult[0]).map((key) => (
                <Column key={key} dataField={key} />
              ))}
          </DataGrid>
        ) : (
          <pre>No results to display</pre>
        )}
      </div>
    </div>
  );
};

export default Reporting;
