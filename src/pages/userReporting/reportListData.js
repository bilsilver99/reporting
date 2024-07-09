import React, { useEffect, useState } from "react";
import SelectBox from "devextreme-react/select-box";

import CustomStore from "devextreme/data/custom_store";
import axios from "axios";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export const ReportListStore = (
  myClient,
  administrator,
  OperatorID,
  reportgroupID
) =>
  new CustomStore({
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
          sentcompany: myClient,
          sentadmin: administrator,
          Parameters: params,
          OperatorID: OperatorID,
          reportgroupID: reportgroupID,
        }),
      };
      const url = `${process.env.REACT_APP_BASE_URL}/ReturnScriptList`;
      return fetch(url, requestoptions) // Request fish
        .then((response) => {
          //console.log("client " + myClient);
          if (!response.ok) {
            return {
              companyname: "System did not respond",
              returnaddress: " ",
            };
          }
          return response.json();
        })
        .then((json) => {
          // console.log(
          //   "operator ID",
          //   OperatorID,
          //   "list of scripts: ",
          //   json.user_response.bankq
          // );
          return {
            data: json.user_response.bankq,
            totalCount: json.user_response.totalCount,
            key: json.user_response.keyname,
          };
        });
    },
    insert: (values) => {
      var requestoptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;",
        },
        body: JSON.stringify({
          ThisFunction: "insert",
          keyvaluepair: values,
          sentcompany: myClient,
        }),
      };
      const url = `${process.env.REACT_APP_BASE_URL}/UpdateScriptList`;
      return fetch(url, requestoptions) // Request fish
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
      //console.log(key);
      //console.log(values);
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
      const url = `${process.env.REACT_APP_BASE_URL}/UpdateScriptList`;
      return fetch(url, requestoptions) // Request fish
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
      //console.log("key: ", key);
      //console.log("values: ", values);
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
      const url = `${process.env.REACT_APP_BASE_URL}/UpdateScriptList`;
      return fetch(url, requestoptions) // Request fish
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

export const CompanyStore = (OperatorID) => {
  var myClient = 0;
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      sentclientcode: OperatorID,
      // OperatorID: OperatorID,
    }),
  };
  const url = `${process.env.REACT_APP_BASE_URL}/ReturnCompaniesList`;
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      console.log("operator: ", OperatorID, "Companies sql", json);
      return json.user_response.bankq;
    });
};

export const ReportGroupsStore = (myClient) => {
  //var myClient = 1;
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      sentclientcode: myClient,
    }),
  };
  const url = `${process.env.REACT_APP_BASE_URL}/ReturnReportgroups`;
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      console.log("client ID", myClient, "report groups sql", json);
      return json.user_response.bankq;
    });
};

export const UpdateScript = (key, values) => {
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      uniqueid: key,
      value: values,
    }),
  };
  //console.log("values: ", values);
  const url = `${process.env.REACT_APP_BASE_URL}/UpdateScriptField`;
  return fetch(url, requestoptions) // Request fish
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
};

export const GetScript = (key) => {
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      uniqueid: key,
    }),
  };
  const url = `${process.env.REACT_APP_BASE_URL}/GetScriptRecord`;
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      //console.log("script sql", json.user_response.bankq.SCRIPT);
      return json.user_response.bankq.SCRIPT;
    });
};

export const ExecuteScript = async (script, db) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/execute-sql",
      {
        db, // Pass the selected database
        sql: script,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity, // Ensure no limit on body length
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error executing the script", error);
    throw error;
  }
};

export const SubTableDataStore = (myClient, currentRow, selectedCompanyCode) =>
  new CustomStore({
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
          SentID: myClient,
          Parameters: params,
          selectedCompanyCode: selectedCompanyCode,
        }),
      };
      console.log("selectedCompanyCode", selectedCompanyCode);
      const url = `${process.env.REACT_APP_BASE_URL}/ReturnScriptFilterList`;
      return fetch(url, requestoptions) // Request fish
        .then((response) => {
          //console.log("client " + myClient);
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
      // console.log(
      //   "values: ",
      //   values,
      //   "myClient",
      //   myClient,
      //   "currentRow",
      //   currentRow
      // );
      var requestoptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;",
        },
        body: JSON.stringify({
          ThisFunction: "insert",
          keyvaluepair: values,
          sentcompany: myClient,
          currentRow: currentRow,
        }),
      };
      const url = `${process.env.REACT_APP_BASE_URL}/UpdateScriptFilterList`;
      return fetch(url, requestoptions) // Request fish
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
      //console.log(key);
      //console.log(values);
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
      return fetch(url, requestoptions) // Request fish
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
      //("key: ", key);
      //console.log("values: ", values);
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
      return fetch(url, requestoptions) // Request fish
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

