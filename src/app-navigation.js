//import { text } from "body-parser";

export const navigation = [
  {
    text: "Home",
    path: "/home",
    tooltip: "home",
    auth: "X",
    icon: "home",
  },

  { text: "Operators", path: "/operators", auth: "Y", icon: "group" },

  {
    text: "Report Groups",
    path: "/reportGroups",
    auth: "Y",
    icon: "chart",
  },
  { text: "Companies", path: "/companies", auth: "Y", icon: "globe" },
  {
    text: "Report List Management",
    auth: "Y",
    path: "/reportList",
    icon: "product",
  },
  {
    text: "Reporting",
    auth: "N",
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
