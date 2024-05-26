//import { text } from "body-parser";

export const navigation = [
  {
    text: "Home",
    path: "/home",
    tooltip: "home",
    auth: "X",
  },

  { text: "Operators", path: "/operators", auth: "Y" },

  { text: "Report Groups", path: "/reportGroups", auth: "Y" },
  { text: "Companies", path: "/companies", auth: "Y" },
  {
    text: "Report List Management",
    auth: "Y",
    path: "/reportList",
  },

  {
    text: "Reporting",
    auth: "X",
    path: "/reporting",
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
