
import muiIcons from '@/components/mui-icons';
export const dashboard = [
    {
        name: "Main",
        path: "/app/main/admin-dashboard",
    },
    {
        name: "Dashboard",
        icon: <muiIcons.SpeedTwoToneIcon />,
        children: [
            {
                name: "Admin Dashboard",
                path: "/app/main/admin-dashboard",
            },
            {
                name: "Employee Dashboard",
                path: "/app/main/employee-dashboard",
            }
        ]
    },
   
]