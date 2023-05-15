import React from "react";
//import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import DataGrid, {
  Column,
  Editing,
  Item,
  Popup,
  Form,
  RequiredRule,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";

import "devextreme/data/data_source";
//import { useAuth } from "../../contexts/auth";

import DataSource from "devextreme/data/data_source";

import { mystore2 } from "./EmployeeServices";
const mycompany = 1;
// const myemployee = "b@b.com";

//const tasks = mystore2(mycompany, myemployee);

class DetailTemplate extends React.Component {
  // const [mycompany, setmycompany] = useState(1);
  // const [myemployee, setmyemployee] = useState("b@b.com");
  constructor(props) {
    super(props);
    this.dataSource = getTasks(props.data.data.UNIQUEID);
  }

  render() {
    const { USERNAME } = this.props.data.data;

    return (
      <>
        <div className="master-detail-caption">{`${USERNAME} Holidays/Days Off:`}</div>
        <DataGrid
          dataSource={this.dataSource}
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
              title={"Vacation Schedule"}
              showTitle={true}
              width={700}
              height={525}
              showCloseButton={false}
            />
            <Form id="form" colCount={1} labelLocation="left" showTitle={true}>
              <Item dataField="DATEOFVACATION" />
              <Item dataField="FULLDAY" />
              <Item dataField="STARTTIME" />
              <Item dataField="ENDTIME" />
              <Item dataField="NOTES" />
            </Form>
          </Editing>

          <Column
            dataField={"DATEOFVACATION"}
            caption={"Date"}
            hidingPriority={6}
            allowEditing={true}
            editorType="dxDateBox"
          >
            <RequiredRule />
          </Column>
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
            //dataType="boolean"
            dataField={"ENDTIME"}
            caption={"End Time"}
            hidingPriority={7}
            allowEditing={true}
            format="##.00"
          />
          <Column
            dataField={"NOTES"}
            caption={"Notes"}
            hidingPriority={7}
            allowEditing={true}
          />
        </DataGrid>
      </>
    );
  }
}

export default DetailTemplate;

function getTasks(key) {
  console.log(key);
  return new DataSource(mystore2(mycompany, key));
  //new DataSource({ data: tasks });
}

// function getTasks(key) {
//   return new DataSource({
//     store: new ArrayStore({
//       data: tasks,
//       key: "ID",
//     }),
//     filter: ["EmployeeID", "=", key],
//   });
// }
