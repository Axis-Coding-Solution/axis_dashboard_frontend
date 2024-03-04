import AllEmployee from "@/pages/employees/all-employees";
import Holiday from "@/pages/employees/holiday";

export default [
    {
        path: "/app/employees",
    },
    {
        element: <AllEmployee />,
        path: "/app/employees/all-employee",
        meta: {
            layout: "default"
        }
    },
    {
        element :<Holiday />,
        path: "/app/employees/holidays",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/admin/leave",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/employee/leave",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/leave-setting",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/admin/attendance",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/employee/attendance",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/department",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/designation",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/timesheet",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/shift-schedule",
        meta:{
            layout: "default",
        }
    },
    {
        path: "/app/employees/overtime",
        meta:{
            layout: "default",
        }
    },
]