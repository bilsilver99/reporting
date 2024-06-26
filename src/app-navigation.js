//import { text } from "body-parser";

export const navigation = [
  {
    text: "Home",
    path: "/home",
    tooltip: "home",
    auth: "Y",
    icon: "home",
  },
  { text: "Database Names", path: "/databaseNames", auth: "Y", icon: "group" },

  {
    text: "Report Roles",
    path: "/reportRoles",
    auth: "Y",
    icon: "chart",
  },

  {
    text: "Report Groups",
    path: "/reportGroups",
    auth: "Y",
    icon: "chart",
  },
  { text: "Operators", path: "/operators", auth: "Y", icon: "group" },
  { text: "Companies", path: "/companies", auth: "Y", icon: "globe" },
  {
    text: "User Reporting",
    auth: "X",
    path: "/userReporting",
    icon: "product",
  },
  {
    text: "Reporting",
    auth: "Y",
    path: "/reporting",
    icon: "product",
  },

  // {
  //   text: "ad hoc Reporting",
  //   auth: "Y",
  //   path: "/reporting",
  //   icon: "selectall",
  // },
];

// {
//   text: " Employee Setup",
//   path: "/employee",
// },

// {
//   text: " New Employee",
//   path: "/newEmployee",
// },
