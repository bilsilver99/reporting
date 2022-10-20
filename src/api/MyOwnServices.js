/*
 * @param {*} username
 * @param {*} password
 *
 * shape of returned object:
 * {
 *   widget: STRING,
 *   clientname: STRING,
 *   loginmessage: STRING,
 *   clientcode: STRING
 * }
 *
 * OR throw an error with a login message
 */

//import react from "react";

export const login = (username, password) => {
  var requestoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
    },
    body: JSON.stringify({
      clientname: username,
      clientpassword: password,
    }),
  };

  const url = `${process.env.REACT_APP_BASE_URL}/validateuser`;

  return fetch(url, requestoptions)
    .then((response) => {
      if (!response.ok) {
        return {
          clientname: "System did not respond",
          loginmessage: " ",
          clientcode: "",
          authorized: "N",
          administrator: "",
          unavailable: "Y",
        };
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      if (json.user_response.ReturnClientName !== "invalid user") {
        return {
          clientname: json.user_response.ReturnClientName,
          loginmessage: " ",
          clientcode: json.user_response.ReturnClientCode,
          authorized: "Y",
          administrator: json.user_response.Returnadministrator,
          unavailable: "N",
        };
      } else {
        //throw new Error("invalid username/password");
        return {
          clientname: "",
          error: "Invalid username/password",
          loginmessage: " ",
          clientcode: "",
          authorized: "N",
          administrator: "",
          unavailable: "N",
        };
      }
    })
    .catch((err) => {
      console.log(err.message);
      return {
        clientname: "",
        error: "System Not Available",
        loginmessage: " ",
        clientcode: "",
        authorized: "N",
        administrator: "",
        unavailable: "Y",
      };
    });
};

export const fetchcompany = (companynumber) => {
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
  const url = `${process.env.REACT_APP_BASE_URL}/GetParameters`;
  return fetch(url, requestoptions) // Request fish
    .then((response) => {
      if (!response.ok) {
        return {
          companyname: "System did not respond",
          returnaddress: " ",
        };
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      //throw new Error("invalid username/password");
      return {
        companyname: json.user_response.ReturnCompanyName,
        returnaddressone: json.user_response.ReturnAddressLineOne,
        returnaddresstwo: json.user_response.ReturnAddressLineTwo,
      };
    });
};
