import {
  HomePage,
  TasksPage,
  ProfilePage,
  EmployeePage,
  newEmployeePage,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/tasks",
    element: TasksPage,
  },
  {
    path: "/profile",
    element: ProfilePage,
  },
  {
    path: "/employee",
    element: EmployeePage,
  },
  {
    path: "/home",
    element: HomePage,
  },
  {
    path: "/newEmployee",
    element: newEmployeePage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