export const ReturnOperatorInfo = (myClient) => {
  //var myClient = 1;
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      sentclientcode: myClient,
    }),
  };
  const url = `${process.env.REACT_APP_BASE_URL}/ReturnOperatorInfo`;
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      //console.log("Companies sql", json);
      return {
        CompanyNumber: json.user_response.CompanyNumber,
        UserName: json.user_response.UserName,
        UserPassword: json.user_response.UserPassword,
        UserFirstName: json.user_response.UserFirstName,
        UserLastName: json.user_response.UserLastName,
        EmailAddress: json.user_response.EmailAddress,
        Active: json.user_response.Active,
        Steel: json.user_response.Steel,
        Administrator: json.user_response.Administrator,
        DBID: json.user_response.DBID,
        FullName: json.user_response.Fullname,
        DBValue: json.user_response.DBValue,
        OperatorID: json.user_response.OperatorID,
      };
    });
};

export const ReturnParams = (myClient, selectedCompanyCode) => {
  //var myClient = 1;
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      SentID: myClient,
      selectedCompanyCode: selectedCompanyCode,
    }),
  };
  console.log("selectedCompanyCode", selectedCompanyCode);
  const url = `${process.env.REACT_APP_BASE_URL}/ReturnScriptFilterList`;
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      //console.log("report groups sql", json);
      return json.user_response.bankq;
    });
};

export const fetchDropdownData = async (
  selectedCompanyCode,
  tableName,
  fieldName
) => {
  //var myClient = 1;
  var requestoptions = {
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
  console.log("selectedCompanyCode", selectedCompanyCode);
  const url = `${process.env.REACT_APP_BASE_URL}/ReturnDropDownList`;
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      console.log("drop down", json);
      return json.user_response.bankq;
    });
};

export const updatethisline = async (uniqueid, newvalue) => {
  if (newvalue === undefined) return; // Do nothing if the value is undefined or
  //var myClient = 1;
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      uniqueid: uniqueid,
      newvalue: newvalue,
    }),
  };
  console.log("updating ", uniqueid, "value", newvalue);
  const url = `${process.env.REACT_APP_BASE_URL}/updatethisline`;
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      // console.log("drop down", json);
      return json.user_response.bankq;
    });
};

export const ReturnOperatorGroupList = async (operatorID) => {
  //var myClient = 1;
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      OperatorID: operatorID,
    }),
  };
  console.log("operatorid ", operatorID);
  const url = `${process.env.REACT_APP_BASE_URL}/ReturnOperatorGroupList`;
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      console.log("drop down", json);
      return json.user_response.bankq;
    });
};

//////////////////////////////////

// export const CustomCellComponent = ({
//   value,
//   data,
//   setValue,
//   selectedCompanyCode,
// }) => {
//   const [dropdownData, setDropdownData] = useState([]);

//   useEffect(() => {
//     const fetchDropdownData = async (fileString) => {
//       if (!fileString) return [];

//       const tableName = fileString.split(".")[0];
//       const fieldName = fileString.split(".")[1];

//       // Replace this with actual data fetching logic
//       console.log("fetching data", tableName, fieldName);
//       const response = await fetchDropdownData(tableName, fieldName);
//       const data = await response.json();
//       return data;
//     };

//     if (data.FILESTRING) {
//       fetchDropdownData(data.FILESTRING).then((fetchedData) => {
//         setDropdownData(fetchedData);
//       });
//     }
//   }, [data.FILESTRING]);

//   return (
//     <div>
//       {data.FILESTRING ? (
//         <SelectBox
//           dataSource={dropdownData}
//           value={value}
//           displayExpr="name"
//           valueExpr="value"
//           onValueChanged={(e) => setValue(e.value)}
//         />
//       ) : (
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />
//       )}
//     </div>
//   );
// };
