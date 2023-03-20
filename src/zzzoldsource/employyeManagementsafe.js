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
//import "whatwg-fetch";
import { useAuth } from "../../contexts/auth";
//import TextBox from "devextreme-react/text-box";
import { TabbedItem, Tab } from "devextreme-react/ui/form";
//import { ItemDragging } from "devextreme-react/list";
//import CustomStore from "devextreme/data/custom_store";

import { mystore, mystore2 } from "./EmployeeServices";

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
        <DataGrid
          ref={(ref) => {
            this.dataGrid = ref;
          }}
          dataSource={mystore(this.state.mycompany)}
          showBorders={true}
          remoteOperations={true}
          onRowClick={this.handleRowClick}
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
                <Tab title="Holiday Schedule">
                  <DataGrid
                    ref={(ref) => {
                      this.dataGrid = ref;
                    }}
                    dataSource={mystore2(
                      this.state.mycompany,
                      this.state.myemployee
                    )}
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
                      <Popup
                        //titleRender={renderTitle}
                        showTitle={false}
                        width={700}
                        height={525}
                        showCloseButton={false}
                      />
                      <Form id="form" colCount={1} labelLocation="left">
                        <Item dataField={"USERNAME"} />
                        <Item dataField={"DATEOFVACATION"} />
                        <Item dataField={"FULLDAY"} />
                        <Item dataField={"STARTTIME"} />
                        <Item dataField={"ENDTTIME"} />
                        <Item dataField={"NOTES"} />
                      </Form>
                      <Column
                        dataField={"COMPANYNUMBER"}
                        visible={false}
                        allowEditing={false}
                      />
                      <Column
                        dataField={"USERNAME"}
                        visible={false}
                        allowEditing={false}
                      />
                      <Column
                        dataField={"DATEOFVACATION"}
                        caption={"Date"}
                        hidingPriority={6}
                        allowEditing={true}
                        editorType="dxDateBox"
                      />
                      <Column
                        dataType="boolean"
                        dataField={"FULLDAY"}
                        caption={"Full Day"}
                        hidingPriority={5}
                        allowEditing={true}
                      />

                      <Column
                        //dataType="boolean"
                        dataField={"STARTTIME"}
                        caption={"Start Time"}
                        hidingPriority={7}
                        allowEditing={true}
                        format="##.00"
                      />
                      <Column
                        dataField={"ENDTIME"}
                        caption={"End Time"}
                        hidingPriority={7}
                        allowEditing={true}
                        format="##.00"
                      />
                    </Editing>
                  </DataGrid>
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
