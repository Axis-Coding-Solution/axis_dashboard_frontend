// ** it is used for main routing for the app with scalable folder structure according to the project requirements
import { useAppRoutes } from "@/utils/hooks";
import Authentication from "./Authentication";
import { RoutesType } from "@/definitions/types";
import Dashboard from "./Dashboard";
import BlankLayout from "@/layouts/BlankLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Clients from "./Clients";
import Projects from "./Project";
import Employee from "./Employee";

const Routes = [
  /// all routes gather here
  ...Authentication,
  ...Dashboard,
  ...Clients,
  ...Projects,
  ...Employee,
];

type LayoutsType = {
  [key: string]: JSX.Element;
};

const mergeRouteWithLayouts = (layout: string) => {
  const LayoutRoutes: RoutesType[] = [];
  Routes.filter((route: RoutesType) => {
    if (
      route.meta &&
      route.meta.layout &&
      route.meta.layout === "blank" &&
      layout === "blank"
    ) {
      LayoutRoutes.push(route);
    } else if (layout === "default") {
      LayoutRoutes.push(route);
    }
  });
  return LayoutRoutes;
};
const getLayouts: LayoutsType = {
  blank: <BlankLayout />,
  default: <DashboardLayout />,
};
const AppRouter = () => {
  
  const layouts: string[] = ["blank", "default"];
  const allRoutes: RoutesType[] = [];

  layouts.filter((layout: string) => {
    const layoutRoutes: RoutesType[] = mergeRouteWithLayouts(layout);
    allRoutes.push({
      element: getLayouts[layout],
      path: "/",
      children: layoutRoutes,
    });
  });

  const routes = useAppRoutes(allRoutes);

  return routes;
};
export default AppRouter;
