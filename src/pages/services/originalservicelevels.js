import React from "react";
//import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import DataGrid, { Column, Editing, Lookup } from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import "./App.css";

//import { Validator, RequiredRule } from "devextreme-react/validator";

import "devextreme/data/data_source";
//import { useAuth } from "../../contexts/auth";

import DataSource from "devextreme/data/data_source";
import { mystore2 } from "./ServiceServices";
//import { TabbedItem, Tab } from "devextreme-react/form";
//import { Col } from "devextreme-react/responsive-box";

class ServiceLevels extends React.Component {
  // const [mycompany, setmycompany] = useState(1);
  // const [myemployee, setmyemployee] = useState("b@b.com");
  constructor(props) {
    super(props);
    this.dataSource = getTasks(props.data.data.UNIQUEID);
    //this.handleCellValueChanged = this.handleCellValueChanged.bind(this);
    this.genders = [
      { value: "P", text: "Product" },
      { value: "S", text: "Service" },
    ];
    //this.handleCellValueChanged = this.handleCellValueChanged.bind(this);
  }

  handleDataChanged(e) {
    e.component.repaintRows();
  }

  render() {
    const { DESCRIPTION } = this.props.data.data;
    //const { UNIQUEID } = this.props.data.data;

    return (
      <>
        <div className="content-block dx-card responsive-paddings red-color">
          {DESCRIPTION} Services
          <div className="custom-container">
            <DataGrid dataSource={this.dataSource} columnAutoWidth={true}>
              <Editing
                mode="cell"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
              ></Editing>
              <Column
                dataField={"SERVICEOPTION"}
                caption={"Service Codes"}
                hidingPriority={7}
                allowEditing={true}
              ></Column>
              <Column dataField="PRODUCTORSERVICE" caption="Product Or Service">
                hidingPriority={7}
                <Lookup
                  dataSource={this.genders}
                  displayExpr="text"
                  valueExpr="value"
                  defaultValue={this.dataSource.PRODUCTORSERVICE}
                  //onValueChanged={onValueChanged}
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
                onEditingCellChange={this.handleCellValueChanged}
              />
              <Column
                dataField={"RATEPERHOUR"}
                caption={"Rate Per Hour"}
                hidingPriority={7}
                allowEditing={true}
                format="##.00"
              />
              <Column
                caption="Total"
                calculateCellValue={(row) =>
                  row.HOURSREQUIRED * row.RATEPERHOUR
                }
                dataType="number"
                format="##.00"
                allowEditing={false}
              />
              <Column
                dataField={"PRODUCTDESCRIPTION"}
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
                caption="Total"
                calculateCellValue={(row) =>
                  row.QUANTITYREQUIRED * row.PRICEPERUNIT
                }
                dataType="number"
                format="##.00"
                allowEditing={false}
              />
              <Column
                caption="Total"
                calculateCellValue={(row) =>
                  row.HOURSREQUIRED * row.RATEPERHOUR +
                  row.QUANTITYREQUIRED * row.PRICEPERUNIT
                }
                dataType="number"
                format="##.00"
                allowEditing={false}
              />
              dataField={"TOTALCOST"}
              caption={"Total Cost"}
              hidingPriority={7}
              allowEditing={false}
              format="##.00" />
              <Column
                dataField={"ACTIVE"}
                caption={"Active"}
                hidingPriority={7}
                allowEditing={true}
                dataType="boolean"
              />
            </DataGrid>
          </div>
        </div>
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

// <Column
//   dataField={"TOTALSERVICECOST"}
//   caption={"Total Service Cost"}
//   hidingPriority={7}
//   allowEditing={false}
//   format="##.00"
//   calculateCellValue={this.calculateSalary}
// />

//<Item dataField="TOTALSERVICECOST" />
//className="content-block dx-card responsive-paddings">
