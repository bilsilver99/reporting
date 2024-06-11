import CustomStore from "devextreme/data/custom_store";
import axios from "axios";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export const ReportListStore = (myClient, administrator, OperatorID) =>
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
          console.log(
            "operator ID",
            OperatorID,
            "list of scripts: ",
            json.user_response.bankq
          );
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
  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      console.log("Companies sql", json);
      return json.user_response.bankq;
    });
};

export const ReportGroupsStore = () => {
  var myClient = 1;
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
      console.log("report groups sql", json);
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

export const SubTableDataStore = (myClient, currentRow) =>
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
        }),
      };
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
      console.log(
        "values: ",
        values,
        "myClient",
        myClient,
        "currentRow",
        currentRow
      );
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
        FullName: json.user_response.FullName,
        DBValue: json.user_response.DBValue,
        OperatorID: json.user_response.OperatorID,
      };
    });
};
