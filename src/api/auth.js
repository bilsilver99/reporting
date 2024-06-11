import defaultUser from "../utils/default-user";
import { login } from "./MyOwnServices";

const currentUser = {};
var thisOK = "0";
export async function signIn(email, password) {
  try {
    // Send request
    //console.log(email, password);
    await login(email, password).then((response) => {
      thisOK = response.returnOK;
      //console.log(thisOK);
      currentUser.email = response.clientname;
      currentUser.companynumber = response.clientcompany;
      currentUser.avatarUrl =
        "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/07.png";
      currentUser.administrator = response.authorized;
      currentUser.uniqueid = response.ReturnUniqueID;
      //console.log(currentUser);
    });
    if (thisOK === "1") {
      return {
        isOk: true,
        data: currentUser,
      };
    } else {
      return { isOk: false };
    }
  } catch {
    return {
      isOk: false,
      message: "Authentication failed",
    };
  }
}

export async function signInOriginal(email, password) {
  try {
    // Send request
    //console.log(email, password);

    return {
      isOk: true,
      data: defaultUser,
    };
  } catch {
    return {
      isOk: false,
      message: "Authentication failed",
    };
  }
}

export async function getUser() {
  try {
    return {
      isOk: true,
      //data: defaultUser,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    //console.log(email, password);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    //console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    //console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}

// export async function signIn(email, password) {
//   try {
//     // Send request
//     console.log(email, password);
//     login(email, password).then((response) => {
//       currentUser.email = response.clientname;
//       currentUser.companynumber = response.companynumber;
//       currentUser.avatarUrlavatarUrl =
//         "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png";
//     });
//     return {
//       isOk: true,
//       data: currentUser,
//     };
//   } catch {
//     return {
//       isOk: false,
//       message: "Authentication failed",
//     };
//   }
// }
