export const mystore = async (companynumber) => {
  console.log("company in:", companynumber);
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      SentCompany: companynumber,
    }),
  };
  const url = `${process.env.REACT_APP_BASE_URL}/GetAllServiceLevels`;
  return fetch(url, requestoptions) // Request fish
    .then((response) => {
      console.log("company:", companynumber);
      if (!response.ok) {
        return {
          companyname: "System did not respond",
          returnaddress: " ",
        };
      }
      return response.json();
    })
    .then((json) => {
      //console.log(json);
      return {
        data: json.user_response.mdata.map((item) => ({
          label: item.DESCRIPTION,
          value: item.MINUTESREQUIRED,
        })),
        totalCount: json.user_response.totalCount,
        key: json.user_response.keyname,
        // data: json.user_response.mdata,
        // totalCount: json.user_response.totalCount,
        // key: json.user_response.keyname,
      };
    });
};

export const myshift = async (companynumber) => {
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      SentCompany: companynumber,
    }),
  };
  const url = `${process.env.REACT_APP_BASE_URL}/Getshifts`;
  return fetch(url, requestoptions) // Request fish
    .then((response) => {
      console.log(companynumber);
      if (!response.ok) {
        return {
          companyname: "System did not respond",
          returnaddress: " ",
        };
      }
      return response.json();
    })
    .then((json) => {
      //console.log(json);
      return {
        startshift: json.user_response.StartShift,
        endshift: json.user_response.EndShift,
      };
    });
};
