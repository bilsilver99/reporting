import React from "react";
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

//const allowedPageSizes = [8, 12, 20];

class employeemanagementDetail extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = getTasks(props.data.key);
  }
  render() {
    return (
      <div>
        <DataGrid
          dataSource={getTasks(this.DataSource)}
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
      </div>
    );
  }
}

export default employeemanagementDetail;

// function getTasks(key) {
//   return new DataSource({
//     store: new ArrayStore({
//       data: tasks,
//       key: "ID",
//     }),
//     filter: ["EmployeeID", "=", key],
//   });
// }

function getTasks(key) {
  return new DataSource({
    store: new ArrayStore({
      data: mystore2,
      key: "USERNAME",
    }),
    filter: ["USERNAME", "=", key],
  });
}

//<MasterDetail enabled={true} component={DetailTemplate} />
