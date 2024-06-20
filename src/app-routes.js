import {
  HomePage,
  CompanyProfilePage,
  // ReportingPage,
  OperatorsPage,
  CompaniesPage,
  ReportGroupsPage,
  //ReportListPage,
  UserReportingPage,
  DataBaseNamesPage,
  ReportRolesPage,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";
//import path from "path-browserify";

const routes = [
  // {
  //   path: "/reporting",
  //   element: ReportingPage,
  // },
  {
    path: "/companyProfile",
    element: CompanyProfilePage,
  },
  {
    path: "/databaseNames",
    element: DataBaseNamesPage,
  },
  {
    path: "/operators",
    element: OperatorsPage,
  },

  {
    path: "/home",
    element: HomePage,
  },
  {
    path: "/companies",
    element: CompaniesPage,
  },
  { path: "/reportGroups", element: ReportGroupsPage },
  { path: "/reportRoles", element: ReportRolesPage },
  //{ path: "/reportList", element: ReportListPage },
  { path: "/userReporting", element: UserReportingPage },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});

// {
//   path: "/employee",
//   element: EmployeePage,
// },
// {
//   path: "/newEmployee",
//   element: newEmployeePage,
// },
