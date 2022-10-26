import defaultUser from "../utils/default-user";
//import currentUser from "../utils/current-user";
import { login } from "./MyOwnServices";
//import { useAuth } from './contexts/auth'; 

const currentUser = {
  email: 'bill@bill.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png',
  companynumber: 1
}
export async function signIn(email, password) {
  //const [setcurrentUser,currentUser] = useState('');
  try {
    // Send request
    console.log(email, password);
    login(email,password).then((response)=>{
      currentUser.email = response.clientname
      currentUser.companynumber=response.companynumber
    })
    return {
      isOk: true,
      data: currentUser
    }
}
  catch {
    return {
      isOk: false,
      message: "Authentication failed",
    };
  }}
    
export async function signInOriginal(email, password) {
  try {
    // Send request
    console.log(email, password);

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
    console.log(email, password);

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
    console.log(email, recoveryCode);

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
    console.log(email);

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
