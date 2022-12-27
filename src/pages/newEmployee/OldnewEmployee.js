import React from "react";
import "devextreme-react/text-area";

import Form, { SimpleItem, Label, GroupItem } from "devextreme-react/form";
import TextBox from "devextreme-react/text-box";

import service from "./newEmployeeData";

class NewEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.employee = service.getEmployee();
    this.positions = service.getPositions();
    this.rules = { X: /[02-9]/ };

    this.validationRules = {
      position: [{ type: "required", message: "Position is required." }],
      hireDate: [{ type: "required", message: "Hire Date is required." }],
    };

    this.nameEditorOptions = { disabled: true };
    this.positionEditorOptions = {
      items: this.positions,
      searchEnabled: true,
      value: "",
    };
    this.hireDateEditorOptions = { width: "100%", value: null };
    this.birthDateEditorOptions = { width: "100%", disabled: true };
    this.notesEditorOptions = { height: 90 };
    this.phonesEditorOptions = {
      mask: "+1 (X00) 000-0000",
      maskRules: this.rules,
    };

    this.validateForm = (e) => {
      e.component.validate();
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="long-title">
          <h3>Employee Details</h3>
        </div>
        <div className="dx-fieldset">
          <Form
            onContentReady={this.validateForm}
            colCount={2}
            className="form"
            formData={this.employee}
          >
            <GroupItem>
              <SimpleItem
                dataField="FirstName"
                editorOptions={this.nameEditorOptions}
              />
              <SimpleItem
                dataField="Position"
                editorType="dxSelectBox"
                editorOptions={this.positionEditorOptions}
                validationRules={this.validationRules.position}
              />
              <SimpleItem
                dataField="LastName"
                editorOptions={this.nameEditorOptions}
              />
              <SimpleItem
                dataField="HireDate"
                editorType="dxDateBox"
                editorOptions={this.hireDateEditorOptions}
                validationRules={this.validationRules.hireDate}
              />
              <SimpleItem
                dataField="BirthDate"
                editorType="dxDateBox"
                editorOptions={this.birthDateEditorOptions}
              />
              <SimpleItem dataField="Address" />
              <SimpleItem
                dataField="Notes"
                colSpan={2}
                editorType="dxTextArea"
                editorOptions={this.notesEditorOptions}
              />
              <SimpleItem
                dataField="Phone"
                editorOptions={this.phonesEditorOptions}
              />
            </GroupItem>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default NewEmployee;

//<Item dataField="Email" />
