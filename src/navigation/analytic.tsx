import MuiIcons from "@/components/mui-icons";
export const analytic = [
   
    {
        name: "Apps",
        path: "/app/analytics/analytic-1",
        icon: <MuiIcons.AppsIcon />,
        children: [
            {
                name: "Chat",
                path: "/app/chat",
            },
            {
                name:"Calls",
                path:"/app/calls"
            },
            {
                name:"Calender",
                path:"/app/calender"
            },
            {
                name:"Email",
                path:"/app/email"
            },
            {
                name:"File Manager",
                path:"/app/file-manager"
            }
        ]
    },


]