import React from "react";
//import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Item,
  Popup,
  Form,
  MasterDetail,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";

import "devextreme/data/data_source";
import { useAuth } from "../../contexts/auth";
import { TabbedItem, Tab } from "devextreme-react/ui/form";
import DetailTemplate from "./detailTemplate";
import { mystore } from "./EmployeeServices";

const allowedPageSizes = [8, 12, 20];

class EmployeeManagementx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mycompany: this.props.mycompany,
      myemployee: "",
      currentRow: 0,
    };
    //mystore.load();
  }

  render() {
    return (
      <div className="content-block dx-card responsive-paddings">
        <h3>Employee management</h3>
        <DataGrid
          dataSource={mystore(this.state.mycompany)}
          showBorders={true}
          remoteOperations={true}
          //onRowClick={this.handleRowClick}
          // selectedRowKeys={this.state.selectedItemKeys}
          // onSelectionChanged={this.selectionChanged}
        >
          <Editing
            mode="popup"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
          >
            <Popup
              //titleRender={renderTitle}
              showTitle={true}
              width={1000}
              height={575}
              showCloseButton={false}
            />
            <Form id="form" colCount={1} labelLocation="left">
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
          <MasterDetail enabled={true} component={DetailTemplate} />
          <Paging defaultPageSize={12} />
          <Pager
            showPageSizeSelector={true}
            allowedPageSizes={allowedPageSizes}
          />
        </DataGrid>
      </div>
    );
  }
  handleRowClick = (e) => {
    this.setState({ currentRow: e.row });
    //console.log(this.state.currentRow);
    console.log("here");
  };
}

export default function EmployeeManagement() {
  const { user } = useAuth();
  //console.log({ user });
  return <EmployeeManagementx mycompany={user.companynumber} />;
}
