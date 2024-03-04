import MuiIcons from "@/components/mui-icons";
export const employees = [

    {
        name: "Employees",
        path: "/app/employees",
    },
    {
        name: "Employees",
        icon: <MuiIcons.PeopleOutlineIcon />,
        children: [
            {
                name: "All Employee",
                path: "/app/employees/all-employee",
            },
            {
                name: "Holidays",
                path: "/app/employees/holidays",
            },
            {
                name: "Leave ( Admin ) ",
                path: "/app/employees/admin/leave",
            },
            {
                name: "Leave ( Employee ) ",
                path: "/app/employees/employee/leave",
            },
            {
                name: "Leave Setting",
                path: "/app/employees/leave-setting",
            },
            {
                name: "Attendance ( Admin )",
                path: "/app/employees/admin/attendance",
            },
            {
                name: "Attendance ( Employee )",
                path: "/app/employees/employee/attendance",
            },
            {
                name:"Department",
                path:"/app/employees/department"
            },
            {
                name:"Designation",
                path:"/app/employees/designation"
            },
            {
                name:"TimeSheet",
                path:"/app/employees/timesheet"
            },
            {
                name:"Shift & Schedule ",
                path:"/app/employees/shift-schedule"
            },
            {
                name:"Overtime",
                path:"/app/employees/overtime"
            }
        ]
    },
]