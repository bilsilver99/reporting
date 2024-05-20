import { HomePage, CompanyProfilePage, ReportingPage } from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/reporting",
    element: ReportingPage,
  },
  {
    path: "/companyProfile",
    element: CompanyProfilePage,
  },

  {
    path: "/home",
    element: HomePage,
  },
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
