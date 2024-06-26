const handleValueChange = (newValue) => {
  data.FILTERDATABASEVALUE = newValue; // Update the value in the data object
  setValue(newValue); // Notify the grid about the change
};

import React, { useEffect, useState } from "react";
import { fetchDropdownData } from "./reportListData";
import { SelectBox } from "devextreme-react";

export const CellTemplate = ({
  value,
  data,
  setValue,
  selectedCompanyCode,
}) => {
  const [dropdownData, setDropdownData] = useState([]);
  fetchDropdownData(data.data.FILESTRING, selectedCompanyCode).then((data) => {
    console.log("Data", data);
    setDropdownData(data);
  });
  return (
    <div>
      {data.data.FILESTRING ? (
        <SelectBox
          dataSource={dropdownData}
          value={value}
          displayExpr="CODE"
          valueExpr="CODE"
          onValueChanged={(e) => setValue(e.value)}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
};

// const fetchDropdownDataAsync = async (fileString, selectedCompanyCode) => {
//     console.log("File String", fileString);
//     if (!fileString) return [];

//     // Simulate fetching data from a server
//     const tableName = fileString.split(".")[0];
//     const fieldName = fileString.split(".")[1];
//     console.log("Table Name", tableName, "Field Name", fieldName);

//     // Replace this with actual data fetching logic
//     const response = await fetchDropdownData(
//       selectedCompanyCode,
//       tableName,
//       fieldName
//     );
//     console.log("Response", response);
//     const data = await response();

//   };

//   const CellTemplate = ({ value, data, setValue, selectedCompanyCode }) => {
//     //console.log("in cell data ", data);
//     const [dropdownData, setDropdownData] = useState([]);

//     useEffect(() => {
//       console.log("in cell data ", data.data.FILESTRING);
//       if (data.data.FILESTRING) {
//         fetchDropdownDataAsync(data.data.FILESTRING, selectedCompanyCode).then(
//           (fetchedData) => {
//             setDropdownData(fetchedData);
//           }
//         );
//       }
//     }, [data.FILESTRING]);

//     return (
//       <div>
//         {data.data.FILESTRING ? (
//           <SelectBox
//             dataSource={dropdownData}
//             value={value}
//             displayExpr="CODE"
//             valueExpr="CODE"
//             onValueChanged={(e) => setValue(e.value)}
//           />
//         ) : (
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//           />
//         )}
//       </div>
//     );
//   };

// export const CustomCellComponent = ({
//     value,
//     data,
//     setValue,
//     selectedCompanyCode,
//   }) => {
//     const [dropdownData, setDropdownData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       const fetchDropdownData = async (fileString) => {
//         if (!fileString) return [];

//         const tableName = fileString.split(".")[0];
//         const fieldName = fileString.split(".")[1];

//         // Replace this with actual data fetching logic
//         console.log("fetching data", tableName, fieldName);
//         const response = await fetchDropdownData(tableName, fieldName);
//         const data = await response.json();
//         return data;
//       };

//       if (data.FILESTRING) {
//         fetchDropdownData(data.FILESTRING).then((fetchedData) => {
//           setDropdownData(fetchedData);
//           setLoading(false);
//         });
//       }
//     }, [data.FILESTRING]);

//     return (
//       <div>
//         {loading ? (
//           <p>Loading...</p>
//         ) : data.FILESTRING ? (
//           <SelectBox
//             dataSource={dropdownData}
//             value={value}
//             displayExpr="name"
//             valueExpr="value"
//             onValueChanged={(e) => setValue(e.value)}
//           />
//         ) : (
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//           />
//         )}
//       </div>
//     );
//   };
