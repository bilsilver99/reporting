import React, { useState, useEffect } from "react";
import "./profile.scss";
import "devextreme-react/text-area";
import Form, { Item } from "devextreme-react/form";
import { fetchcompany, updateCompany } from "../../api/MyOwnServices";
import { useAuth } from "../../contexts/auth";
import { Button } from "devextreme-react/button";

function Profilex(props) {
  const [companyValues, setCompanyValues] = useState({
    CompanyNumber: 0,
    CompanyName: "Bill",
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

    return () => {
      // this now gets called when the component unmounts
    };
  }, [companynumbersent]);

  const companyUpdate = (event) => {
    updateCompany(props.companynumber, companyValues);
  };
  const CompanyNumberEditorOptions = { disabled: true };

  const validateForm = (e) => {
    e.component.validate();
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Company Information</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        {companyValues.CompanyNumber !== 0 && (
          <>
            <Form
              onContentReady={validateForm}
              id={"form"}
              formData={companyValues}
              labelLocation={"top"}
              colCountByScreen={colCountByScreen}
            />
            <Item
              dataField="CompanyNumber"
              editorOptions={CompanyNumberEditorOptions}
            />
            <Item dataField={"CompanyName"} />
            <Button
              icon="plus"
              text="Update"
              onClick={() => {
                companyUpdate();
              }}
            />
          </>
        )}
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

export default function Profile() {
  const { user } = useAuth();
  return <Profilex companynumber={user.companynumber} />;
}
