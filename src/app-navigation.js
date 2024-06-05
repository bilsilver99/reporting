//import { text } from "body-parser";

export const navigation = [
  {
    text: "Home",
    path: "/home",
    tooltip: "home",
    auth: "X",
    icon: "home",
  },
  { text: "Database Names", path: "/databaseNames", auth: "Y", icon: "group" },

  { text: "Operators", path: "/operators", auth: "Y", icon: "group" },

  {
    text: "Report Groups",
    path: "/reportGroups",
    auth: "Y",
    icon: "chart",
  },
  { text: "Companies", path: "/companies", auth: "Y", icon: "globe" },
  {
    text: "Reporting",
    auth: "X",
    path: "/userReporting",
    icon: "product",
  },

  {
    text: "ad hoc Reporting",
    auth: "Y",
    path: "/reporting",
    icon: "selectall",
  },
];

// {
//   text: " Employee Setup",
//   path: "/employee",
// },

// {
//   text: " New Employee",
//   path: "/newEmployee",
// },
