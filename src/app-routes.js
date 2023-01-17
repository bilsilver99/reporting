import {
  HomePage,
  employeeManagementPage,
  CompanyProfilePage,
  EmployeePage,
  HolidayPage,
  newEmployeePage,
  ShiftsPage,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/employeeManagement",
    element: employeeManagementPage,
  },
  {
    path: "/companyProfile",
    element: CompanyProfilePage,
  },

  {
    path: "/home",
    element: HomePage,
  },

  {
    path: "/holiday",
    element: HolidayPage,
  },
  {
    path: "/newemployee",
    element: newEmployeePage,
  },
  {
    path: "/shifts",
    element: ShiftsPage,
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
