import React from "react";
//import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import DataGrid, {
  Column,
  Editing,
  Item,
  Popup,
  Form,
  Lookup,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { useAuth } from "../../contexts/auth";

//import { Validator, RequiredRule } from "devextreme-react/validator";

import "devextreme/data/data_source";
//import { useAuth } from "../../contexts/auth";

import DataSource from "devextreme/data/data_source";
import { mystore2 } from "./ServiceServices";
import { TabbedItem, Tab } from "devextreme-react/form";

class ServiceLevels extends React.Component {
  // const [mycompany, setmycompany] = useState(1);
  // const [myemployee, setmyemployee] = useState("b@b.com");
  constructor(props) {
    super(props);
    this.dataSource = getTasks(props.data.data.UNIQUEID);
    this.handleCellValueChanged = this.handleCellValueChanged.bind(this);
    this.genders = [
      { value: "P", text: "Product" },
      { value: "S", text: "Service" },
    ];
    this.handleCellValueChanged = this.handleCellValueChanged.bind(this);
  }

  handleCellValueChanged(e) {
    // Handle the cell value changed event
  }

  handleScoreChange = (e) => {
    const newData = [...this.state.dataSource];
    const dataItem = newData.find((item) => item.id === e.data.id);
    dataItem.score = // calculation logic based on the input value
      this.setState({ dataSource: newData });
  };
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
              <TabbedItem>
                <Tab title="Services">
                  <Item dataField="HOURSREQUIRED" />
                  <Item dataField="RATEPERHOUR" />
                  <Item dataField="TOTALSERVICECOST" />
                </Tab>
                <Tab title="Product">
                  <Item dataField="PRODUCTID" />
                  <Item dataField="QUANTITYREQUIRED" />
                  <Item dataField="PRICEPERUNIT" />
                  <Item dataField="TOTALPRODUCTCOST" />
                  <Item dataField="TOTALCOST" />
                  <Item dataField="ACTIVE" />
                  <Item dataField="RATEPERHOUR" />
                </Tab>
              </TabbedItem>
            </Form>
          </Editing>
          <Column
            dataField={"SERVICEOPTION"}
            caption={"Service Code"}
            hidingPriority={6}
            allowEditing={true}
          ></Column>
          <Column dataField="PRODUCTORSERVICE" caption="Product Or Service">
            <Lookup
              dataSource={this.genders}
              displayExpr="text"
              valueExpr="value"
              defaultValue={this.dataSource.PRODUCTORSERVICE}
              onValueChanged={onValueChanged}
            />
          </Column>
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
            allowEditing={false}
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
            allowEditing={false}
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

function onValueChanged(e) {
  this.dataSource.PRODUCTORSERVICE = e.value;
  console.log(this.dataSource.PRODUCTORSERVICE);
  console.log(e.previousValue);
  console.log(e.value);
}

function onServiceValueChanged(e) {
  this.dataSource.TOTALSERVICECOST =
    this.dataSource.HOURSREQUIRED * this.dataSource.RATEPERHOUR;
  console.log(this.dataSource.TOTALSERVICECOST);
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
