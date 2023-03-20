import React, { useState } from "react";
import DataGrid, {
  Column,
  MasterDetail,
  Paging,
  Pager,
  Editing,
  Item,
  Popup,
  Form,
} from "devextreme-react/data-grid";
import { mystore, mystore2 } from "./EmployeeServices";
import { useAuth } from "../../contexts/auth";
import { TabbedItem, Tab } from "devextreme-react/ui/form";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";

import employeemanagementDetail from "./employeemanagementDetail";

const allowedPageSizes = [8, 12, 20];

const EmployeeManagement = () => {
  //const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const { user } = useAuth();

  // const onExpandedRowKeysChange = (keys) => {
  //   setExpandedRowKeys(keys);
  // };

  return (
    <div className="content-block dx-card responsive-paddings">
      <DataGrid
        dataSource={mystore(user.companynumber)}
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
            showTitle={true}
            width={1000}
            height={575}
            showCloseButton={false}
          />
          <Form id="form" labelLocation="left">
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
              <Tab title="Vacation Schedule">
                <MasterDetail
                  enabled={true}
                  component={employeemanagementDetail}
                />
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
};

export default EmployeeManagement;
