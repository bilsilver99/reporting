import {
  HomePage,
  EmployeeManagementPage,
  CompanyProfilePage,
  //EmployeePage,
  HolidayPage,
  newEmployeePage,
  ShiftsPage,
  ServicesPage,
  ProductsPage,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/employeeManagement",
    element: EmployeeManagementPage,
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
  {
    path: "/products",
    element: ProductsPage,
  },
  {
    path: "/services",
    element: ServicesPage,
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
