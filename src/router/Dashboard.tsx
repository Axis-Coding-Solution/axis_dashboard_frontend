import MainComponent from "@/pages/dashboard/Main";
import AdminDashboard from "@/pages/dashboard/admin-dashboard/admin-dashboard";
import EmployeeDashboard from "@/pages/dashboard/employee-dashboard";

export default [
  {
    element: <MainComponent />,
    path: "/app/main",
  },
  {
    element: <AdminDashboard />,
    path: "/app/main/admin-dashboard",
    meta :{
      layout : "default"
    }
  },
  {
    element: <EmployeeDashboard />,
    path: "/app/main/employee-dashboard",
    meta :{
      layout : "default"
    }
  }
];
