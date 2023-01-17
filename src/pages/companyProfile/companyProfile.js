import React, { useState, useEffect } from "react";
import "./companyProfile.scss";
import "devextreme-react/text-area";
import Form, { Item, ButtonItem, GroupItem } from "devextreme-react/form";
import { fetchcompany, updateCompany } from "../../api/MyOwnServices";
import { useAuth } from "../../contexts/auth";
import notify from "devextreme/ui/notify";

function CompanyProfilex(props) {
  const [notes, setNotes] = useState("");

  const [companyValues, setCompanyValues] = useState({
    CompanyNumber: 0,
    CompanyName: "",
    AddressLineOne: "",
    AddressLineTwo: "",
    AddressLineThree: "",
    AddressLineFour: "",
    Country: "",
    PostalCode: "",
    FaxNumber: "",
    PhoneNumber: "",
    EmailAddress: "",
    UserName: "",
    UserPassword: "",
  });
  //const [employee, getemployee] = useState();

  //this.employee = service.getEmployee();
  //this.positions = service.getPositions();

  const companynumbersent = props.companynumber; //CompanyContext; //{companyvalue};

  useEffect(() => {
    (async () => {
      const result = await fetchcompany(companynumbersent);
      console.log(result);
      setCompanyValues({
        CompanyNumber: result.Companynumber,
        CompanyName: result.CompanyName,
        AddressLineOne: result.AddressLineOne,
        AddressLineTwo: result.AddressLineTwo,
        AddressLineThree: result.AddressLineThree,
        AddressLineFour: result.AddressLineFour,
        Country: result.Country,
        PostalCode: result.PostalCode,
        FaxNumber: result.FaxNumber,
        PhoneNumber: result.PhoneNumber,
        EmailAddress: result.EmailAddress,
        UserName: result.UserName,
        UserPassword: result.UserPassword,
      });
    })();
    //getemployee(service.getEmployee());

    return () => {
      // this now gets called when the component unmounts
    };
  }, [companynumbersent]);

  const companyUpdate = (event) => {
    updateCompany(props.companynumber, companyValues);
    notify(
      {
        message: "You have submitted the form",
        position: {
          my: "center top",
          at: "center top",
        },
      },
      "success",
      3000
    );
    event.preventDefault();
  };

  const validateForm = (event) => {
    event.component.validate();
  };
  const nameEditorOptions = { disabled: true };

  const rules = { X: /[02-9]/ };

  const phonesEditorOptions = {
    mask: "+1 (X00) 000-0000",
    maskRules: rules,
  };

  const buttonOptions = {
    text: "Update",
    type: "success",
    useSubmitBehavior: true,
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Client Information</h2>
      <div className="content-block dx-card responsive-paddings">
        <form onSubmit={companyUpdate}>
          <Form
            onContentReady={validateForm}
            //colCountByScreen={colCountByScreen}
            id="form"
            formData={companyValues}
          >
            <GroupItem colCount={3}>
              <Item
                dataField="CompanyNumber"
                editorOptions={nameEditorOptions}
              />
              <Item
                dataField="CompanyName"
                //editorType="dxSelectBox"
                //editorOptions={this.positionEditorOptions}
                //validationRules={this.validationRules.position}
              />
              <Item
                dataField="AddressLineOne"
                //editorOptions={nameEditorOptions}
              />
              <Item
                dataField="AddressLineTwo"
                //editorType="dxDateBox"
                //editorOptions={this.hireDateEditorOptions}
                //validationRules={this.validationRules.hireDate}
              />
              <Item
                dataField="AddressLineThree"
                //editorType="dxDateBox"
                //editorOptions={this.birthDateEditorOptions}
              />
              <Item dataField="AddressLineFour" />
              <Item
                dataField="Country"
                //colSpan={2}
                //editorType="dxTextArea"
                //editorOptions={this.notesEditorOptions}
              />
              <Item
                dataField="PostalCode" //editorOptions={this.phonesEditorOptions}
              />
              <Item dataField="FaxNumber" editorOptions={phonesEditorOptions} />
              <Item
                dataField="PhoneNumber"
                editorOptions={phonesEditorOptions}
              />
              <Item
                dataField="EmailAddress" //editorOptions={this.phonesEditorOptions}
              />
              <Item
                dataField="UserName" //editorOptions={this.phonesEditorOptions}
              />
              <Item
                dataField="UserPassword" //editorOptions={this.phonesEditorOptions}
              />
            </GroupItem>
            <GroupItem>
              <ButtonItem
                horizontalAlignment="left"
                buttonOptions={buttonOptions}
              />
            </GroupItem>
          </Form>
        </form>
      </div>
    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};

export default function CompanyProfile() {
  const { user } = useAuth();
  return <CompanyProfilex companynumber={user.companynumber} />;
}

// {/* <React.Fragment>
// <h2 className={"content-block"}>Company Information</h2>

// <div className={"content-block dx-card responsive-paddings"}>
//   {companyValues.CompanyNumber !== 0 && (
//     <>
//       <Form
//         onContentReady={validateForm}
//         id={"form"}
//         formData={companyValues}
//         labelLocation={"top"}
//         colCountByScreen={colCountByScreen}
//       />
//       <Item
//         dataField="CompanyNumber"
//         editorOptions={CompanyNumberEditorOptions}
//       />
//       <Item dataField={"CompanyName"} />
//       <Button
//         icon="plus"
//         text="Update"
//         onClick={() => {
//           companyUpdate();
//         }}
//       />
//     </>
//   )}
// </div>
// </React.Fragment> */}

//className="content-block dx-card responsive-paddings'}>
