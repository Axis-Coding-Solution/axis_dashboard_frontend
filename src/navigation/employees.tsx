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
                name: "Add Employee",
                path: "/app/employees/add-employee",
            }
        ]
    },
]