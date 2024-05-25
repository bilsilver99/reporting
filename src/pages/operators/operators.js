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
} from "devextreme-react/data-grid";
import { useAuth } from "../../contexts/auth";
import { OperatorStore, CompanyStore } from "./operatordata";

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
    <div className="content-block dx-card responsive-paddings">
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
          mode="cell"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />
        <Column dataField="UNIQUEID" allowEditing={false} visible={false} />
        <Column dataField="COMPANYNUMBER" caption="Company">
          <Lookup
            dataSource={companyCodes}
            valueExpr="COMNUMBER"
            displayExpr="COMNAME"
          />
        </Column>
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
