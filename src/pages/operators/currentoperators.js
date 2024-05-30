import React, { useEffect, useState } from "react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Lookup,
  Form,
  Selection,
  Toolbar,
  ColumnChooser,
  Export,
  Popup,
} from "devextreme-react/data-grid";
import { Item } from "devextreme-react/form";
import { FileUploader } from "devextreme-react";
import { useAuth } from "../../contexts/auth";
import { OperatorStore, CompanyStore } from "./operatordata";
import "./reportList.scss";

const allowedPageSizes = [8, 12, 20];

const Operatorsx = ({ companyCode }) => {
  const [operatorStore, setOperatorStore] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [showFilterRow, setShowFilterRow] = useState(true);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("auto");
  const [companyCodes, setCompanyCodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const store = OperatorStore(companyCode);
      setOperatorStore(store);

      try {
        const data = await CompanyStore();
        console.log("companies js", data);

        if (data && Array.isArray(data)) {
          setCompanyCodes(data);
        } else {
          console.error("Invalid data format:", data);
          setCompanyCodes([]); // Ensure it's an array to avoid length errors
        }
      } catch (error) {
        console.error(
          "There was an error fetching the company group data:",
          error
        );
        setCompanyCodes([]); // Ensure it's an array to avoid length errors
      }
    };

    fetchData();
  }, [companyCode]);

  const handleSelectionChanged = (e) => {
    setSelectedRowKeys(e.selectedRowKeys);
    if (e.selectedRowKeys.length > 0) {
      setCurrentRow(e.selectedRowKeys[0]);
    }
  };

  if (!operatorStore || companyCodes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataGrid
        dataSource={operatorStore}
        showBorders={true}
        remoteOperations={false}
        onSelectionChanged={handleSelectionChanged}
      >
        <FilterRow visible={showFilterRow} applyFilter={currentFilter} />
        <HeaderFilter visible={showHeaderFilter} />
        <SearchPanel visible={true} width={240} placeholder="Search..." />
        <Paging enabled={true} />
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup
            title="Operator Infos"
            showTitle={true}
            width={"60%"}
            height={900}
          >
            <Form labelLocation="top">
              <Item itemType="group" colCount={2}>
                <Item dataField="USERNAME" />
                <Item dataField="USERPASSWORD" />
              </Item>
              <Item itemType="group" colCount={2}>
                <Item dataField="USERFIRSTNAME" />
                <Item dataField="USERLASTNAME" />
              </Item>
              <Item itemType="group" colCount={1}>
                <Item dataField="EMAILADDRESS" />
              </Item>
              <Item itemType="group" colCount={3}>
                <Item dataField="ACTIVE" />
                <Item dataField="INTERNAL" />
                <Item dataField="ADMINISTRATOR" />
              </Item>
            </Form>
          </Popup>
        </Editing>

        {/* <Column dataField="UNIQUEID" allowEditing={false} visible={false} /> */}
        {/* <Column dataField="COMPANYNUMBER" caption="Company">
          <Lookup
            dataSource={companyCodes}
            valueExpr="COMNUMBER"
            displayExpr="COMNAME"
          />
        </Column> */}
        <Column dataField="USERNAME" caption="Username" />
        <Column dataField="USERPASSWORD" caption="Password" />
        <Column dataField="USERFIRSTNAME" caption="First Name" />
        <Column dataField="USERLASTNAME" caption="Last Name" />
        <Column dataField="EMAILADDRESS" caption="Email" />
        <Column
          dataField="ACTIVE"
          caption="Active"
          dataType={"boolean"}
          editorType="dxCheckBox"
        />
        <Column
          dataField="INTERNAL"
          caption="Internal"
          dataType={"boolean"}
          editorType="dxCheckBox"
        />
        <Column
          dataField="ADMINISTRATOR"
          caption="Administrator"
          dataType={"boolean"}
          editorType="dxCheckBox"
        />
        <Paging defaultPageSize={8} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={allowedPageSizes}
        />
      </DataGrid>
    </div>
  );
};

export default function Operators() {
  const { user } = useAuth();
  return <Operatorsx companyCode={user.companyCode} />;
}
