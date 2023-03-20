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

import { mystore2 } from "./ServiceServices";
const mycompany = 1;
// const myemployee = "b@b.com";

//const tasks = mystore2(mycompany, myemployee);

class ServiceLevels extends React.Component {
  // const [mycompany, setmycompany] = useState(1);
  // const [myemployee, setmyemployee] = useState("b@b.com");
  constructor(props) {
    super(props);
    this.dataSource = getTasks(props.data.data.UNIQUEID);
  }

  render() {
    const { DESCRIPTION } = this.props.data.data;
    const { UNIQUEID } = this.props.data.data;

    return (
      <>
        <div className="master-detail-caption">{`${DESCRIPTION} Services ${UNIQUEID}`}</div>
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
              title={"Service Levels"}
              showTitle={true}
              width={700}
              height={525}
              showCloseButton={false}
            />
            <Form id="form" colCount={1} labelLocation="left" showTitle={true}>
              <Item dataField="SERVICEOPTION" />
              <Item dataField="PRODUCTORSERVICE" />
              <Item dataField="DESCRIPTION" />
              <Item dataField="HOURSREQUIRED" />
              <Item dataField="RATEPERHOUR" />
              <Item dataField="TOTALSERVICECOST" />
              <Item dataField="PRODUCTID" />
              <Item dataField="QUANTITYREQUIRED" />
              <Item dataField="PRICEPERUNIT" />
              <Item dataField="TOTALPRODUCTCOST" />
              <Item dataField="TOTALCOST" />
              <Item dataField="ACTIVE" />
              <Item dataField="RATEPERHOUR" />
            </Form>
          </Editing>

          <Column
            dataField={"SERVICEOPTION"}
            caption={"Option"}
            hidingPriority={6}
            allowEditing={true}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField={"PRODUCTORSERVICE"}
            caption={"(P)roduct or (S)ervice)"}
            hidingPriority={5}
            allowEditing={true}
          />
          <Column
            dataField={"DESCRIPTION"}
            caption={"Description"}
            hidingPriority={7}
            allowEditing={true}
          />
          <Column
            dataField={"HOURSREQUIRED"}
            caption={"Hours Required"}
            hidingPriority={7}
            allowEditing={true}
            format="##.000"
          />
          <Column
            dataField={"RATEPERHOUR"}
            caption={"Rate Per Hour"}
            hidingPriority={7}
            allowEditing={true}
            format="##.00"
          />
          <Column
            dataField={"TOTALSERVICECOST"}
            caption={"Total Service Cost"}
            hidingPriority={7}
            allowEditing={true}
            format="##.00"
          />
          <Column
            dataField={"PRODUCTID"}
            caption={"Product"}
            hidingPriority={7}
            allowEditing={true}
          />
          <Column
            dataField={"QUANTITYREQUIRED"}
            caption={"Quantity Required"}
            hidingPriority={7}
            allowEditing={true}
            format="##.00"
          />
          <Column
            dataField={"PRICEPERUNIT"}
            caption={"Unit Price"}
            hidingPriority={7}
            allowEditing={true}
            format="##.00"
          />
          <Column
            dataField={"TOTALPRODUCTCOST"}
            caption={"Total Product Cost"}
            hidingPriority={7}
            allowEditing={true}
            format="##.00"
          />
          <Column
            dataField={"TOTALCOST"}
            caption={"Total Cost"}
            hidingPriority={7}
            allowEditing={true}
            format="##.00"
          />
          <Column
            dataField={"ACTIVE"}
            caption={"Active"}
            hidingPriority={7}
            allowEditing={true}
            dataType="boolean"
          />
        </DataGrid>
      </>
    );
  }
}

export default ServiceLevels;

function getTasks(key) {
  console.log(key);
  return new DataSource(mystore2(key));
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
