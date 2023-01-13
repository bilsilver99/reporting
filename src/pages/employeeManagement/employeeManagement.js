import React from "react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Form,
  Item,
  Popup,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import CustomStore from "devextreme/data/custom_store";
import "devextreme/data/data_source";
import "whatwg-fetch";
import { useAuth } from "../../contexts/auth";
//import TextBox from "devextreme-react/text-box";
import { TabbedItem, Tab, SimpleItem } from "devextreme-react/form";
//import { ItemDragging } from "devextreme-react/list";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const mystore = (mycompany) =>
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

      mycompany = 1;

      params = params.slice(0, -1);
      var requestoptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;",
        },
        body: JSON.stringify({
          SentCompany: mycompany,
          Parameters: params,
        }),
      };
      const url = `${process.env.REACT_APP_BASE_URL}/GetOperators`;
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
          console.log(json);
          return {
            data: json.user_response.mdata,
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
          SentCompany: mycompany,
        }),
      };
      const url = `${process.env.REACT_APP_BASE_URL}/updateOperators`;
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
          SentCompany: key,
          ThisFunction: "delete",
        }),
      };
      const url = `${process.env.REACT_APP_BASE_URL}/updateOperators`;
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
      console.log(key);
      console.log(values);
      var requestoptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;",
        },
        body: JSON.stringify({
          ThisFunction: "change",
          SentCompany: key,
          keyvaluepair: values,
        }),
      };
      const url = `${process.env.REACT_APP_BASE_URL}/updateOperators`;
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

//const turnoffedit = { disabled: true };

const allowedPageSizes = [8, 12, 20];

class EmployeeManagementx extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sentcompany: this.props.companynumber };
    //mystore.load();
  }

  render() {
    return (
      <DataGrid
        ref={(ref) => {
          this.dataGrid = ref;
        }}
        dataSource={mystore(this.sentcompany)}
        showBorders={true}
        remoteOperations={true}
        // selectedRowKeys={this.state.selectedItemKeys}
        // onSelectionChanged={this.selectionChanged}
      >
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup title="Employee Info" showTitle={true} />
          <Form>
            <TabbedItem>
              <Tab title="Employee Info">
                <Item dataField="OPERATORNAME" />
                <Item dataField="USERNAME" />
                <Item dataField="USERPASSWORD" />
                <Item dataField="EMAILADDRESS" />
                <Item dataField="ACTIVE" />
                <Item dataField="ADMINISTRATOR" />
                <Item dataField="EMPLOYEENOTES" />
              </Tab>
              <Tab title="Days Available" colCount={1}>
                <Item dataField={"MONDAY"} />

                <Item dataField={"TUESDAY"} />
                <Item dataField={"WEDNESDAY"} />
                <Item dataField={"THURSDAY"} />
                <Item dataField={"FRIDAY"} />
                <Item dataField={"SATURDAY"} />
                <Item dataField={"SUNDAY"} />
              </Tab>
              <Tab title="Holiday Schedule"></Tab>
            </TabbedItem>
          </Form>
        </Editing>
        <Column
          dataField={"UNIQUEID"}
          width={90}
          hidingPriority={2}
          visible={false}
          allowEditing={false}
        />
        <Column
          dataField={"COMPANYNUMBER"}
          visible={false}
          allowEditing={false}
        />
        <Column
          dataField={"USERNAME"}
          caption={"Username"}
          hidingPriority={6}
          allowEditing={true}
        />
        <Column
          dataField={"USERPASSWORD"}
          caption={"User Password"}
          hidingPriority={5}
          allowEditing={true}
        />

        <Column
          //dataType="boolean"
          dataField={"ADMINISTRATOR"}
          caption={"Administrator"}
          hidingPriority={7}
          dataType="boolean"
          allowEditing={true}
        />
        <Column
          dataField={"OPERATORNAME"}
          caption={"Employee Name"}
          hidingPriority={7}
          allowEditing={true}
        />
        <Column
          dataField={"EMAILADDRESS"}
          caption={"Employee Email Address"}
          hidingPriority={7}
          colSpan={2}
          allowEditing={false}
        />
        <Column
          dataField={"MONDAY"}
          dataType="boolean"
          caption={"Monday"}
          hidingPriority={7}
          allowEditing={true}
        />
        <Column
          dataField={"TUESDAY"}
          dataType="boolean"
          caption={"Tuesday"}
          hidingPriority={7}
          allowEditing={true}
        />
        <Column
          dataField={"WEDNESDAY"}
          dataType="boolean"
          caption={"Wednesday"}
          hidingPriority={7}
          allowEditing={true}
        />
        <Column
          dataField={"THURSDAY"}
          dataType="boolean"
          caption={"Thursday"}
          hidingPriority={7}
          allowEditing={true}
        />
        <Column
          dataField={"FRIDAY"}
          dataType="boolean"
          caption={"Friday"}
          hidingPriority={7}
          allowEditing={true}
        />
        <Column
          dataField={"SATURDAY"}
          dataType="boolean"
          caption={"Saturday"}
          hidingPriority={7}
          allowEditing={true}
        />
        <Column
          dataField={"SUNDAY"}
          dataType="boolean"
          caption={"Sunday"}
          hidingPriority={7}
          allowEditing={true}
        />
        <Column
          dataField={"ACTIVE"}
          dataType="boolean"
          caption={"Active"}
          hidingPriority={7}
          allowEditing={true}
        />
        <Column
          dataField={"EMPLOYEENOTES"}
          caption={"Notes"}
          hidingPriority={7}
          allowEditing={true}
        />

        <Paging defaultPageSize={12} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={allowedPageSizes}
        />
      </DataGrid>
    );
  }
}

export default function EmployeeManagement() {
  const { user } = useAuth();
  //console.log({ user });
  return <EmployeeManagementx companynumber={user.companynumber} />;
}
